import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar,
  IonButtons, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline, locationOutline, cardOutline,
  cashOutline, phonePortraitOutline, bagOutline,
  chevronDownOutline
} from 'ionicons/icons';
import { ShopService, ShippingInfo } from '../services/shop';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon
  ]
})
export class CheckoutPage implements OnInit {

  step = 1;

  shipping: ShippingInfo = {
    fullName: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    zip: ''
  };

  paymentMethod = 'cod';

  paymentOptions = [
    { id: 'cod',   label: 'Cash on Delivery',    icon: 'cash-outline'           },
    { id: 'gcash', label: 'GCash',                icon: 'phone-portrait-outline' },
    { id: 'card',  label: 'Credit / Debit Card',  icon: 'card-outline'           },
  ];

  constructor(public shop: ShopService, public router: Router) {
    addIcons({
      arrowBackOutline, locationOutline, cardOutline,
      cashOutline, phonePortraitOutline, bagOutline,
      chevronDownOutline
    });
  }

  ngOnInit() {
    if (this.shop.getCheckoutItems().length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  get checkoutItems() { return this.shop.getCheckoutItems(); }
  get checkoutTotal() { return this.shop.getCheckoutTotal(); }

  get shippingValid(): boolean {
    const s = this.shipping;
    return !!(s.fullName && s.phone && s.address && s.city && s.province && s.zip);
  }

  nextStep() { if (this.step < 3) this.step++; }
  prevStep() { if (this.step > 1) this.step--; }

  placeOrder() {
    const order = this.shop.placeOrder(this.shipping, this.paymentMethod);
    this.router.navigate(['/order-success'], { state: { order } });
  }
}