import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:3000/api/subjects';
  private authService = inject(AuthService);

  constructor(private http: HttpClient) { }
  
  // Helper to get auth headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getSubjects(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createSubject(subjectData: any): Observable<any> {
    return this.http.post(this.apiUrl, subjectData, { headers: this.getAuthHeaders() });
  }
  
  // Add update and delete methods later
  deleteSubject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}