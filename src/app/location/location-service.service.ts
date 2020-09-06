import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { location } from './location';

@Injectable({
  providedIn: 'root'
})
export class locationServiceService {

  constructor(private http:HttpClient) { }
  baseUrl="http://localhost:8013";

  

  getlocation(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Location/${id}`);
  }

  createlocation(location: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/Locations`, location);
  }

  updatelocation(id: number, location: Object): Observable<Object> {
  
    return this.http.put(this.baseUrl+"/Location/" +id,location);
    
  }

  deletelocation(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+"/Location/" +id);
  }

  getlocationList(): Observable<any> {
    return this.http.get(this.baseUrl+"/Locations");
  }

  
  
}

