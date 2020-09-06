import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false

  constructor(private router: Router,private toastr:ToastrService,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
    sessionStorage.removeItem('username');
  }

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['Dashboard'])
       
       
        
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        this.toastr.error("Invalid Credentials, UserName or Password is incorrect");
      }
    )
    );

  }

}