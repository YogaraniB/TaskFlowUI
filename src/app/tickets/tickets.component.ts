import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ticketsServiceService } from './ticket-service.service';
import { Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-add/employee.service';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  ticketform: FormGroup;
  submitted = false;
  employees: any=[];
severity=[
  {label: 'High', value: 'High'},
  {label: 'Medium', value: 'Medium'},
  {label: 'Low', value: 'Low'}];
  constructor(private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService,
    private empService: EmployeeServiceService, private ticketService: ticketsServiceService) {


  }
  success() {
    this.toastr.success('message','You have Got It Successfully!');
  }


  ngOnInit() {
    this.getAllEmployees();
   
    this.ticketform = this.formBuilder.group({
      ticketid: ['', Validators.required],
      empid: ['', Validators.required],
      severity: ['', Validators.required],
      assignee: ['', Validators.required],
      description: ['', Validators.required],
      reporty: ['', Validators.required],
    });
  }
  filteredCountriesSingle: any[];
  iCDlist;
  EmployeeList;
  search(event) {
    let query = event.query;
    this.empService.getEmployeesListAutoComplete(query).subscribe((datas) => {
      this.iCDlist = [];
      const icdCode = [];
      if (datas) {
        for (let count = 0; count < datas.length; count++) {
          icdCode.push(datas[count].empid + ' - ' + datas[count].firstName);
        }
        this.iCDlist = icdCode;
      }
      this.EmployeeList = this.iCDlist;


    },
      error => console.log(error),
    );


  }
  getAllEmployees() {
    let temp = [];
    this.empService.getEmployeesList().subscribe(
      data => {
        for (let index = 0; index < data.length; index++) {
        
          temp.push({
            label: data.list[index].firstName,
            value: data.list[index].firstName
            //value: data[index].clientid
          })

        }
        this.employees = temp;

      },
      error => console.log(error),
    );
  }
  // convenience getter for easy access to form fields
  get f() { return this.ticketform.controls; }

  onSubmit() {
    this.submitted = true;

    const parameter = {
      "assignee": this.ticketform.value.assignee,
      "description": this.ticketform.value.description,
      "employee": this.ticketform.value.empid,
      "reportee": this.ticketform.value.reporty,
      "severity": this.ticketform.value.severity,
      "ticketId": this.ticketform.value.ticketid,
      "createdAt": new Date()
    }
    this.ticketService.createtickets(parameter).subscribe(
      data => {
        this.toastr.success('message', 'You have raised a Ticket Successfully!');
      },
      error => console.log(error),
    );
    this.router.navigateByUrl('/Dashboard');
    //this.toastr.success(this.ticketform.controls['ticketid'].value + ' successfully added!'); 

    // stop here if form is invalid
    // if (this.ticketform.invalid) {
    //     return;
    // }
    this.ticketform.reset();



  }
  cancel(){
    this.ticketform.reset();
    this.router.navigate(['Dashboard']);
  }
}

