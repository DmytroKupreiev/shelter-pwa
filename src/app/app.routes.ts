import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'animals',
    loadComponent: () => import('./pages/animals/animals.component').then((m) => m.AnimalsComponent),
  },
  {
    path: 'animals/:id',
    loadComponent: () => import('./pages/animal-detail/animal-detail.component').then((m) => m.AnimalDetailsComponent),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  }
];
