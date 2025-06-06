import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService, Animal } from '../../service/animal.service';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, heartOutline, callOutline, heart, shareOutline } from 'ionicons/icons';
import { FinisherHeaderComponent } from '../../custom-components/finisher-header.component';
import { FavouriteService } from '../../service/favourite.service';
import { Share } from '@capacitor/share';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-animal-details',
  standalone: true,
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss'],
  imports: [IonFabButton, IonFab, IonButtons, IonIcon, IonButton, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, FinisherHeaderComponent]
})
export class AnimalDetailsComponent implements OnInit {
  animal?: Animal; // Currently displayed animal

  constructor(
    private route: ActivatedRoute, // For getting route parameters
    private animalService: AnimalService, // Animal data service
    private router: Router, // For navigation
    private favouriteService: FavouriteService, // Favorites functionality
  ) {
    // Register Ionic icons used in the template
    addIcons({
      'home-outline': homeOutline,
      'list-outline': listOutline,
      'heart-outline': heartOutline,
      'call-outline': callOutline,
      'heart': heart,
      'share-outline': shareOutline
    });
  }

  ngOnInit(): void {
    // Get animal ID from route and fetch details
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.animalService.getAnimalById(id).subscribe({
      next: (data) => this.animal = data,
      error: (err) => console.error('Error loading animal', err)
    });
  }

  // Share animal details via native share dialog
  async shareAnimal() {
    if (!this.animal) return;

    try {
      await Share.share({
        title: `Help ${this.animal.name} find a home!`,
        text: `Hello! This is ${this.animal.name}, ${this.animal.breed}${this.animal.age ? ', ' + this.animal.age + ' years' : ''}. ${this.animal.description}`,
        url: `https://your-shelter.com/animals/${this.animal.id}`,
        dialogTitle: 'Share a story'
      });
    } catch (error) {
      console.error('Error:', error);
      // Fallback: Copy link to clipboard
      await Toast.show({
        text: 'Link copied to clipboard!',
        duration: 'short'
      });
      await navigator.clipboard.writeText(`https://your-shelter.com/animals/${this.animal.id}`);
    }
  }

  // Add current animal to favorites
  addToFavourites() {
    if (this.animal) {
      this.favouriteService.addFavourite(this.animal);
    }
  }

  // Navigation methods
  navigateToList() {
    this.router.navigate(['/animals']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToFavorites() {
    this.router.navigate(['/favourites']);
  }

  navigateToContacts() {
    this.router.navigate(['/contact']);
  }
  
}
