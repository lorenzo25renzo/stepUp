import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  notificationsOutline,
  timeOutline,
  arrowBackOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon
  ]
})
export class NotificationsPage {

  notifications = [

    {
      title: 'Order Shipped',
      message: 'Your order is now on the way.',
      time: '5 mins ago'
    },

    {
      title: 'New Sneakers Collection',
      message: 'Check out the latest arrivals in StepUp.',
      time: '20 mins ago'
    },

    {
      title: 'Wishlist Discount',
      message: 'An item in your wishlist is now on sale.',
      time: '1 hour ago'
    },

    {
      title: 'Welcome Back!',
      message: 'Thank you for shopping with StepUp.',
      time: 'Today'
    }

  ];

  constructor(
    private router: Router
  ) {

    addIcons({
      notificationsOutline,
      timeOutline,
      arrowBackOutline
    });

  }

  /* Back Button */
  goBack() {

    this.router.navigate(['/profile']);

  }

}