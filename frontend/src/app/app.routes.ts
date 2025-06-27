// school-management/frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';
import { authGuard } from './_guards/auth-guard';
// Correct the import name here
import { DashboardComponent as AdminDashboardComponent } from './admin/dashboard/dashboard';
import { SubjectListComponent } from './admin/subject-list/subject-list';
import { GradeListComponent } from './admin/grade-list/grade-list';
import { UserListComponent } from './admin/user-list/user-list';

export const routes: Routes = [
    // Redirect root to login
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Login route
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent)
    },

    // Admin Dashboard Route with Child Routes
    {
        path: 'admin/dashboard',
        component: AdminDashboardComponent, // Use the corrected component name
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
        children: [
            // Redirect from /admin/dashboard to the subjects page by default
            { path: '', redirectTo: 'subjects', pathMatch: 'full' },
            { path: 'subjects', component: SubjectListComponent },
            { path: 'grades', component: GradeListComponent },
            { path: 'teachers', component: UserListComponent, data: { role: 'Teacher'} },
            { path: 'students', component: UserListComponent, data: { role: 'Student'} }
        ]
    },

    // Teacher Dashboard Route
    {
        path: 'teacher/dashboard',
        loadComponent: () => import('./teacher/dashboard/dashboard').then(m => m.DashboardComponent),
        canActivate: [authGuard],
        data: { roles: ['Teacher'] }
    },

    // Student Dashboard Route
    {
        path: 'student/dashboard',
        loadComponent: () => import('./student/dashboard/dashboard').then(m => m.DashboardComponent),
        canActivate: [authGuard],
        data: { roles: ['Student'] }
    },

    // Catch-all route for any other path
    { path: '**', redirectTo: 'login' }
];
