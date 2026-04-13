import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, addOutline, removeOutline, trashOutline, bagCheckOutline } from 'ionicons/icons';
import { ShopService } from '../services/shop';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
})
export class CartPage {
  constructor(public shop: ShopService, public router: Router) {
    addIcons({ arrowBackOutline, addOutline, removeOutline, trashOutline, bagCheckOutline });
  }
}