import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, heartOutline, heart, trashOutline, addOutline, star } from 'ionicons/icons';
import { ShopService } from '../services/shop';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
})
export class WishlistPage {

  constructor(public shop: ShopService, public router: Router) {
    addIcons({ arrowBackOutline, heartOutline, heart, trashOutline, addOutline, star });
  }

  get wishlistedProducts() {
    return this.shop.products.filter(p => this.shop.isWishlisted(p.id));
  }

  removeFromWishlist(id: number) {
    this.shop.toggleWishlist(id);
  }

  addToCart(product: any) {
    this.shop.addToCart(product, product.sizes[0], product.colors[0]);
  }

  goToDetail(id: number) {
    this.router.navigate(['/product', id]);
  }
}