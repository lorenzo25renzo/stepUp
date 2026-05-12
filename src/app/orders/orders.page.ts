import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, checkmarkCircleOutline, timeOutline } from 'ionicons/icons';
import { ShopService } from '../services/shop';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
})
export class OrdersPage {
  constructor(public shop: ShopService, public router: Router) {
    addIcons({ arrowBackOutline, checkmarkCircleOutline, timeOutline });
  }
}