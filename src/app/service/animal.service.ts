import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // For HTTP requests
import { Observable, map } from 'rxjs'; // RxJS operators

// Interface defining Animal data structure
export interface Animal {
  id: number;         // Unique identifier
  name: string;       // Animal's name
  breed: string;      // Animal breed
  description: string; // Description text
  photo: string;      // URL/path to photo
  age: string;        // Age information
}

@Injectable({
  providedIn: 'root' // Service available app-wide
})
export class AnimalService {
  private apiUrl = 'assets/data/animals.json'; // Data source path

  constructor(private http: HttpClient) {} // Inject HTTP client

  // Fetch all animals from JSON file
  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  // Get random subset of animals
  getRandomAnimals(count: number): Observable<Animal[]> {
    return this.getAnimals().pipe(
      // Shuffle array and take 'count' elements
      map(animals => animals.sort(() => 0.5 - Math.random()).slice(0, count))
    );
  }
  
  // Find single animal by ID
  getAnimalById(id: number): Observable<Animal | undefined> {
    return this.getAnimals().pipe(
      // Search for matching ID
      map(animals => animals.find(animal => animal.id === id))
    );
  }
}