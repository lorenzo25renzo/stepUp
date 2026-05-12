import { Injectable, signal, computed } from '@angular/core';

export interface UserAccount {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoggedInUser {
  fullName: string;
  email: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  // ── In-memory user storage (clears on restart) ────────────
  private _accounts = signal<UserAccount[]>([]);
  private _currentUser = signal<LoggedInUser | null>(null);

  currentUser = computed(() => this._currentUser());
  isLoggedIn  = computed(() => this._currentUser() !== null);

  // ── Register ──────────────────────────────────────────────
  register(account: UserAccount): { success: boolean; message: string } {
    const exists = this._accounts().find(
      a => a.email.toLowerCase() === account.email.toLowerCase()
    );

    if (exists) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    this._accounts.update(list => [...list, account]);
    return { success: true, message: 'Account created successfully!' };
  }

  // ── Login ─────────────────────────────────────────────────
  login(email: string, password: string): { success: boolean; message: string } {
    const account = this._accounts().find(
      a => a.email.toLowerCase() === email.toLowerCase()
    );

    if (!account) {
      return { success: false, message: 'No account found with this email.' };
    }

    if (account.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    this._currentUser.set({
      fullName: account.fullName,
      email: account.email,
      phone: account.phone,
    });

    return { success: true, message: 'Login successful!' };
  }

  // ── Social Login (Google / Facebook) ─────────────────────
  // Always logs in as Precious Nita Lipon
  socialLogin(platform: string): void {
    this._currentUser.set({
      fullName: 'Precious Nita Lipon',
      email:    platform === 'google'
                  ? 'nita.lipon@gmail.com'
                  : 'nita.lipon@facebook.com',
      phone: '09XX XXX XXXX',
    });
  }

  // ── Forgot Password ───────────────────────────────────────
  forgotPassword(email: string): { success: boolean; message: string } {
    const account = this._accounts().find(
      a => a.email.toLowerCase() === email.toLowerCase()
    );

    if (!account) {
      return { success: false, message: 'No account found with this email.' };
    }

    // In a real app this would send an email
    // For now we just return the password as a simulation
    return {
      success: true,
      message: `Your password is: ${account.password}`
    };
  }

  // ── Logout ────────────────────────────────────────────────
  logout(): void {
    this._currentUser.set(null);
  }

  getAvatarUrl(name: string): string {
  const seed = name.replace(/\s+/g, '');
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=fde8f3`;
}
}