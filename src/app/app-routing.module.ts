import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ClientComponent } from './client/client.component';
import { EmployeeComponent } from "./employee/employee.component";
import { LocationComponent } from './location/location.component';
import { SitesComponent } from './sites/sites.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ShiftDetailsComponent } from './shift-details/shift-details.component';
import { TicketsComponent } from './tickets/tickets.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import {JobComponent} from './job/job.component';
import {JobAddComponent} from './job-add/job-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { MainComponent } from './main/main.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  { path:'',pathMatch:'full',redirectTo:'login'},
  { path:'Dashboard', component:DashboardComponent,canActivate:[AuthGaurdService]},
  { path:'Navbar', component:NavbarComponent,canActivate:[AuthGaurdService]},
  { path:'Sidebar', component:SidebarComponent,canActivate:[AuthGaurdService]},
  { path:'Client', component:ClientComponent,canActivate:[AuthGaurdService]},
  { path:'Employee', component:EmployeeComponent,canActivate:[AuthGaurdService]},
  {path:'employeeAdd',component:EmployeeAddComponent},
  {path:'employeeEdit/:id',component:EmployeeEditComponent},
  { path:'Location', component:LocationComponent,canActivate:[AuthGaurdService]},
  { path:'Sites', component:SitesComponent,canActivate:[AuthGaurdService]},
  { path:'Feedback', component:FeedbackComponent,canActivate:[AuthGaurdService]},
  { path:'ClientAdd', component:ClientAddComponent},
  { path:'Attendance', component:AttendanceComponent,canActivate:[AuthGaurdService]},
  { path:'ShiftDetails', component:ShiftDetailsComponent,canActivate:[AuthGaurdService]},
  { path:'Tickets', component:TicketsComponent,canActivate:[AuthGaurdService]},
  {path:'Jobs',component:JobAddComponent,canActivate:[AuthGaurdService]},
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
