// src/app/favourites/favourites.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavouriteService } from '../../service/favourite.service';
import { Animal } from '../../service/animal.service';
import { IonicModule } from '@ionic/angular';
import { FinisherHeaderComponent } from '../../custom-components/finisher-header.component';
import { IonList, IonItem, IonLabel, IonImg, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, heartOutline, callOutline, heart } from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, IonicModule, FinisherHeaderComponent],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  favourites: Animal[] = []; // Array to store favorite animals

  constructor(
    private favouriteService: FavouriteService, // Favorites service injection
    private router: Router // Router injection
  ) {
    // Register Ionic icons
    addIcons({ 
      'home-outline': homeOutline,
      'list-outline': listOutline,
      'call-outline': callOutline,
    });
  }

  async ngOnInit() {
    await this.loadFavourites(); // Load favorites on init
  }

  // Load favorite animals from service
  async loadFavourites() {
    this.favourites = await this.favouriteService.getFavourites();
  }

  // Remove animal from favorites
  async removeFromFavourites(animalId: number) {
    await this.favouriteService.removeFavourite(animalId);
    await this.loadFavourites(); // Refresh list
  }

  // Navigate to animal details page
  goToAnimal(animal: Animal) {
    this.router.navigate(['/animal-detail', animal.id]);
  }

  // Navigation methods
  navigateToList() {
    this.router.navigate(['/animals']); // Animals list
  }
  
  navigateToHome() {
    this.router.navigate(['/home']); // Home page
  }
  
  navigateToContacts() {
    this.router.navigate(['/contact']); // Contact page
  }

  // Toast notification properties
  showToast = false; // Toast visibility flag
  toastMessage = ''; // Toast message content

  // Show adoption confirmation toast
  adoptAnimal(name: string) {
    this.toastMessage = `Thank you! We will contact you regarding ${name} within half an hour.`;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false; // Hide after 3 seconds
    }, 3000);
  }

}