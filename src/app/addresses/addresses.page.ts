import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, addOutline, trashOutline, locationOutline, createOutline } from 'ionicons/icons';

interface Address {
  id: number;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  zip: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
})
export class AddressesPage {
  addresses: Address[] = [];
  showForm = false;
  nextId = 1;

  newAddress: Omit<Address, 'id' | 'isDefault'> = {
    label: '', fullName: '', phone: '',
    address: '', city: '', province: '', zip: ''
  };

  constructor(public router: Router, private alertCtrl: AlertController) {
    addIcons({ arrowBackOutline, addOutline, trashOutline, locationOutline, createOutline });
  }

  saveAddress() {
    if (!this.newAddress.fullName || !this.newAddress.address || !this.newAddress.city) return;

    this.addresses.push({
      ...this.newAddress,
      id: this.nextId++,
      label: this.newAddress.label || 'Home',
      isDefault: this.addresses.length === 0
    });

    this.newAddress = { label: '', fullName: '', phone: '', address: '', city: '', province: '', zip: '' };
    this.showForm = false;
  }

  setDefault(id: number) {
    this.addresses = this.addresses.map(a => ({ ...a, isDefault: a.id === id }));
  }

  async deleteAddress(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Address',
      message: 'Are you sure you want to remove this address?',
      cssClass: 'pink-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'alert-cancel-btn' },
        {
          text: 'Delete', cssClass: 'alert-logout-btn',
          handler: () => { this.addresses = this.addresses.filter(a => a.id !== id); }
        }
      ]
    });
    await alert.present();
  }
}