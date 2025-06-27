import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private apiUrl = 'https://school-management-ea5q.onrender.com/api/grades';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper to get the auth headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getGrades(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createGrade(grade: any): Observable<any> {
    return this.http.post(this.apiUrl, grade, { headers: this.getAuthHeaders() });
  }

  updateGrade(id: string, grade: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, grade, { headers: this.getAuthHeaders() });
  }

  deleteGrade(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}