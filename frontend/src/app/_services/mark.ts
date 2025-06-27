import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  private apiUrl = 'http://https://school-management-ea5q.onrender.com/api/marks';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Get all marks for a specific student
  getMarksForStudent(studentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/student/${studentId}`, { headers: this.getAuthHeaders() });
  }

  // Create or update a mark
  createOrUpdateMark(markData: { student: string, subject: string, marks: number }): Observable<any> {
    return this.http.post(this.apiUrl, markData, { headers: this.getAuthHeaders() });
  }
}