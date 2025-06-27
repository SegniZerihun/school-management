import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:3000/api/subjects';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getSubjects(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // ---> ADD THESE METHODS <---
  createSubject(subject: any): Observable<any> {
    return this.http.post(this.apiUrl, subject, { headers: this.getAuthHeaders() });
  }

  updateSubject(id: string, subject: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, subject, { headers: this.getAuthHeaders() });
  }

  deleteSubject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}