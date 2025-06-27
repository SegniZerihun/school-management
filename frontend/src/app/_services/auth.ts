// school-management/frontend/src/app/_services/auth.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private userRole: string | null = null;
  private userId: string | null = null;
  private userName: string | null = null; // <-- Add userName property
  private token: string | null = null;

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {
    this.token = this.getToken();
    if(this.token) {
      this.decodeToken(this.token); // Decode token on service initialization
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.setToken(response.token);
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.userRole = null;
    this.userId = null;
    this.userName = null;
    this.token = null;
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private decodeToken(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userRole = payload.user.role;
      this.userId = payload.user.id;
      // The name is not in the JWT payload by default, let's adjust this.
      // For now, we'll keep it simple and get it later.
    } catch (e) {
      console.error("Error decoding token", e);
      this.logout();
    }
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.token = token;
    this.decodeToken(token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getRole(): string | null {
    if (!this.userRole && this.hasToken()) {
      this.decodeToken(this.getToken()!);
    }
    return this.userRole;
  }

  getUserId(): string | null {
    if (!this.userId && this.hasToken()) {
      this.decodeToken(this.getToken()!);
    }
    return this.userId;
  }

  // A placeholder for getting the user's name.
  // In a real app, the JWT would contain the name, or we'd have a /users/me endpoint.
  getUserName(): string | null {
    const role = this.getRole();
    if (role) {
      // For demonstration, we'll just return the role name.
      // A proper implementation would fetch the user's actual name.
      return role;
    }
    return 'User';
  }
}
