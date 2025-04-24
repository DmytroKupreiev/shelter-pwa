import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService, Animal } from '../../service/animal.service';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, heartOutline, callOutline } from 'ionicons/icons';
import { FinisherHeaderComponent } from '../../custom-components/finisher-header.component';

@Component({
  selector: 'app-animal-details',
  standalone: true,
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss'],
  imports: [IonButtons, IonIcon, IonButton,  CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, FinisherHeaderComponent]
})
export class AnimalDetailsComponent implements OnInit {
  animal?: Animal;

  constructor(private route: ActivatedRoute, private animalService: AnimalService, private router: Router) {
    addIcons({ 'home-outline': homeOutline, 
               'list-outline': listOutline, 
               'heart-outline': heartOutline, 
               'call-outline': callOutline });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.animalService.getAnimalById(id).subscribe({
      next: (data) => this.animal = data,
      error: (err) => console.error('Error loading animal', err)
    });
  }

  navigateToList() {
    this.router.navigate(['/animals']);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToFavorites(){

  }
  navigateToContacts(){
    this.router.navigate(['/contact']);
  }

}
