import { Injectable } from '@angular/core';  
import * as FileSaver from 'file-saver';  
import * as XLSX from 'xlsx';  
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';  
const EXCEL_EXTENSION = '.xlsx';  
@Injectable({  
  providedIn: 'root'  
})  
export class ExcelServicesService {  
  constructor(private http:HttpClient) { }  
  public exportAsExcelFile(json: any[], excelFileName: string): void {  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);  
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
    this.saveAsExcelFile(excelBuffer, excelFileName);  
  }  
  private saveAsExcelFile(buffer: any, fileName: string): void {  
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});  
     FileSaver.saveAs(data, fileName + '_export_' + new  Date() + EXCEL_EXTENSION);  
  }  

  downLoad(data: any, type, fileName = 'Excel'){
    let format: string;
    format = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    //format = 'application/pdf';
    let a: HTMLAnchorElement;
    a = document.createElement('a');
    document.body.appendChild(a);
    const blob = new Blob([data], { type: format });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
  }
  public exportExcelget(url,downloadType, fileName?): Observable<any> {
    const headers = new HttpHeaders();
    this.http.get(url , { responseType: 'arraybuffer', headers: headers }).subscribe((res) => {
      this.downLoad(res, downloadType, fileName);
      return res;
    });
    return null;
  }








  
  // public formatJsonToExcel(json: any[], colWidth): void {
  //   let worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   worksheet['!cols'] = colWidth;
  //   let workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   let excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   return excelBuffer;
  // }
  // downLoad(data: any, fileName = 'Excel'){
  //   let format: string;
  //   format = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  //   let a: HTMLAnchorElement;
  //   a = document.createElement('a');
  //   document.body.appendChild(a);
  //   const blob = new Blob([data], { type: format });
  //   const url = window.URL.createObjectURL(blob);
  //   a.href = url;
  //   a.download = fileName;
  //   a.click();
  // }

  // fitToColumn(arrayOfArray) {
  //   let colWidth = Object.keys(arrayOfArray[0]).map(item => {
  //     let colMax = Math.max(...arrayOfArray.map(key =>  String(key[item]).length));
  //     let keyMax = item.length;
  //     return { wch: colMax > keyMax ? colMax : keyMax }
  //   })      
  //   return colWidth;

}  