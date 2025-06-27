import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectService } from '../../_services/subject';
import { SubjectFormComponent } from '../subject-form/subject-form';

// Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule, // <-- Import MatDialogModule
    SubjectFormComponent // <-- Import the form component
  ],
  templateUrl: './subject-list.html',
  styleUrls: ['./subject-list.scss']
})
export class SubjectListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource: any[] = [];

  constructor(
    private subjectService: SubjectService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog // <-- Inject MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe({
      next: (res) => { this.dataSource = res.data; },
      error: (err) => { this.handleError('Failed to load subjects'); }
    });
  }

  addSubject(): void {
    const dialogRef = this.dialog.open(SubjectFormComponent, {
      width: '400px',
      data: null // No data means 'create' mode
    });

    dialogRef.afterClosed().subscribe(result => {
      // If the dialog returned data (i.e., wasn't cancelled)
      if (result) {
        this.subjectService.createSubject(result).subscribe({
          next: () => {
            this.handleSuccess('Subject created successfully!');
            this.loadSubjects(); // Refresh the list
          },
          error: (err) => { this.handleError('Failed to create subject'); }
        });
      }
    });
  }

  editSubject(subject: any): void {
    const dialogRef = this.dialog.open(SubjectFormComponent, {
      width: '400px',
      data: subject // Pass the subject data to the form
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectService.updateSubject(subject._id, result).subscribe({
          next: () => {
            this.handleSuccess('Subject updated successfully!');
            this.loadSubjects();
          },
          error: (err) => { this.handleError('Failed to update subject'); }
        });
      }
    });
  }

  deleteSubject(id: string): void {
    if (confirm('Are you sure you want to delete this subject?')) {
      this.subjectService.deleteSubject(id).subscribe({
        next: () => {
          this.handleSuccess('Subject deleted successfully!');
          this.loadSubjects();
        },
        error: (err) => { this.handleError('Failed to delete subject'); }
      });
    }
  }

  // Helper methods for snackbar messages
  private handleSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  private handleError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
  }
}