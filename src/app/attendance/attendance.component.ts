import { Component, OnInit, ViewChild } from '@angular/core';
import { AttendanceService } from './attendance.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput;
  employees: Object;
file;
  notExcelFile: boolean;
  constructor(private attendanceService:AttendanceService,private toastr: ToastrService) { }

  ngOnInit() {
  }

  
  fileChoose(val) {

    if (val.target.files[0].type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.notExcelFile = true;
    } else {
      this.notExcelFile = false;
    }
  }
  import(){
    const file = <HTMLInputElement>document.getElementById('customFile');
      const filesize = file.files[0].size / 1024 / 1024;
      const uploadfile = file.files[0];
      const formData = new FormData();
      const batch = 1;
      formData.append('upload', uploadfile, uploadfile.name);
      // formData.append('file',this.file);
      formData.append('file',this.fileInput.nativeElement.files[0]);
this.attendanceService.import(formData).subscribe(
  data => {
  
    this.employees = data;
    
    if(data){
      this.toastr.success('message','File Uploaded Successfully!!!');
      
    }
  },

  error => console.log(error),
);

}
}
