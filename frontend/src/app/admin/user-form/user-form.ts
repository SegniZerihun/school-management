// school-management/frontend/src/app/admin/user-form/user-form.ts

import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GradeService } from '../../_services/grade';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatSelectModule
  ],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode: boolean;
  roles: string[] = ['Student', 'Teacher', 'Admin'];
  availableGrades: any[] = [];
  formTitle: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gradeService: GradeService
  ) {
    this.isEditMode = !!this.data.user;
    this.formTitle = this.isEditMode ? `Edit ${this.data.user.name}` : `Add New ${this.data.defaultRole}`;

    const passwordValidators = this.isEditMode ? [] : [Validators.required, Validators.minLength(6)];

    this.userForm = this.fb.group({
      name: [this.data.user?.name || '', Validators.required],
      email: [this.data.user?.email || '', [Validators.required, Validators.email]],
      password: ['', passwordValidators],
      role: [this.data.user?.role || this.data.defaultRole, Validators.required],
      grade: [this.data.user?.grade?._id || null]
    });

    if (this.isEditMode) {
      this.userForm.get('email')?.disable();
    }
  }

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades(): void {
    this.gradeService.getGrades().subscribe({
      next: res => {
        this.availableGrades = res.data;
      },
      error: err => {
        console.error("Failed to load grades for the form.", err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.getRawValue());
    }
  }
}
