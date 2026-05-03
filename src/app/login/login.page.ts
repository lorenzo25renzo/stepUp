import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline, logoGoogle, logoFacebook } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon]
})
export class LoginPage {
  email        = '';
  password     = '';
  rememberMe   = false;
  showPassword = false;
  isLoading    = false;
  errorMsg     = '';

  constructor(
    public router: Router,
    private auth: AuthService,
    private alertCtrl: AlertController
  ) {
    addIcons({ eyeOutline, eyeOffOutline, logoGoogle, logoFacebook });
  }

  togglePassword() { this.showPassword = !this.showPassword; }

  login() {
    this.errorMsg = '';

    if (!this.email || !this.password) {
      this.errorMsg = 'Please fill in all fields.';
      return;
    }

    if (!this.email.includes('@')) {
      this.errorMsg = 'Please enter a valid email address.';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const result = this.auth.login(this.email, this.password);
      this.isLoading = false;

      if (result.success) {
        this.router.navigate(['/home'], { replaceUrl: true });
      } else {
        this.errorMsg = result.message;
      }
    }, 1000);
  }

  socialLogin(platform: string) {
    this.auth.socialLogin(platform);
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  async forgotPassword() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password',
      message: 'Enter your registered email address.',
      cssClass: 'pink-alert',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-cancel-btn',
        },
        {
          text: 'Submit',
          cssClass: 'alert-confirm-btn',
          handler: (data) => {
            if (!data.email || !data.email.includes('@')) {
              this.errorMsg = 'Please enter a valid email.';
              return;
            }
            const result = this.auth.forgotPassword(data.email);
            this.showForgotResult(result.message);
          }
        }
      ]
    });

    await alert.present();
  }

  async showForgotResult(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Password Recovery',
      message,
      cssClass: 'pink-alert',
      buttons: [{ text: 'OK', cssClass: 'alert-confirm-btn' }]
    });
    await alert.present();
  }

  goToRegister() { this.router.navigate(['/register']); }
}