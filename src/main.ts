import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

// Bootstrap the Angular application with configuration
bootstrapApplication(AppComponent, {
  providers: [
    // Use Ionic's route strategy for better mobile navigation
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    // Provide Ionic Angular functionality
    provideIonicAngular(),
    
    // Configure Ionic Storage with preferred drivers
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__mydb', // Database name
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage] // Storage drivers in order of preference
      })
    ),
    
    // Set up application routes with module preloading
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // Enable HttpClient for API calls
    provideHttpClient(),
    
    // Configure Service Worker for PWA (production only)
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(), // Disable in development
      registrationStrategy: 'registerWhenStable:30000' // Register after app stabilizes
    }),
  ],
}).catch(err => console.error(err)); // Error handling during bootstrap