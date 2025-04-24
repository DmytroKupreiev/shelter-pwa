import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, ViewDidEnter } from '@ionic/angular/standalone';
import { AnimalService, Animal } from '../../service/animal.service';
import { Router } from '@angular/router';
import { FinisherHeaderComponent } from '../../custom-components/finisher-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  imports: [CommonModule, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, FinisherHeaderComponent],
})
export class HomeComponent implements OnInit {
  animals: Animal[] = []; // Array for all animals
  randomAnimals: Animal[] = []; // Array for featured random animals

  constructor(
    private animalService: AnimalService, // Animal data service
    private router: Router // Router for navigation
  ) {}

  ngOnInit(): void {
    // Load all animals
    this.animalService.getAnimals().subscribe({
      next: (data) => this.animals = data,
      error: (err) => console.error('Error loading animals', err)
    });
    
    // Load featured random animals
    this.animalService.getRandomAnimals(1).subscribe({
      next: (data) => this.randomAnimals = data,
      error: (err) => console.error('Error loading random animals', err)
    });
  }

  // Navigate to animals list page
  navigateToAnimals() {
    this.router.navigate(['/animals']);
  }

  // Navigate to contact page
  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}
