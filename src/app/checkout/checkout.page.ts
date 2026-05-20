import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar,
  IonButtons, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, locationOutline, cardOutline,
         cashOutline, phonePortraitOutline, bagOutline } from 'ionicons/icons';
import { ShopService, ShippingInfo } from '../services/shop';
import { AddressPaymentService, SavedAddress } from '../services/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar,
    IonButtons, IonButton, IonIcon
  ]
})
export class CheckoutPage implements OnInit {

  step = 1;
  selectedAddrId = -1;
  useNewAddress  = false;
  paymentMethod  = 'cod';

  shipping: ShippingInfo = {
    fullName: '', phone: '', address: '',
    city: '', province: '', zip: ''
  };

  // Fallback payment options if none saved
  fallbackPayments = [
    { id: 'cod',   label: 'Cash on Delivery',   detail: 'Pay when order arrives', icon: 'cash-outline'            },
    { id: 'gcash', label: 'GCash',               detail: 'Pay via GCash app',      icon: 'phone-portrait-outline'  },
    { id: 'card',  label: 'Credit / Debit Card', detail: 'Visa, Mastercard, etc.', icon: 'card-outline'            },
  ];

  constructor(
    public shop:    ShopService,
    public addrSvc: AddressPaymentService,
    public router:  Router
  ) {
    addIcons({ arrowBackOutline, locationOutline, cardOutline,
               cashOutline, phonePortraitOutline, bagOutline });
  }

  ngOnInit(): void {
    if (this.shop.getCheckoutItems().length === 0) {
      this.router.navigate(['/cart']);
      return;
    }

    // Auto-select default address
    const defAddr = this.addrSvc.defaultAddress();
    if (defAddr) {
      this.selectedAddrId = defAddr.id;
      this.fillFromAddress(defAddr);
      this.useNewAddress = false;
    } else {
      this.useNewAddress = true;
    }

    // Auto-select default payment
    const defPay = this.addrSvc.defaultPayment();
    if (defPay) {
      this.paymentMethod = defPay.type;
    }
  }

  fillFromAddress(addr: SavedAddress): void {
    const parts = [addr.street, addr.barangay].filter(s => s?.trim());
    this.shipping = {
      fullName: addr.fullName,
      phone:    addr.phone,
      address:  parts.join(', '),
      city:     addr.city,
      province: addr.province,
      zip:      addr.zip,
    };
  }

  selectSavedAddress(addr: SavedAddress): void {
    this.selectedAddrId = addr.id;
    this.useNewAddress  = false;
    this.fillFromAddress(addr);
  }

  getPaymentIcon(type: string): string {
    if (type === 'card')  return 'card-outline';
    if (type === 'gcash') return 'phone-portrait-outline';
    return 'cash-outline';
  }

  getSelectedPaymentLabel(): string {
    const saved = this.addrSvc.payments().find(p => p.type === this.paymentMethod);
    if (saved) return saved.label;
    return this.fallbackPayments.find(p => p.id === this.paymentMethod)?.label ?? 'Cash on Delivery';
  }

  get hasSavedAddresses(): boolean { return this.addrSvc.addresses().length > 0; }
  get hasSavedPayments():  boolean { return this.addrSvc.payments().length  > 0; }
  get checkoutItems()              { return this.shop.getCheckoutItems(); }
  get checkoutTotal()              { return this.shop.getCheckoutTotal(); }

  get shippingValid(): boolean {
    const s = this.shipping;
    return !!(s.fullName && s.phone && s.address && s.city && s.province && s.zip);
  }

  nextStep() { if (this.step < 3) this.step++; }
  prevStep() { if (this.step > 1) this.step--; }

  placeOrder(): void {
    const order = this.shop.placeOrder(this.shipping, this.paymentMethod);
    this.router.navigate(['/order-success'], { state: { order } });
  }
}