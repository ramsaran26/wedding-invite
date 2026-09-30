import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { WEDDING } from '../../data/wedding.config';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.html',
  styleUrls: ['./countdown.css'],
})
export class Countdown {
  private target = new Date(WEDDING.date).getTime();
  now = signal(Date.now());
  left = computed(() => {
    const s = Math.max(0, Math.floor((this.target - this.now()) / 1000));
    return [
      { l: 'Days', v: Math.floor(s / 86400) },
      { l: 'Hours', v: Math.floor((s % 86400) / 3600) },
      { l: 'Minutes', v: Math.floor((s % 3600) / 60) },
      { l: 'Seconds', v: s % 60 },
    ];
  });
  constructor() {
    const t = setInterval(() => this.now.set(Date.now()), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(t));
  }
}
