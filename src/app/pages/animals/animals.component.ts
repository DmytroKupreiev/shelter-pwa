import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonImg, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AnimalService, Animal } from '../../service/animal.service';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, heartOutline, callOutline } from 'ionicons/icons';

@Component({
  selector: 'app-animals',
  standalone: true,
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss'],
  imports: [IonIcon, IonButton, IonButtons,  CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonImg]
})
export class AnimalsComponent  implements OnInit, AfterViewInit {

  animals: Animal[] = [];

  constructor(private animalService: AnimalService, private router: Router) {
    addIcons({ 'home-outline': homeOutline, 
               'list-outline': listOutline, 
               'heart-outline': heartOutline, 
               'call-outline': callOutline });
  }

  ngOnInit(): void {
    this.animalService.getAnimals().subscribe({
      next: (data) => this.animals = data,
      error: (err) => console.error('Failed to load animals', err)
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
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
    }, 0);
  }  

  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToFavorites(){

  }
  navigateToContacts(){
    this.router.navigate(['/contact']);
  }

  goToAnimalDetails(id: number): void {
    this.router.navigate(['/animals', id]);
  }
}
