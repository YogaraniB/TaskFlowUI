import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { clientServiceService } from '../client-add/client.service';
import { ExcelServicesService } from '../services/excel-services.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit , OnChanges{
  clients: any;
  p: number = 1;
  recordCount: any;
  searchText: any;
  editData: any;
  mode = 'Add';
  addVisible: boolean;
  displayAddEditHeader: string;

  constructor(private confirmationService: ConfirmationService,private excelService: ExcelServicesService, private toastr: ToastrService, private router: Router, private clientService: clientServiceService) {

  }
ngOnChanges(){
console.log(this.mode +" onchanges")
}
  ngOnInit() {
    setTimeout(() => {
      this.viewAllClents();
    }, 200);
  }
  exportAsXLSX(): void {
    this.clientService.exportExcelget('Excel','Clients List')
  }
  viewAllClents() {
    setTimeout(() => {
      this.clientService.getClientsList().subscribe(
        data => {
       
          this.clients = data;
          
          this.recordCount = data.length;
        },
        error => console.log(error),
      );
    }, 200);
    

  }
  confirm(clientid) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete client ' +clientid +' ?',
      header: 'Confirmation for Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.ondeleteClick(clientid);
      },
      reject: () => {
        this.toastr.error("Delete Action Aborted");
      }
  });
}
  ondeleteClick(clientid) {
   
    this.clientService.deleteclient(clientid).subscribe(
      data => {
        this.toastr.warning("Deleted client id- " + clientid);
      }

    );


    setTimeout(() => {
      this.viewAllClents();
    }, 100);

  }
  add() {
    this.displayAddEditHeader = 'Add Client';
    this.addVisible = true;
    setTimeout(() => {
      this.viewAllClents();
    }, 100);
    //this.router.navigateByUrl('/ClientAdd');
  }
  onEditClick(client) {
    this.editData = client;
    this.mode = 'Edit';
    this.addVisible = true;
    this.displayAddEditHeader = 'Edit Client - ' + client.clientid + ' ' + client.clientName;
  }

}
