import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Animal {
  id: number;
  name: string;
  breed: string;
  description: string;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'assets/data/animals.json';

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  getRandomAnimals(count: number): Observable<Animal[]> {
    return this.getAnimals().pipe(
      map(animals => animals.sort(() => 0.5 - Math.random()).slice(0, count))
    );
  }
}
