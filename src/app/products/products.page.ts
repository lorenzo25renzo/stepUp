import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, heartOutline, heart, star, bagOutline, addOutline, funnelOutline } from 'ionicons/icons';
import { ShopService } from '../services/shop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon,]
})
export class ProductsPage {
  activeCategory = 'All';
  searchQuery = '';
  sortBy = 'default';

  categories = ['All', 'Sneakers', 'Casual', 'Sports'];

  constructor(public shop: ShopService, public router: Router) {
    addIcons({ arrowBackOutline, heartOutline, heart, star, bagOutline, addOutline, funnelOutline });
  }

  get filtered() {
    let list = this.shop.getByCategory(this.activeCategory);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.type.toLowerCase().includes(q));
    }
    if (this.sortBy === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (this.sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (this.sortBy === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }

  toggleWish(e: Event, id: number) { e.stopPropagation(); this.shop.toggleWishlist(id); }
  goToDetail(id: number)           { this.router.navigate(['/product', id]); }
}