import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { clientServiceService } from '../client-add/client.service';
import { SitesServiceService } from '../sites/sites-service.service';
import { locationServiceService } from './location-service.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locationform: FormGroup;
  submitted = false;
  Client: any;
  Site: any;

  constructor(private locationService: locationServiceService, private siteService: SitesServiceService, private clientService: clientServiceService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) {
  }
  success() {
    this.toastr.success('message','You have Got It Successfully!');
  }

  ngOnInit() {
    this.getAllClients();
    this.getAllSites();
    this.locationform = this.formBuilder.group({
      client: ['', Validators.required],
      site: ['', Validators.required],
      zone: ['', Validators.required],
      block: ['', Validators.required],
      floor: ['', Validators.required],


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
        this.Client = temp;

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
        this.Site = temp;

      },
      error => console.log(error),
    );
  }
  // convenience getter for easy access to form fields
  get f() { return this.locationform.controls; }

  onSubmit() {
    this.submitted = true;
    const parameter = {
      "block": this.locationform.value.block,
      "client": this.locationform.value.client,
      "createdAt": new Date(),
      "floor": this.locationform.value.floor,
      "site": this.locationform.value.site,
      "zone": this.locationform.value.zone
    }
    this.locationService.createlocation(parameter).subscribe(
      data => {
        if (data) {
          this.toastr.success('message','Location Successfully added!');
        }


      },
      error => console.log(error),
    );

    this.router.navigate(['Dashboard']);
    // stop here if form is invalid
    // if (this.locationform.invalid) {
    //     return;
    // }


  }
  cancel(){
    this.locationform.reset();
    this.router.navigate(['Dashboard']);
  }
}

