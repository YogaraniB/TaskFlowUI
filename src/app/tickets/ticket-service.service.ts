import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tickets } from './tickets';

@Injectable({
  providedIn: 'root'
})
export class ticketsServiceService {

  constructor(private http:HttpClient) { }
  baseUrl="http://localhost:8013";

  

  gettickets(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Tickets/${id}`);
  }

  createtickets(tickets: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/Tickets`, tickets);
  }

  updatetickets(id: number, tickets: Object): Observable<Object> {
   
    return this.http.put(this.baseUrl+"/Tickets/" +id,tickets);
    
  }

  deletetickets(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+"/Tickets/" +id);
  }

  getticketsList(): Observable<any> {
    return this.http.get(this.baseUrl+"/Tickets");
  }

  validatetickets(tickets :tickets){
return this.http.post(this.baseUrl+"/validatetickets",tickets);
  }
  
}


