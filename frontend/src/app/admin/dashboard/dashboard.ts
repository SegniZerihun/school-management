// school-management/frontend/src/app/admin/dashboard/dashboard.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule for <router-outlet>
import { AuthService } from '../../_services/auth';
import { MainLayoutComponent, NavLink } from '../../layout/main-layout/main-layout.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // <-- Add RouterModule
    MainLayoutComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  userName: string | null = null;
  navLinks: NavLink[] = [
    { path: '/admin/dashboard/subjects', label: 'Subjects', icon: 'book' },
    { path: '/admin/dashboard/grades', label: 'Grades', icon: 'grade' },
    { path: '/admin/dashboard/teachers', label: 'Teachers', icon: 'person' },
    { path: '/admin/dashboard/students', label: 'Students', icon: 'group' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }
}
