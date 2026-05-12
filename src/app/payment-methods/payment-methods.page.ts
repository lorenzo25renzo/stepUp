import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, addOutline, trashOutline, cardOutline, cashOutline, phonePortraitOutline } from 'ionicons/icons';

interface PaymentMethod {
  id: number;
  type: 'card' | 'gcash' | 'cod';
  label: string;
  detail: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
})
export class PaymentMethodsPage {
  methods: PaymentMethod[] = [
    { id: 1, type: 'cod',   label: 'Cash on Delivery', detail: 'Pay when your order arrives', isDefault: true },
  ];

  showForm = false;
  nextId   = 2;
  newType: 'card' | 'gcash' = 'card';
  cardNumber  = '';
  cardName    = '';
  gcashNumber = '';

  constructor(public router: Router, private alertCtrl: AlertController) {
    addIcons({ arrowBackOutline, addOutline, trashOutline, cardOutline, cashOutline, phonePortraitOutline });
  }

  getIcon(type: string) {
    if (type === 'card')  return 'card-outline';
    if (type === 'gcash') return 'phone-portrait-outline';
    return 'cash-outline';
  }

  saveMethod() {
    if (this.newType === 'card') {
      if (!this.cardNumber || !this.cardName) return;
      const masked = '**** **** **** ' + this.cardNumber.slice(-4);
      this.methods.push({ id: this.nextId++, type: 'card', label: this.cardName, detail: masked, isDefault: false });
    } else {
      if (!this.gcashNumber) return;
      this.methods.push({ id: this.nextId++, type: 'gcash', label: 'GCash', detail: this.gcashNumber, isDefault: false });
    }
    this.cardNumber = ''; this.cardName = ''; this.gcashNumber = '';
    this.showForm = false;
  }

  setDefault(id: number) {
    this.methods = this.methods.map(m => ({ ...m, isDefault: m.id === id }));
  }

  async deleteMethod(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Remove Payment Method',
      message: 'Are you sure you want to remove this payment method?',
      cssClass: 'pink-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'alert-cancel-btn' },
        { text: 'Remove', cssClass: 'alert-logout-btn', handler: () => { this.methods = this.methods.filter(m => m.id !== id); } }
      ]
    });
    await alert.present();
  }
}