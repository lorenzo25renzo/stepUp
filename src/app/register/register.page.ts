import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon]
})
export class RegisterPage {
  fullName        = '';
  email           = '';
  phone           = '';
  password        = '';
  confirmPassword = '';
  agreeTerms      = false;
  showPassword    = false;
  showConfirm     = false;
  isLoading       = false;
  errorMsg        = '';

  constructor(
    public router: Router,
    private auth: AuthService,
    private alertCtrl: AlertController
  ) {
    addIcons({ eyeOutline, eyeOffOutline });
  }

  togglePassword() { this.showPassword = !this.showPassword; }
  toggleConfirm()  { this.showConfirm  = !this.showConfirm;  }

  register() {
    this.errorMsg = '';

    if (!this.fullName || !this.email || !this.phone || !this.password || !this.confirmPassword) {
      this.errorMsg = 'Please fill in all fields.';
      return;
    }

    if (!this.email.includes('@')) {
      this.errorMsg = 'Please enter a valid email address.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMsg = 'Password must be at least 6 characters.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match.';
      return;
    }

    if (!this.agreeTerms) {
      this.errorMsg = 'Please agree to the Terms & Conditions.';
      return;
    }

    this.isLoading = true;

    setTimeout(async () => {
      const result = this.auth.register({
        fullName: this.fullName,
        email:    this.email,
        phone:    this.phone,
        password: this.password,
      });

      this.isLoading = false;

      if (result.success) {
        // Show success then redirect to login
        const alert = await this.alertCtrl.create({
          header: '🎉 Account Created!',
          message: `Welcome, ${this.fullName}! Please sign in with your new account.`,
          cssClass: 'pink-alert',
          buttons: [{
            text: 'Go to Login',
            cssClass: 'alert-confirm-btn',
            handler: () => {
              this.router.navigate(['/login'], { replaceUrl: true });
            }
          }]
        });
        await alert.present();
      } else {
        this.errorMsg = result.message;
      }
    }, 1000);
  }

  goToLogin() { this.router.navigate(['/login']); }
}