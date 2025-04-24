import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Animal } from './animal.service';

@Injectable({
  providedIn: 'root' // Service available app-wide
})
export class FavouriteService {
  private readonly STORAGE_KEY = 'favourite_animals'; // Storage key for favorites

  constructor(private storage: Storage) {} // Inject Ionic storage

  // Initialize storage
  async init() {
    await this.storage.create(); // Creates the storage instance
  }

  // Add animal to favorites if not already present
  async addFavourite(animal: Animal): Promise<void> {
    const favourites = await this.getFavourites();
    if (!favourites.some(fav => fav.id === animal.id)) {
      favourites.push(animal);
      await this.storage.set(this.STORAGE_KEY, favourites); // Save updated list
    }
  }

  // Remove animal from favorites by ID
  async removeFavourite(animalId: number): Promise<void> {
    const favourites = await this.getFavourites();
    const updated = favourites.filter(fav => fav.id !== animalId); // Filter out the animal
    await this.storage.set(this.STORAGE_KEY, updated); // Save filtered list
  }

  // Get all favorite animals (returns empty array if none)
  async getFavourites(): Promise<Animal[]> {
    return (await this.storage.get(this.STORAGE_KEY)) || [];
  }

  // Check if animal is in favorites
  async isFavourite(animalId: number): Promise<boolean> {
    const favourites = await this.getFavourites();
    return favourites.some(fav => fav.id === animalId); // Check existence
  }

  // Clear all favorites
  async clearFavourites(): Promise<void> {
    await this.storage.remove(this.STORAGE_KEY); // Remove entire favorites list
  }
}