// school-management/frontend/src/app/teacher/dashboard/dashboard.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../_services/auth';
import { UserService } from '../../_services/user';
import { MarkService } from '../../_services/mark';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';

// Material Imports
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'; // <-- ADD THIS IMPORT

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MainLayoutComponent, // Use the new layout
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule // <-- ADD THIS TO THE IMPORTS ARRAY
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  students: any[] = [];
  subjects: any[] = [];
  selectedStudent: any = null;
  marks: { [subjectId: string]: number | null } = {};
  userName: string | null = null; // For the layout header

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private markService: MarkService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    // In a real app, you might have a dedicated /users/me endpoint
    // For now, we get the name from the token if available, or default
    this.userName = this.authService.getUserName() || 'Teacher';
  }

  loadDashboardData(): void {
    this.userService.getTeacherDashboardData().subscribe({
      next: (res) => {
        this.students = res.data.students;
        this.subjects = res.data.subjects;
      },
      error: (err) => {
        this.snackBar.open('Could not load dashboard data. Ensure you are assigned to a grade.', 'Close', { duration: 5000 });
        console.error(err);
      }
    });
  }

  selectStudent(student: any): void {
    this.selectedStudent = student;
    this.marks = {};
    this.markService.getMarksForStudent(student._id).subscribe({
      next: res => {
        res.data.forEach((mark: any) => {
          this.marks[mark.subject._id] = mark.marks;
        });
      },
      error: err => {
        this.snackBar.open(`Could not load marks for ${student.name}.`, 'Close', { duration: 3000 });
      }
    });
  }

  onMarkChange(subjectId: string, newMarkValue: string): void {
    const marks = parseInt(newMarkValue, 10);
    if (!this.selectedStudent || isNaN(marks) || marks < 0 || marks > 100) {
      this.snackBar.open('Please enter a valid mark between 0 and 100.', 'Close', { duration: 3000 });
      return;
    }

    const markData = {
      student: this.selectedStudent._id,
      subject: subjectId,
      marks: marks
    };

    this.markService.createOrUpdateMark(markData).subscribe({
      next: () => {
        this.snackBar.open('Mark saved successfully!', 'Close', { duration: 2000 });
      },
      error: (err) => {
        this.snackBar.open('Failed to save mark.', 'Close', { duration: 3000 });
        console.error(err);
      }
    });
  }
}
