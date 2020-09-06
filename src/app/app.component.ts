import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'Myapp';
  user;
  constructor(private spinner: NgxSpinnerService,private authentocationService: AuthenticationService,private router: Router) { }

  ngOnInit() {
    this.user = sessionStorage.getItem('username');
    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }
  
  ngOnChanges(){
    this.user = sessionStorage.getItem('username');
   
  }
  logout()
  {
    this.authentocationService.logOut();
    // this.router.navigate(['login']);
    this.router.navigateByUrl('/login');
    //
  }
}
