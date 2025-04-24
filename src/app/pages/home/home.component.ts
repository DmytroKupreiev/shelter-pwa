import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
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
  constructor(private animalService: AnimalService, private router: Router) {}

  animals: Animal[] = [];
  randomAnimals: Animal[] = [];

  ngOnInit(): void {
    this.animalService.getAnimals().subscribe({
      next: (data) => this.animals = data,
      error: (err) => console.error('Error loading animals', err)
    });
    this.animalService.getRandomAnimals(1).subscribe({
      next: (data) => this.randomAnimals = data,
      error: (err) => console.error('Error loading random animals', err)
    });
  }
  
  navigateToAnimals() {
    this.router.navigate(['/animals']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}
