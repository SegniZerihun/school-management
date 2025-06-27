import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

// Import the NEW provider function for HttpClient
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// We still need this for forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    
    // Use the new, correct way to provide HttpClient
    provideHttpClient(withInterceptorsFromDi()), 
    
    // FormsModule and ReactiveFormsModule still need to be imported this way
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule
    )
  ]
};