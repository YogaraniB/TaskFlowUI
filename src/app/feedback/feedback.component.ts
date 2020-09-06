import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeebackServiceService } from '../feedback/feeback-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  constructor( private formBuilder: FormBuilder,private router: Router,
    private feedbackService:FeebackServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', Validators.required],
      subject: ['', Validators.required]
    });
  }
  get f() { return this.feedbackForm.controls; }
  onSubmit() {
  
   const parameter = {
    
      "createdAt": new Date(),
      "email": this.feedbackForm.value.email,
     
      "firstName": this.feedbackForm.value.firstName,
      "lastName": this.feedbackForm.value.lastName,
      "subject": this.feedbackForm.value.subject
    
  };
  this.feedbackService.createFeedback(parameter).subscribe(data => {
    if (data) {
      this.toastr.success('message','Your Feedback is Successfully added!');
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
