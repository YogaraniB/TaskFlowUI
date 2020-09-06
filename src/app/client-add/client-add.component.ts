// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-client-add',
//   templateUrl: './client-add.component.html',
//   styleUrls: ['./client-add.component.css']
// })
// export class ClientAddComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { ToastrService } from 'ngx-toastr';
import { clientServiceService } from './client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit, OnChanges {
  registerForm: FormGroup;
  submitted = false;
  hide = true;
  Group:any = [
    {label: 'Michigan', value: 'Michigan'},
    {label: 'Florida', value: 'Florida'},
    {label: 'South Dakota', value: 'South Dakota'},
    {label: 'Tennessee', value: 'Tennessee'}];
  City: any = [
    {label: 'Hyderabad', value: 'Hyderabad'},
    {label: 'Chennai', value: 'Chennai'},
    {label: 'Kochi', value: 'Kochi'},
    {label: 'Bangalore', value: 'Bangalore'}];
  State: any = [
    {label: 'AndhraPradesh', value: 'AndhraPradesh'},
    {label: 'Kerala', value: 'Kerala'},
    {label: 'TamilNadu', value: 'TamilNadu'},
    {label: 'Karnataka', value: 'Karnataka'}];

  @Input() editData: any;
  @Input() mode: any;
  @Input() displayAddEditHeader;
  @Output() addVisibleChild = new EventEmitter<boolean>();
  @Output() callAllEmployees = new EventEmitter();
  @Output() changeMode = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private clientService: clientServiceService) { }
  success() {
    this.toastr.success('message','You have Got It Successfully!');
  }



  ngOnChanges() {
   
    if (this.mode == 'Edit') {
      this.registerForm.patchValue({
        Address: {
          City: this.editData.address.city,
          Pincode: this.editData.address.pincode,
          State: this.editData.address.state,
        },

        Name: this.editData.clientName,
        Email: this.editData.email,
        FirstName: this.editData.firstName,
        Group: this.editData.groupName,
        LastName: this.editData.lastName,
        MobileNumber: this.editData.mobile



      });
    }
    else{
      this.formInit();
    }

  }

  ngOnInit() {
  
    this.formInit();
  }
formInit(){
  this.registerForm = this.formBuilder.group({
    Name: ['', Validators.required],
    Address: this.formBuilder.group({
      State: [''],
      City: [''],
      Pincode: ['']
    }),
    Group: ['', Validators.required],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    MobileNumber: ['', Validators.required],
    Email: ['', Validators.required]
  });

}


  get group() {
    return this.registerForm.get('Group');
  }


  get city() {
    return this.registerForm.get('City');
  }

  get state() {
    return this.registerForm.get('State');
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.mode == 'Add') {

      const parameter = {
        "address": {
          "city": this.registerForm.value.Address.City,
          "pincode": this.registerForm.value.Address.Pincode,
          "state": this.registerForm.value.Address.State,
        },
        "clientName": this.registerForm.value.Name,
        "createdAt": new Date(),
        "email": this.registerForm.value.Email,
        "firstName": this.registerForm.value.FirstName,
        "groupName": this.registerForm.value.Group,
        "lastName": this.registerForm.value.LastName,
        "mobile": this.registerForm.value.MobileNumber,
      }
      this.clientService.createclient(parameter).subscribe(data => {
        if (data) {
          this.toastr.success('message',"Client " + parameter.clientName + ' successfully added!');
        }

      }
      );
      this.ResetForm();
      this.addVisibleChild.emit(false);
      this.callAllEmployees.emit();
      this.changeMode.emit();
      // stop here if form is invalid
      // if (this.registerForm.invalid) {
      //     return;
      // }

      //this.router.navigateByUrl('/Client');
    }
    else if (this.mode == 'Edit') {
      const parameter = {
        "address": {
          "city": this.registerForm.value.Address.City,
          "pincode": this.registerForm.value.Address.Pincode,
          "state": this.registerForm.value.Address.State,
        },
        "clientid": this.editData.clientid,
        "clientName": this.registerForm.value.Name,
        "createdAt": new Date(),
        "email": this.registerForm.value.Email,
        "firstName": this.registerForm.value.FirstName,
        "groupName": this.registerForm.value.Group,
        "lastName": this.registerForm.value.LastName,
        "mobile": this.registerForm.value.MobileNumber,
      }
      this.clientService.updateclient(this.editData.clientid,parameter).subscribe(
        data => {
          this.toastr.success('message','You have Updated an Employee Successfully!');
        },
        error => console.log(error),
      );
      this.submitted=false;
      this.registerForm.reset();
      this.addVisibleChild.emit(false);
      this.callAllEmployees.emit();
      this.changeMode.emit();
    }


  }
  ResetForm() {
    this.submitted=false;
    this.registerForm.reset();
    
  }
  cancel() {
    this.submitted=false;
      this.registerForm.reset();
    this.addVisibleChild.emit(false);
    this.callAllEmployees.emit();
    this.changeMode.emit();
  }
}

