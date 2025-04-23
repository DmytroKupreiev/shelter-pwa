import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { AnimalService, Animal } from '../../service/animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
  imports: [CommonModule, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomeComponent implements AfterViewInit, OnInit {
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

  ngAfterViewInit(): void {
    if ((window as any).FinisherHeader) {
      new (window as any).FinisherHeader({
        count: 100,
        size: { min: 1, max: 2, pulse: 0 },
        speed: {
          x: { min: 0, max: 0.4 },
          y: { min: 0, max: 0.6 }
        },
        colors: {
          background: "#1e302b",
          particles: ["#fbfcca", "#d7f3fe", "#ffd0a7"]
        },
        blending: "none",
        opacity: {
          center: 1,
          edge: 0.5
        },
        skew: -2,
        shapes: ["c"]
      });
    } else {
      console.error('FinisherHeader not loaded');
    }
  }
  
  navigateToAnimals() {
    this.router.navigate(['/animals']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}
