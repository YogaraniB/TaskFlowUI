import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

    
  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:8013";

  import(file) {
    return this.http.post(`${this.baseUrl}/import`,file);
  }
}
