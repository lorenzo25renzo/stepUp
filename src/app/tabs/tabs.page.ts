import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { homeOutline, home, gridOutline, grid, bagOutline, bag, personOutline, person } from 'ionicons/icons';
import { ShopService } from '../services/shop';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, CommonModule],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button tab="home" href="/home">
          <ion-icon name="home-outline"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="products" href="/products">
          <ion-icon name="grid-outline"></ion-icon>
          <ion-label>Shop</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="cart" href="/cart" class="cart-tab">
          <div class="cart-icon-wrap">
            <ion-icon name="bag-outline"></ion-icon>
            @if (shop.cartCount() > 0) {
              <span class="tab-badge">{{ shop.cartCount() }}</span>
            }
          </div>
          <ion-label>Cart</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="profile" href="/profile">
          <ion-icon name="person-outline"></ion-icon>
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  styles: [`
    .custom-tab-bar {
      --background: #ffffff;
      --border: none;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.07);
      height: 64px;
      padding-bottom: env(safe-area-inset-bottom);
    }
    ion-tab-button {
      --color: #bbb;
      --color-selected: #3880ff;
      font-size: 0.65rem;
      font-weight: 600;
    }
    .cart-icon-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tab-badge {
      position: absolute;
      top: -6px;
      right: -10px;
      background: #ff4757;
      color: #fff;
      font-size: 0.58rem;
      font-weight: 700;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class TabsPage {
  constructor(public shop: ShopService) {
    addIcons({ homeOutline, home, gridOutline, grid, bagOutline, bag, personOutline, person });
  }
}