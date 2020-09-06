import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  
  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:8013";

  

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Employee/${id}`);
  }

  createEmployee(Employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/Employees`, Employee);
  }

  updateEmployee(id: number, Employee: Object): Observable<Object> {
    
    return this.http.put(this.baseUrl+"/Employee/" +id,Employee);
    
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+"/Employee/" +id);
  }

  getEmployeesList(): Observable<any> {
    return this.http.get(this.baseUrl+"/Employees");
  }

  getEmployeesListAutoComplete(name:string): Observable<any> {
    
    return this.http.get(`${this.baseUrl}/employeesByName1.8/${name}`);
  }

  importEmployees(param){
    return this.http.post(`${this.baseUrl}/import`, param);
  }
  download(fileId){
    return this.http.get(`${this.baseUrl}/downloadFile/${fileId}`);
  }
//   const squareOdd = of(1, 2, 3, 4, 5)
//   .pipe(
//     filter(n => n % 2 !== 0),
//     map(n => n * n)
//   );

// // Subscribe to get values
// squareOdd.subscribe(x => console.log(x));
  
  
}
