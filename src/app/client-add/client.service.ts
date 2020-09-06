import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExcelServicesService } from '../services/excel-services.service';

@Injectable({
  providedIn: 'root'
})
export class clientServiceService {

  
  constructor(private http:HttpClient,private excelService:ExcelServicesService) { }

  baseUrl="http://localhost:8013";

  

  getclient(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Client/${id}`);
  }

  createclient(client: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/Clients`, client);
  }

  updateclient(id: number, client: Object): Observable<Object> {
   
    return this.http.put(this.baseUrl+"/Client/" +id,client);
    
  }

  deleteclient(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+"/Client/" +id);
  }

  getClientsList(): Observable<any> {
    return this.http.get(this.baseUrl+"/Clients");
  }
//   const squareOdd = of(1, 2, 3, 4, 5)
//   .pipe(
//     filter(n => n % 2 !== 0),
//     map(n => n * n)
//   );

// // Subscribe to get values
// squareOdd.subscribe(x => console.log(x));
  
public exportExcelget(downloadType, fileName?): Observable<any> {
 return this.excelService.exportExcelget(this.baseUrl+'/ClientListDownloadToExcel', downloadType, fileName);
}
}
