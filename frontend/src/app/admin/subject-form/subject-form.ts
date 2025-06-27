import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './subject-form.html',
  styleUrls: ['./subject-form.scss']
})
export class SubjectFormComponent {
  subjectForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    // This allows us to control the dialog itself (e.g., close it)
    public dialogRef: MatDialogRef<SubjectFormComponent>,
    // This injects data passed from the list component (e.g., the subject to edit)
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!this.data; // If data exists, we are in edit mode
    this.subjectForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.subjectForm.valid) {
      // Pass the form data back to the component that opened the dialog
      this.dialogRef.close(this.subjectForm.value);
    }
  }
}