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
  favourites: Animal[] = [];

  constructor(private favouriteService: FavouriteService, private router: Router) {
    addIcons({ 'home-outline': homeOutline, 
               'list-outline': listOutline, 
               'call-outline': callOutline, });
  }

  async ngOnInit() {
    await this.loadFavourites();
  }

  async loadFavourites() {
    this.favourites = await this.favouriteService.getFavourites();
  }

  async removeFromFavourites(animalId: number) {
    await this.favouriteService.removeFavourite(animalId);
    await this.loadFavourites();
  }

  goToAnimal(animal: Animal) {
    this.router.navigate(['/animal-detail', animal.id]);
  }

  navigateToList() {
    this.router.navigate(['/animals']);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToContacts(){
    this.router.navigate(['/contact']);
  }

  showToast = false;
  toastMessage = '';

  adoptAnimal(name: string) {
    this.toastMessage = `Thank you! We will contact you regarding ${name} within half an hour.`;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

}