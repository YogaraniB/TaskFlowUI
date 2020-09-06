import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  constructor(private http:HttpClient) { }
  baseUrl="http://localhost:8013";

  

  getJob(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Job/${id}`);
  }

  createJob(Job: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/Jobs`, Job);
  }

  updateJob(id: number, Job: Object): Observable<Object> {
  
    return this.http.put(this.baseUrl+"/Job/" +id,Job);
    
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+"/Job/" +id);
  }

  getJobList(): Observable<any> {
    return this.http.get(this.baseUrl+"/Jobs");
  }

}
  