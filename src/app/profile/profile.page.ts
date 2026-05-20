import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonIcon,
  AlertController,
  ActionSheetController
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  heartOutline,
  bagOutline,
  locationOutline,
  cardOutline,
  settingsOutline,
  helpCircleOutline,
  logOutOutline,
  chevronForwardOutline,
  trashOutline,
  imageOutline,
  notificationsOutline
} from 'ionicons/icons';

import { ShopService } from '../services/shop';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonIcon
  ]
})
export class ProfilePage {

  @ViewChild('photoInput')
  photoInput!: ElementRef<HTMLInputElement>;

  profilePhoto = '';

  menuItems = [

    {
      icon: 'heart-outline',
      label: 'My Wishlist',
      sub: 'Saved items',
      route: '/wishlist'
    },

    {
      icon: 'bag-outline',
      label: 'My Orders',
      sub: 'Track your orders',
      route: '/orders'
    },

    {
      icon: 'location-outline',
      label: 'Addresses',
      sub: 'Saved locations',
      route: '/addresses'
    },

    {
      icon: 'card-outline',
      label: 'Payment Methods',
      sub: 'Cards & wallets',
      route: '/payment-methods'
    },

    {
      icon: 'settings-outline',
      label: 'Settings',
      sub: 'App preferences',
      route: '/settings'
    },

    {
      icon: 'help-circle-outline',
      label: 'Help & Support',
      sub: 'FAQs and contact',
      route: '/help-support'
    }

  ];

  constructor(
    public shop: ShopService,
    public auth: AuthService,
    public router: Router,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController
  ) {

    addIcons({
      heartOutline,
      bagOutline,
      locationOutline,
      cardOutline,
      settingsOutline,
      helpCircleOutline,
      logOutOutline,
      chevronForwardOutline,
      trashOutline,
      imageOutline,
      notificationsOutline
    });

  }

  get initials(): string {

    const name = this.auth.currentUser()?.fullName ?? '';

    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

  }

  /* Open Notification Page */
  openNotifications() {

    this.router.navigate(['/notifications']);

  }

  async pickPhoto(): Promise<void> {

    if (!this.profilePhoto) {

      this.photoInput.nativeElement.click();
      return;

    }

    const actionSheet = await this.actionSheetCtrl.create({

      header: 'Profile Photo',
      mode: 'md',

      buttons: [

        {
          text: 'Upload New Photo',
          icon: 'image-outline',

          handler: () => {

            this.photoInput.nativeElement.click();

          }
        },

        {
          text: 'Delete Photo',
          role: 'destructive',
          icon: 'trash-outline',

          handler: () => {

            this.deletePhoto();

          }
        },

        {
          text: 'Cancel',
          role: 'cancel'
        }

      ]

    });

    await actionSheet.present();

  }

  deletePhoto(): void {

    this.profilePhoto = '';
    this.photoInput.nativeElement.value = '';

  }

  onPhotoSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

      this.profilePhoto = e.target?.result as string;

    };

    reader.readAsDataURL(file);

  }

  navigate(route: string) {

    this.router.navigate([route]);

  }

  async logout() {

    const alert = await this.alertCtrl.create({

      header: 'Log Out',
      message: 'Are you sure you want to log out?',
      cssClass: 'pink-alert',

      buttons: [

        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-cancel-btn'
        },

        {
          text: 'Log Out',
          cssClass: 'alert-logout-btn',

          handler: () => {

            this.auth.logout();

            this.router.navigate(
              ['/login'],
              { replaceUrl: true }
            );

          }
        }

      ]

    });

    await alert.present();

  }

}