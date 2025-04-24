import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonImg, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AnimalService, Animal } from '../../service/animal.service';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, heartOutline, callOutline } from 'ionicons/icons';
import { FinisherHeaderComponent } from '../../custom-components/finisher-header.component';

@Component({
  selector: 'app-animals',
  standalone: true,
  templateUrl: './animals.component.html',  // Template for animal listings
  styleUrls: ['./animals.component.scss'],  // Component-specific styles
  imports: [  // Required standalone imports
    IonIcon, IonButton, IonButtons,  
    CommonModule, RouterModule, 
    IonHeader, IonToolbar, IonTitle, 
    IonContent, IonCard, IonCardHeader, 
    IonCardTitle, IonImg, FinisherHeaderComponent
  ]
})
export class AnimalsComponent implements OnInit {
  animals: Animal[] = [];  // Array to store animal data

  constructor(
    private animalService: AnimalService,  // Service for animal data
    private router: Router  // For navigation
  ) {
    // Register Ionic icons used in the template
    addIcons({ 
      'home-outline': homeOutline, 
      'list-outline': listOutline, 
      'heart-outline': heartOutline, 
      'call-outline': callOutline 
    });
  }

  ngOnInit(): void {
    // Fetch animals data on component initialization
    this.animalService.getAnimals().subscribe({
      next: (data) => this.animals = data,
      error: (err) => console.error('Failed to load animals', err)
    });
  }
  
  // Navigation methods
  navigateToHome() {
    this.router.navigate(['/home']);  // Navigate to home page
  }
  
  navigateToFavorites() {
    this.router.navigate(['/favourites']);  // Navigate to favorites page
  }
  
  navigateToContacts() {
    this.router.navigate(['/contact']);  // Navigate to contacts page
  }

  // Navigate to details view for specific animal
  goToAnimalDetails(id: number): void {
    this.router.navigate(['/animals', id]);
  }
}
