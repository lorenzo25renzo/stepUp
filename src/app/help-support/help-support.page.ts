import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, chevronDownOutline, chevronUpOutline,
         mailOutline, callOutline, logoFacebook } from 'ionicons/icons';

interface FAQ {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.page.html',
  styleUrls: ['./help-support.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon]
})
export class HelpSupportPage {
  faqs: FAQ[] = [
    { question: 'How do I track my order?',             answer: 'Go to Profile → My Orders to see your order status and details.',                                             open: false },
    { question: 'Can I cancel or return an order?',     answer: 'You can request a cancellation or return within 7 days of delivery by contacting our support team.',          open: false },
    { question: 'What payment methods are accepted?',   answer: 'We accept Cash on Delivery, GCash, and Credit/Debit Cards.',                                                  open: false },
    { question: 'How long does delivery take?',         answer: 'Standard delivery takes 3-7 business days. Express delivery is available at checkout.',                       open: false },
    { question: 'How do I change my account details?',  answer: 'Currently account details are set during registration. Account editing will be available in a future update.', open: false },
    { question: 'Is my payment information secure?',    answer: 'Yes, all payment data is encrypted. We never store your full card details on our servers.',                    open: false },
  ];

  constructor(public router: Router) {
    addIcons({ arrowBackOutline, chevronDownOutline, chevronUpOutline,
               mailOutline, callOutline, logoFacebook });
  }

  toggle(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}