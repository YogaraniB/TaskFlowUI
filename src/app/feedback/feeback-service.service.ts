import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeebackServiceService {

  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:8013";

  getFeedback(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Feedback/${id}`);
  }

  createFeedback(Feedback: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/Feedback`, Feedback);
  }

  updateFeedback(id: number, Feedback: Object): Observable<Object> {
    
    return this.http.put(this.baseUrl+"/Feedback/" +id,Feedback);
    
  }

  deleteFeedback(id: number): Observable<any> {
    return this.http.delete(this.baseUrl+"/Feedback/" +id);
  }

  getFeedbacksList(): Observable<any> {
    return this.http.get(this.baseUrl+"/Feedback");
  }

}
