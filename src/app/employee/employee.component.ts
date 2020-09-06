import { Component, OnInit, ViewChild, ElementRef, OnChanges, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-add/employee.service';
import * as XLSX from 'xlsx';
import { ExcelServicesService } from '../services/excel-services.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { ConfirmationService } from 'primeng/api';


type AOA = any[][];
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [ConfirmationService]
})
export class EmployeeComponent implements OnInit , AfterViewInit{
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  @ViewChild(EmployeeAddComponent ,{static:false}) employeeAddComponent:EmployeeAddComponent;
  recordCount: any;
  p: number = 1;
  searchText: any;
  data: AOA = [];
  mode;
  src: any;
  constructor(private confirmationService: ConfirmationService,private excelService:ExcelServicesService,
    private toastr: ToastrService,private router: Router, private empService: EmployeeServiceService) { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(this.employeeAddComponent);
    }, 100);
   
    
  }
  confirm(empid) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete employee ' +empid +' ?',
      header: 'Confirmation for Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.ondeleteClick(empid);
      },
      reject: () => {
        this.toastr.error("Delete Action Aborted");
      }
  });
}
  employees: any;

  
  ngOnInit() {
   
    setTimeout(() => {
      this.viewAllEmployees();
    }, 100);
   
  }

 
  onEditClick(empid){
    this.router.navigate(['employeeEdit', empid]);
    this.mode="edit";
  }
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'EmployeeList');
    XLSX.writeFile(wb, 'Employee.xlsx');
  }
  exportAsXLSX():void {  
    this.excelService.exportAsExcelFile(this.employees, 'Employees-List');  
 } 
 

 onFileChange(evt: any) {
  /* wire up file reader */
  const target: DataTransfer = <DataTransfer>(evt.target);
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    /* read workbook */
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
  
  };
  reader.readAsBinaryString(target.files[0]);
}


  viewAllEmployees() {
    setTimeout(() => {
      this.empService.getEmployeesList().subscribe(
        data => {
         
          this.employees = data.list;
         
          this.recordCount = data.recordCount;
        },
        error => console.log(error),
      );
    }, 100);
   

  }
  
  addVisible=false;
  add() {
this.addVisible=true;
setTimeout(() => {
  this.viewAllEmployees();
}, 100);
    //this.router.navigateByUrl('/employeeAdd');
  }
  ondeleteClick(empid) {
    this.empService.deleteEmployee(empid).subscribe(
      
        data=>{
          this.toastr.warning("Successfully deleted employee id- " + empid);
        }
      
    );
    
    setTimeout(() => {
      this.viewAllEmployees();
    }, 100);
   

  }
}
