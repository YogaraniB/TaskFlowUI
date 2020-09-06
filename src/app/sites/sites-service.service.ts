import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { sites } from './sites';

@Injectable({
  providedIn: 'root'
})
export class SitesServiceService {

  constructor(private http:HttpClient) { }
  baseUrl="http://localhost:8013";

  

  getsites(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Sites/${id}`);
  }

  createsites(sites: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/Sites`, sites);
  }

  updatesites(id: number, sites: Object): Observable<Object> {
   
    return this.http.put(this.baseUrl+"/Sites/" +id,sites);
    
  }

  deletesites(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+"/Sites/" +id);
  }

  getsitesList(): Observable<any> {
    return this.http.get(this.baseUrl+"/Sites");
  }

  validatesites(sites :sites){
return this.http.post(this.baseUrl+"/validatesites",sites);
  }
  
  
}

