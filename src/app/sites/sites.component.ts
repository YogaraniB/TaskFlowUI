import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SitesServiceService } from './sites-service.service';
import { Router } from '@angular/router';
import { clientServiceService } from '../client-add/client.service';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  siteform: FormGroup;
  submitted = false;
  Client: any;

  constructor(private siteService: SitesServiceService,
    private clientService: clientServiceService, private router: Router,
     private formBuilder: FormBuilder, private toastr: ToastrService) {


  }
  success() {
    this.toastr.success('message','You have Got It Successfully!');
  }


  ngOnInit() {
    this.getAllClients();
    this.siteform = this.formBuilder.group({
      client: ['', Validators.required],
      region: [''],
      branch: [''],
      sitename: ['', Validators.required],
      email: ['', Validators.required],
      Address: this.formBuilder.group({
        State: ['', Validators.required],
        City: ['', Validators.required],
        Pincode: ['', Validators.required]
      })
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.siteform.controls; }
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
  onSubmit() {
    this.submitted = true;
    const parameter = {
      "address": {
        "city": this.siteform.value.Address.City,
        "pincode": this.siteform.value.Address.Pincode,
        "state": this.siteform.value.Address.State,
      },
      "branch": this.siteform.value.branch,
      "client": this.siteform.value.client,
      "createdAt": new Date(),
      "email": this.siteform.value.email,
      "region": this.siteform.value.region,
      "siteName": this.siteform.value.sitename
    };
    this.siteService.createsites(parameter).subscribe(data => {
      if (data) {
        this.toastr.success('message',parameter.siteName + ' Successfully added!');
      }

    }
    );

    this.router.navigateByUrl('/Dashboard');
    // stop here if form is invalid
    // if (this.siteform.invalid) {
    //     return;
    // }


  }
}

