import { Component, OnInit } from '@angular/core';
import { FavouriteService } from './service/favourite.service';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, RouterModule],
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
})
export class AppComponent implements OnInit {
  constructor(private favouriteService: FavouriteService) {}

  async ngOnInit() {
    await this.favouriteService.init();
  }
}