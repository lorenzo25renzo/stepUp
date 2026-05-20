import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar,
  IonButtons, IonButton, IonIcon, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline, addOutline,
  trashOutline, locationOutline
} from 'ionicons/icons';
import { LocationService } from '../services/location.service';
import { AddressPaymentService } from '../services/address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar,
    IonButtons, IonButton, IonIcon
  ]
})
export class AddressesPage implements OnInit {

  showForm             = false;
  selectedRegionCode   = '';
  selectedProvinceCode = '';
  regionOpen           = false;
  provinceOpen         = false;
  cityOpen             = false;

  form = {
    label:    '',
    fullName: '',
    phone:    '',
    street:   '',
    barangay: '',
    city:     '',
    province: '',
    region:   '',
    zip:      '',
  };

  constructor(
    public  router:    Router,
    public  locSvc:    LocationService,
    public  addrSvc:   AddressPaymentService,
    private alertCtrl: AlertController
  ) {
    addIcons({
      arrowBackOutline, addOutline,
      trashOutline, locationOutline
    });
  }

  async ngOnInit(): Promise<void> {
    await this.locSvc.loadRegions();
  }

  toggleRegion(): void {
    this.regionOpen   = !this.regionOpen;
    this.provinceOpen = false;
    this.cityOpen     = false;
  }

  toggleProvince(): void {
    if (!this.selectedRegionCode) return;
    this.provinceOpen = !this.provinceOpen;
    this.regionOpen   = false;
    this.cityOpen     = false;
  }

  toggleCity(): void {
    if (!this.selectedProvinceCode) return;
    this.cityOpen     = !this.cityOpen;
    this.regionOpen   = false;
    this.provinceOpen = false;
  }

  closeAll(): void {
    this.regionOpen   = false;
    this.provinceOpen = false;
    this.cityOpen     = false;
  }

  async selectRegion(code: string, name: string): Promise<void> {
    this.selectedRegionCode   = code;
    this.form.region          = name;
    this.selectedProvinceCode = '';
    this.form.province        = '';
    this.form.city            = '';
    this.regionOpen           = false;
    await this.locSvc.loadProvinces(code);
  }

  async selectProvince(code: string, name: string): Promise<void> {
    this.selectedProvinceCode = code;
    this.form.province        = name;
    this.form.city            = '';
    this.provinceOpen         = false;
    await this.locSvc.loadCities(code);
  }

  selectCity(name: string): void {
    this.form.city = name;
    this.cityOpen  = false;
  }

  saveAddress(): void {
    if (!this.form.fullName.trim()) return;
    if (!this.form.street.trim())   return;
    if (!this.form.city.trim())     return;
    if (!this.form.province.trim()) return;

    this.addrSvc.addAddress({
      label:    this.form.label.trim()    || 'Home',
      fullName: this.form.fullName.trim(),
      phone:    this.form.phone.trim(),
      street:   this.form.street.trim(),
      barangay: this.form.barangay.trim(),
      city:     this.form.city.trim(),
      province: this.form.province.trim(),
      region:   this.form.region.trim(),
      zip:      this.form.zip.trim(),
    });

    this.resetForm();
    this.showForm = false;
  }

  resetForm(): void {
    this.form = {
      label: '', fullName: '', phone: '',
      street: '', barangay: '', city: '',
      province: '', region: '', zip: '',
    };
    this.selectedRegionCode   = '';
    this.selectedProvinceCode = '';
    this.closeAll();
  }

  async deleteAddress(id: number): Promise<void> {
    const alert = await this.alertCtrl.create({
      header:   'Delete Address',
      message:  'Remove this address?',
      cssClass: 'pink-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'alert-cancel-btn' },
        {
          text: 'Delete', cssClass: 'alert-logout-btn',
          handler: () => this.addrSvc.deleteAddress(id)
        }
      ]
    });
    await alert.present();
  }
}