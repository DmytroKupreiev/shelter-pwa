import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, heartOutline, callOutline } from 'ionicons/icons';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  constructor(private router: Router) {
    addIcons({ 'home-outline': homeOutline, 
               'list-outline': listOutline, 
               'heart-outline': heartOutline, 
               'call-outline': callOutline });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if ((window as any).FinisherHeader) {
        new (window as any).FinisherHeader({
          count: 100,
          size: { min: 1, max: 2, pulse: 0 },
          speed: {
            x: { min: 0, max: 0.4 },
            y: { min: 0, max: 0.6 }
          },
          colors: {
            background: "#1e302b",
            particles: ["#fbfcca", "#d7f3fe", "#ffd0a7"]
          },
          blending: "none",
          opacity: {
            center: 1,
            edge: 0.5
          },
          skew: -2,
          shapes: ["c"]
        });
      } else {
        console.error('FinisherHeader not loaded');
      }
    }, 0);
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
