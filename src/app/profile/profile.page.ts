import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline, bagOutline, locationOutline, cardOutline,
         settingsOutline, helpCircleOutline, logOutOutline, chevronForwardOutline, star } from 'ionicons/icons';
import { ShopService } from '../services/shop';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonIcon]
})
export class ProfilePage {
  menuItems = [
    { icon: 'heart-outline',         label: 'My Wishlist',      sub: 'Saved items'        },
    { icon: 'bag-outline',           label: 'My Orders',        sub: 'Track your orders'  },
    { icon: 'location-outline',      label: 'Addresses',        sub: 'Saved locations'    },
    { icon: 'card-outline',          label: 'Payment Methods',  sub: 'Cards & wallets'    },
    { icon: 'settings-outline',      label: 'Settings',         sub: 'App preferences'    },
    { icon: 'help-circle-outline',   label: 'Help & Support',   sub: 'FAQs and contact'   },
  ];

  constructor(public shop: ShopService, public router: Router) {
    addIcons({ heartOutline, bagOutline, locationOutline, cardOutline,
               settingsOutline, helpCircleOutline, logOutOutline, chevronForwardOutline, star });
  }
}