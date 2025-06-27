import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class gradeService {
  private apiUrl = 'http://https://school-management-ea5q.onrender.com/api/grades';
  private authService = inject(AuthService);

  constructor(private http: HttpClient) { }
  
  // Helper to get auth headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getgrades(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  creategrade(gradeData: any): Observable<any> {
    return this.http.post(this.apiUrl, gradeData, { headers: this.getAuthHeaders() });
  }
  
  // Add update and delete methods later
  deletegrade(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}