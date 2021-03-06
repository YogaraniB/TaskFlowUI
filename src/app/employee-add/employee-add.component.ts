import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeServiceService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { clientServiceService } from '../client-add/client.service';
import { SitesServiceService } from '../sites/sites-service.service';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  @Output() addVisibleChild = new EventEmitter<boolean>();
  @Output() callAllEmployees = new EventEmitter();
  registerForm: FormGroup;
  submitted = false;
  hide = true;
  Designation: any = [
  {label: 'Software developer', value: 'Software developer'},
  {label: 'Testing', value: 'Testing'},
  {label: 'Debugging', value: 'Debugging'}];
Client:any;
Site: any ;

  UserRole: any = [
  {label: 'Super Admin', value: 'Super Admin'},
  {label: 'Admin', value: 'Admin'},
  {label: 'User', value: 'User'}];

  Block: any =  [{label: 'Michigan', value: 'Michigan'},
  {label: 'Florida', value: 'Florida'},
  {label: 'South Dakota', value: 'South Dakota'},
  {label: 'Tennessee', value: 'Tennessee'}];

  Floor: any =  [{label: 'Michigan', value: 'Michigan'},
  {label: 'Florida', value: 'Florida'},
  {label: 'South Dakota', value: 'South Dakota'},
  {label: 'Tennessee', value: 'Tennessee'}];

  Zone: any =  [{label: 'Michigan', value: 'Michigan'},
  {label: 'Florida', value: 'Florida'},
  {label: 'South Dakota', value: 'South Dakota'},
  {label: 'Tennessee', value: 'Tennessee'}];
  id: any;

  constructor(private siteService: SitesServiceService,private clientService: clientServiceService, private Actroute: ActivatedRoute,
    private router: Router, private empService: EmployeeServiceService, private formBuilder: FormBuilder, private toastr: ToastrService) { }
  success() {
    this.toastr.success('message','You have Got It Successfully!');
  }


  ngOnInit() {
    this.getAllClients();
    this.getAllSites();
    this.id = this.Actroute.snapshot.params['id'];
    this.empService.getEmployee(this.id)
      .subscribe(data => {
        this.registerForm.patchValue({
          Block: data.block,
          Client: data.client,
          Designation: data.designation,
          Email: data.email,
          EmployeeID: data.empid,
          FirstName: data.firstName,
          Floor: data.floor,
          LastName: data.lastName,
          MobileNumber: data.mobile,
          Site: data.site,
          UserRole: data.userRole,
          Zone: data.zone,
        });
       // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
      });
    this.registerForm = this.formBuilder.group({
      EmployeeID: ['', Validators.required],
      Designation: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      MobileNumber: ['', Validators.required],
      Email: ['', Validators.required],
      Client: ['', Validators.required],
      Site: ['', Validators.required],
      UserRole: ['', Validators.required],
      Block: ['', Validators.required],
      Floor: ['', Validators.required],
      Zone: ['', Validators.required],



    });

  }
  getAllClients() {
    let temp = [];
    this.clientService.getClientsList().subscribe(
      data => {
        for (let index = 0; index < data.length; index++) {
          temp.push({
            label: data[index].clientName,
            value: data[index].clientName
            //value: data[index].clientid
          })

        }
        this.Client=temp;

      },
      error => console.log(error),
    );
  }
  getAllSites() {
    let temp = [];
    this.siteService.getsitesList().subscribe(
      data => {
        for (let index = 0; index < data.length; index++) {
          temp.push({
            label: data[index].siteName,
            value: data[index].siteName
            //value: data[index].clientid
          })

        }
        this.Site=temp;

      },
      error => console.log(error),
    );
  }
  addEmployee(param) {
    
    const parameter = {
      "block": this.registerForm.value.Block,
      "client": this.registerForm.value.Client,
      "designation": this.registerForm.value.Designation,
      "email": this.registerForm.value.Email,
      "empid": this.registerForm.value.EmployeeID,
      "firstName": this.registerForm.value.FirstName,
      "floor": this.registerForm.value.Floor,
      "lastName": this.registerForm.value.LastName,
      "mobile": this.registerForm.value.MobileNumber,
      "site": this.registerForm.value.Site,
      "userRole": this.registerForm.value.UserRole,
      "zone": this.registerForm.value.Zone,
      "createdAt": new Date()
    }
    this.empService.createEmployee(parameter).subscribe(
      data => {
        this.toastr.success('message',"Employee ID- " + parameter.empid + " " + parameter.firstName + ' successfully added!');

      },
      error => console.log(error),
    );

  }
  

  get designation() {
    return this.registerForm.get('Designation');
  }

  get client() {
    return this.registerForm.get('Client');
  }

  get site() {
    return this.registerForm.get('Site');
  }

  get userRole() {
    return this.registerForm.get('UserRole');
  }


  get block() {
    return this.registerForm.get('Block');
  }

  get floor() {
    return this.registerForm.get('Floor');
  }

  get zone() {
    return this.registerForm.get('Zone');
  }


  get f() { return this.registerForm.controls; }


  onSubmit() {
    this.submitted = true;

    this.ResetForm();
   
    this.addVisibleChild.emit(false);
    this.callAllEmployees.emit();

    //this.router.navigateByUrl('/Employee');
  }
  ResetForm() {
    this.submitted = false;
    this.registerForm.reset();
  }
  cancel() {
    this.addVisibleChild.emit(false);
    this.callAllEmployees.emit();
  }
}