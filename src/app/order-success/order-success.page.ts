import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { Order } from '../services/shop';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.page.html',
  styleUrls: ['./order-success.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent]
})
export class OrderSuccessPage implements OnInit {
  order!: Order;

  constructor(public router: Router) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.order = nav?.extras?.state?.['order'];
    if (!this.order) this.router.navigate(['/home']);
  }
}