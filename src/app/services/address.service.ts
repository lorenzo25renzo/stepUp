import { Injectable, signal, computed } from '@angular/core';

export interface SavedAddress {
  id:        number;
  label:     string;
  fullName:  string;
  phone:     string;
  street:    string;
  barangay:  string;
  city:      string;
  province:  string;
  region:    string;
  zip:       string;
  isDefault: boolean;
}

export interface SavedPayment {
  id:        number;
  type:      string;
  label:     string;
  detail:    string;
  isDefault: boolean;
}

@Injectable({ providedIn: 'root' })
export class AddressPaymentService {

  private _addresses = signal<SavedAddress[]>([]);
  private _payments  = signal<SavedPayment[]>([
    {
      id: 1, type: 'cod',
      label: 'Cash on Delivery',
      detail: 'Pay when your order arrives',
      isDefault: true
    }
  ]);

  private _nextAddrId = 2;
  private _nextPayId  = 2;

  addresses      = computed(() => this._addresses());
  payments       = computed(() => this._payments());
  defaultAddress = computed(() => this._addresses().find(a => a.isDefault) ?? null);
  defaultPayment = computed(() => this._payments().find(p => p.isDefault) ?? null);

  addAddress(data: {
    label:    string;
    fullName: string;
    phone:    string;
    street:   string;
    barangay: string;
    city:     string;
    province: string;
    region:   string;
    zip:      string;
  }): void {
    const isFirst = this._addresses().length === 0;
    const newAddr: SavedAddress = {
      id:        this._nextAddrId++,
      isDefault: isFirst,
      label:     data.label    || 'Home',
      fullName:  data.fullName || '',
      phone:     data.phone    || '',
      street:    data.street   || '',
      barangay:  data.barangay || '',
      city:      data.city     || '',
      province:  data.province || '',
      region:    data.region   || '',
      zip:       data.zip      || '',
    };
    this._addresses.update(list => [...list, newAddr]);
  }

  setDefaultAddress(id: number): void {
    this._addresses.update(list =>
      list.map(a => ({ ...a, isDefault: a.id === id }))
    );
  }

  deleteAddress(id: number): void {
    this._addresses.update(list => list.filter(a => a.id !== id));
  }

  addPayment(data: {
    type:   string;
    label:  string;
    detail: string;
  }): void {
    const newPay: SavedPayment = {
      id:        this._nextPayId++,
      isDefault: false,
      type:      data.type   || 'cod',
      label:     data.label  || '',
      detail:    data.detail || '',
    };
    this._payments.update(list => [...list, newPay]);
  }

  setDefaultPayment(id: number): void {
    this._payments.update(list =>
      list.map(p => ({ ...p, isDefault: p.id === id }))
    );
  }

  deletePayment(id: number): void {
    this._payments.update(list =>
      list.filter(p => !(p.id === id && p.type !== 'cod'))
    );
  }
}