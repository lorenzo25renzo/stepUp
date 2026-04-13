import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline, bagOutline, notificationsOutline, addOutline,
         heartOutline, heart, star, walkOutline, shirtOutline,
         footballOutline, gridOutline } from 'ionicons/icons';
import { ShopService } from '../services/shop';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
})
export class HomePage {
  activeCategory = 'All';

  categories = [
    { name: 'All',      icon: 'grid-outline'      },
    { name: 'Sneakers', icon: 'walk-outline'       },
    { name: 'Casual',   icon: 'shirt-outline'      },
    { name: 'Sports',   icon: 'football-outline'   },
  ];

  constructor(public shop: ShopService, public router: Router) {
    addIcons({ searchOutline, bagOutline, notificationsOutline, addOutline,
               heartOutline, heart, star, walkOutline, shirtOutline,
               footballOutline, gridOutline });
  }

  // Shows first 4 products of selected category
  get featured() {
    return this.shop.getByCategory(this.activeCategory).slice(0, 4);
  }

  setCategory(name: string) {
    this.activeCategory = name;
  }

  goToDetail(id: number)     { this.router.navigate(['/product', id]); }
  goToProducts()             { this.router.navigate(['/products']); }
  toggleWish(e: Event, id: number) { e.stopPropagation(); this.shop.toggleWishlist(id); }
}