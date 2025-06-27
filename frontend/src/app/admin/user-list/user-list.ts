// school-management/frontend/src/app/admin/user-list/user-list.ts

import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { UserService } from '../../_services/user';
import { UserFormComponent } from '../user-form/user-form';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatIconModule,
    MatSnackBarModule, MatDialogModule, UserFormComponent
  ],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserListComponent implements OnInit {
  // We no longer need @Input() because the role comes from the route data
  userRole!: 'Teacher' | 'Student';

  displayedColumns: string[] = ['name', 'email', 'grade', 'actions'];
  dataSource: any[] = [];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the role from the current route's data
    this.userRole = this.route.snapshot.data['role'];
    if (this.userRole) {
      this.loadUsers();
    }
  }

  loadUsers(): void {
    this.userService.getUsers(this.userRole).subscribe({
      next: (res) => { this.dataSource = res.data; },
      error: (err) => { this.handleError(`Failed to load ${this.userRole}s`); }
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '450px',
      data: { user: null, defaultRole: this.userRole }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // In our app, only Admins can create users, so we use the admin registration route.
        // We now need to attach auth headers to it as it is a protected route.
        this.userService.createUser(result).subscribe({
          next: () => {
            this.handleSuccess(`${this.userRole} created successfully!`);
            this.loadUsers();
          },
          error: (err) => { this.handleError(err.error.msg || `Failed to create ${this.userRole}`); }
        });
      }
    });
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '450px',
      data: { user: user, defaultRole: this.userRole }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!result.password) {
          delete result.password;
        }
        this.userService.updateUser(user._id, result).subscribe({
          next: () => {
            this.handleSuccess(`${this.userRole} updated successfully!`);
            this.loadUsers();
          },
          error: (err) => { this.handleError(err.error.msg || `Failed to update ${this.userRole}`); }
        });
      }
    });
  }

  deleteUser(id: string): void {
    if (confirm(`Are you sure you want to delete this ${this.userRole}?`)) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.handleSuccess(`${this.userRole} deleted successfully!`);
          this.loadUsers();
        },
        error: (err) => { this.handleError(err.error.msg || `Failed to delete ${this.userRole}`); }
      });
    }
  }

  private handleSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  private handleError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
  }
}
