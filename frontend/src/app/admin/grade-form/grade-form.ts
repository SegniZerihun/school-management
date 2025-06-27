// school-management/frontend/src/app/admin/grade-form/grade-form.ts

import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SubjectService } from '../../_services/subject'; // Import SubjectService

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; // <-- Import MatSelectModule

@Component({
  selector: 'app-grade-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule // <-- Add MatSelectModule
  ],
  templateUrl: './grade-form.html',
  styleUrls: ['./grade-form.scss']
})
export class GradeFormComponent implements OnInit {
  gradeForm: FormGroup;
  isEditMode: boolean;
  allSubjects: any[] = []; // To store the list of available subjects

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GradeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subjectService: SubjectService // Inject SubjectService
  ) {
    this.isEditMode = !!data;
    
    // In edit mode, we get an array of subject objects, but the form needs an array of their _id's.
    const subjectIds = this.isEditMode ? this.data.subjects.map((s: any) => s._id) : [];

    this.gradeForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      subjects: [subjectIds] // New form control for subjects
    });
  }

  ngOnInit(): void {
    this.loadAllSubjects();
  }

  loadAllSubjects(): void {
    this.subjectService.getSubjects().subscribe({
      next: res => { this.allSubjects = res.data; },
      error: err => { console.error("Failed to load subjects", err); }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.gradeForm.valid) {
      this.dialogRef.close(this.gradeForm.value);
    }
  }
}
