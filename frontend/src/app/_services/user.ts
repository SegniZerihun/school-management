// school-management/frontend/src/app/_services/user.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userApiUrl = 'http://https://school-management-ea5q.onrender.com/api/users';
  // Admin uses the public registration route to create new users
  private registerApiUrl = 'http://https://school-management-ea5q.onrender.com/api/auth/register';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Get users by a specific role ('Teacher' or 'Student')
  getUsers(role: string): Observable<any> {
    return this.http.get(`${this.userApiUrl}?role=${role}`, { headers: this.getAuthHeaders() });
  }

  // ---> ADD THIS NEW METHOD <---
  getTeacherDashboardData(): Observable<any> {
    return this.http.get(`${this.userApiUrl}/teacher-data`, { headers: this.getAuthHeaders() });
  }

  createUser(user: any): Observable<any> {
    // Admin uses this to register new users
    return this.http.post(this.registerApiUrl, user, { headers: this.getAuthHeaders() });
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.userApiUrl}/${id}`, user, { headers: this.getAuthHeaders() });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.userApiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
