import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, heartOutline, callOutline } from 'ionicons/icons';
import { FinisherHeaderComponent } from '../../custom-components/finisher-header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, FinisherHeaderComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private router: Router) {
    addIcons({ 'home-outline': homeOutline, 
               'list-outline': listOutline, 
               'heart-outline': heartOutline, 
               'call-outline': callOutline });
  }
  navigateToList() {
    this.router.navigate(['/animals']);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToFavorites(){

  }
}
