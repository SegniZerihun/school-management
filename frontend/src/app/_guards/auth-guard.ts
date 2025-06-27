import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Get the expected roles from the route data
  const expectedRoles = route.data['roles'] as Array<string>;

  if (authService.hasToken()) {
    const userRole = authService.getRole();
    // Check if the user's role is one of the expected roles
    if (userRole && expectedRoles.includes(userRole)) {
      return true; // Access granted
    }
  }

  // If not logged in or role doesn't match, redirect to login page
  router.navigate(['/login']);
  return false; // Access denied
};