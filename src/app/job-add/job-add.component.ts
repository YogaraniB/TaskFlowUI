import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JobServiceService } from './job-service.service';
import { Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-add/employee.service';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  hide = true;
  @Input() mode: any;
  Schedule: any = [
    {label: 'Daily', value: 'Daily'},
    {label: 'Weekly', value: 'Weekly'},
    {label: 'Hourly', value: 'Hourly'},
    {label: 'Once', value: 'Once'}];


  arrayInputs = [{ controlerInputName1: ['', Validators.required] }];

  formName = this.fb.group({
    controllerArray: this.fb.array([])
  })

  constructor(private empService: EmployeeServiceService,private router:Router,private jobService:JobServiceService,private fb: FormBuilder, private toastr: ToastrService) { }
  success() {

    this.toastr.success('message', 'You have Got It Successfully!');
  }
  setArrayInputs(arrayInputs) {
    const arrayFG = arrayInputs.map(address => this.fb.group(address));
    const formArray = this.fb.array(arrayFG);
    this.formName.setControl('controllerArray', formArray);
  }

  get f() { return this.registerForm.controls; }


  ngOnInit() {
    this.formInit();
    this.setArrayInputs(this.arrayInputs)

  }
  formInit() {
    this.registerForm = this.fb.group({
      JobID: ['', Validators.required],
     CheckList:['', Validators.required],
      Title: ['', Validators.required],
      Emp: ['', Validators.required],
      ActualStartTime: ['', Validators.required],
      ActualEndTime: ['', Validators.required],
      Category: ['', Validators.required],
      Schedule: ['', Validators.required]
    });

  }
  addInput() { (this.formName.get('controllerArray') as FormArray)
  .push(this.fb.group({ controlerInputName1: '' })) }

  removeInput(index) { this.formName.controls.controllerArray["controls"].splice(index, 1) }
  
  
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
  onSubmit() {
    this.submitted = true;
console.log(this.registerForm.value);

    const parameter = {
      "actualETime": this.registerForm.value.ActualStartTime,
      "actualSTime": this.registerForm.value.ActualEndTime,
      "category": this.registerForm.value.Category,
      "checklist": [ this.registerForm.value.Category ],
      "createdAt": new Date(),
      "emp": this.registerForm.value.Emp,
      "jobId": this.registerForm.value.JobID,
      "schedule": this.registerForm.value.Schedule,
      "title": this.registerForm.value.Title
    }
    this.jobService.createJob(parameter).subscribe(
      data => {
        if (data) {
          this.toastr.success('message','Job Successfully Created!');
        }


      },
      error => console.log(error),
    );

    this.router.navigate(['Dashboard']);
  }


  ResetForm() {
    this.submitted = false;
    this.registerForm.reset();

  }
  cancel() {
    this.submitted = false;
    this.registerForm.reset();
    this.router.navigate(['Dashboard']);

  }
}

