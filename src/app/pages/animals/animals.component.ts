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
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss'],
  imports: [IonIcon, IonButton, IonButtons,  CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonImg, FinisherHeaderComponent]
})
export class AnimalsComponent  implements OnInit {
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
  
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToFavorites(){
    this.router.navigate(['/favourites']);
  }
  navigateToContacts(){
    this.router.navigate(['/contact']);
  }

  goToAnimalDetails(id: number): void {
    this.router.navigate(['/animals', id]);
  }
}
