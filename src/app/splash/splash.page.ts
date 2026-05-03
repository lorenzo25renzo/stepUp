import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent]
})
export class SplashPage implements OnInit, OnDestroy {

  // ── State machine ──────────────────────────────────────────
  // 'waiting'   → paused, showing "tap to continue"
  // 'animating' → playing the intro animation
  // 'done'      → navigation triggered
  phase: 'waiting' | 'animating' | 'done' = 'waiting';

  // Controls individual animation class triggers
  showLogo     = false;
  showTagline  = false;
  showParticles = false;
  showRing1    = false;
  showRing2    = false;

  private timers: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Page loads in 'waiting' phase — nothing animates yet
  }

  ngOnDestroy() {
    this.timers.forEach(t => clearTimeout(t));
  }

  // Called when user taps anywhere on the screen
  onTap() {
    if (this.phase !== 'waiting') return;
    this.phase = 'animating';
    this.playAnimation();
  }

  playAnimation() {
    // Staggered animation sequence
    const t1 = setTimeout(() => { this.showParticles = true; },   100);
    const t2 = setTimeout(() => { this.showRing1 = true; },       300);
    const t3 = setTimeout(() => { this.showRing2 = true; },       500);
    const t4 = setTimeout(() => { this.showLogo = true; },        700);
    const t5 = setTimeout(() => { this.showTagline = true; },    1300);
    // Navigate to login after animation completes
    const t6 = setTimeout(() => {
      this.phase = 'done';
      this.router.navigate(['/login']);
    }, 3000);

    this.timers.push(t1, t2, t3, t4, t5, t6);
  }
}