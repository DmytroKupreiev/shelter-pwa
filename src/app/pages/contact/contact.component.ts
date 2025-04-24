import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, heartOutline, callOutline } from 'ionicons/icons';
import { FinisherHeaderComponent } from '../../custom-components/finisher-header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FinisherHeaderComponent
  ],
  templateUrl: './contact.component.html', // HTML template
  styleUrls: ['./contact.component.scss'] // Component styles
})
export class ContactComponent {
  constructor(private router: Router) {
    // Register Ionic icons used in template
    addIcons({ 
      'home-outline': homeOutline,
      'list-outline': listOutline, 
      'heart-outline': heartOutline,
      'call-outline': callOutline
    });
  }

  // Navigate to animals list page
  navigateToList() {
    this.router.navigate(['/animals']);
  }

  // Navigate to home page
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  // Navigate to favorites page
  navigateToFavorites() {
    this.router.navigate(['/favourites']);
  }
}