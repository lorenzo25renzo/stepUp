import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonIcon, IonButton,
  IonButtons, IonHeader, IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline, heart, heartOutline,
  star, addOutline, removeOutline,
  shareOutline, cartOutline
} from 'ionicons/icons';
import { ShopService, Product } from '../services/shop';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonHeader,
    IonToolbar
  ]
})
export class ProductDetailPage implements OnInit {
  product!: Product;
  selectedSize!: number;
  selectedColor!: string;
  selectedImg = 0;
  added = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public shop: ShopService
  ) {
    addIcons({
      arrowBackOutline, heart, heartOutline,
      star, addOutline, removeOutline,
      shareOutline, cartOutline
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.shop.getProduct(id)!;
    this.selectedSize  = this.product.sizes[0];
    this.selectedColor = this.product.colors[0];
  }

  addToCart() {
    this.shop.addToCart(this.product, this.selectedSize, this.selectedColor);
    this.added = true;
    setTimeout(() => this.added = false, 2000);
  }

  buyNow() {
    this.shop.setBuyNow(this.product, this.selectedSize, this.selectedColor);
    this.router.navigate(['/checkout']);
  }
}