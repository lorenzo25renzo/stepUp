import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonButtons,
  IonButton, IonIcon, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, addOutline, trashOutline,
         cardOutline, cashOutline, phonePortraitOutline } from 'ionicons/icons';
import { AddressPaymentService } from '../services/address.service';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader,
            IonToolbar, IonButtons, IonButton, IonIcon]
})
export class PaymentMethodsPage {

  showForm    = false;
  newType     = 'card';
  cardName    = '';
  cardNumber  = '';
  cardExpiry  = '';
  cardCvv     = '';
  gcashNumber = '';
  gcashName   = '';
  errorMsg    = '';

  constructor(
    public  router:    Router,
    public  addrSvc:   AddressPaymentService,
    private alertCtrl: AlertController
  ) {
    addIcons({ arrowBackOutline, addOutline, trashOutline,
               cardOutline, cashOutline, phonePortraitOutline });
  }

  getIcon(type: string): string {
    if (type === 'card')  return 'card-outline';
    if (type === 'gcash') return 'phone-portrait-outline';
    return 'cash-outline';
  }

  formatCard(event: Event): void {
    const el  = event.target as HTMLInputElement;
    const raw = el.value.replace(/\D/g, '').substring(0, 16);
    const fmt = raw.match(/.{1,4}/g)?.join(' ') ?? raw;
    this.cardNumber = fmt;
    el.value        = fmt;
  }

  formatExpiry(event: Event): void {
    const el  = event.target as HTMLInputElement;
    const raw = el.value.replace(/\D/g, '').substring(0, 4);
    const fmt = raw.length > 2
      ? raw.substring(0, 2) + '/' + raw.substring(2)
      : raw;
    this.cardExpiry = fmt;
    el.value        = fmt;
  }

  saveMethod(): void {
    this.errorMsg = '';

    if (this.newType === 'card') {
      if (!this.cardName.trim()) {
        this.errorMsg = 'Please enter the cardholder name.'; return;
      }
      const digits = this.cardNumber.replace(/\s/g, '');
      if (digits.length < 13) {
        this.errorMsg = 'Please enter a valid card number.'; return;
      }
      if (this.cardExpiry.length < 5) {
        this.errorMsg = 'Please enter expiry date (MM/YY).'; return;
      }
      if (this.cardCvv.length < 3) {
        this.errorMsg = 'Please enter a valid CVV.'; return;
      }

      this.addrSvc.addPayment({
        type:   'card',
        label:  this.cardName.trim(),
        detail: `**** **** **** ${digits.slice(-4)} · Exp ${this.cardExpiry}`,
      });

    } else {
      if (!this.gcashNumber.trim()) {
        this.errorMsg = 'Please enter your GCash number.'; return;
      }
      if (!this.gcashName.trim()) {
        this.errorMsg = 'Please enter your GCash account name.'; return;
      }

      this.addrSvc.addPayment({
        type:   'gcash',
        label:  `GCash — ${this.gcashName.trim()}`,
        detail: this.gcashNumber.trim(),
      });
    }

    this.cardName    = '';
    this.cardNumber  = '';
    this.cardExpiry  = '';
    this.cardCvv     = '';
    this.gcashNumber = '';
    this.gcashName   = '';
    this.errorMsg    = '';
    this.showForm    = false;
  }

  async deleteMethod(id: number): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Remove', message: 'Remove this payment method?',
      cssClass: 'pink-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'alert-cancel-btn' },
        { text: 'Remove', cssClass: 'alert-logout-btn',
          handler: () => this.addrSvc.deletePayment(id) }
      ]
    });
    await alert.present();
  }
}