import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, notificationsOutline, moonOutline,
         lockClosedOutline, languageOutline, shieldOutline } from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonToggle]
})
export class SettingsPage {
  notifications  = true;
  orderUpdates   = true;
  promoEmails    = false;
  darkMode       = false;

  constructor(public router: Router) {
    addIcons({ arrowBackOutline, notificationsOutline, moonOutline,
               lockClosedOutline, languageOutline, shieldOutline });
  }
}