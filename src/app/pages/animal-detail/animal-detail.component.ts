import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService, Animal } from '../../service/animal.service';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, heartOutline, callOutline } from 'ionicons/icons';

@Component({
  selector: 'app-animal-details',
  standalone: true,
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss'],
  imports: [IonButtons, IonIcon, IonButton,  CommonModule, IonHeader, IonToolbar, IonTitle, IonContent ]
})
export class AnimalDetailsComponent implements OnInit, AfterViewInit {
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
