// school-management/frontend/src/app/student/dashboard/dashboard.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../_services/auth';
import { MarkService } from '../../_services/mark';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent, // Use the new layout
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['subject', 'marks'];
  dataSource: any[] = [];
  userName: string | null = null; // For the layout header

  constructor(
    public authService: AuthService,
    private markService: MarkService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const studentId = this.authService.getUserId();
    this.userName = studentId ? 'Student' : 'User'; // Placeholder name

    if (studentId) {
      this.markService.getMarksForStudent(studentId).subscribe({
        next: (res) => {
          this.dataSource = res.data;
        },
        error: (err) => {
          this.snackBar.open('Could not load marks.', 'Close', { duration: 3000 });
          console.error(err);
        }
      });
    } else {
      this.snackBar.open('Could not identify student.', 'Close', { duration: 3000 });
    }
  }
}
