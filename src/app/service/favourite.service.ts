import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Animal } from './animal.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private readonly STORAGE_KEY = 'favourite_animals';

  constructor(private storage: Storage) {}

  async init() {
    await this.storage.create();
  }

  async addFavourite(animal: Animal): Promise<void> {
    const favourites = await this.getFavourites();
    if (!favourites.some(fav => fav.id === animal.id)) {
      favourites.push(animal);
      await this.storage.set(this.STORAGE_KEY, favourites);
    }
  }

  async removeFavourite(animalId: number): Promise<void> {
    const favourites = await this.getFavourites();
    const updated = favourites.filter(fav => fav.id !== animalId);
    await this.storage.set(this.STORAGE_KEY, updated);
  }

  async getFavourites(): Promise<Animal[]> {
    return (await this.storage.get(this.STORAGE_KEY)) || [];
  }

  async isFavourite(animalId: number): Promise<boolean> {
    const favourites = await this.getFavourites();
    return favourites.some(fav => fav.id === animalId);
  }

  async clearFavourites(): Promise<void> {
    await this.storage.remove(this.STORAGE_KEY);
  }
}