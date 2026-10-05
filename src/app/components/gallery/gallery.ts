import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { WEDDING } from '../../data/wedding.config';

const SPEED = 0.3; // radians per second (about 21s for a full loop)

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  photos = WEDDING.photos;
  angle = signal(0);
  paused = signal(false);
  stage = viewChild.required<ElementRef<HTMLElement>>('stage');

  // x = sideways position (-1..1), d = depth (1 = front, 0 = back)
  cards = computed(() => {
    const n = this.photos.length;
    const a = this.angle();
    return this.photos.map((src, i) => {
      const t = a + (i * 2 * Math.PI) / n;
      const d = (Math.cos(t) + 1) / 2;
      return { src, x: Math.sin(t).toFixed(3), d: d.toFixed(3), z: Math.round(d * 100), front: d > 0.97 };
    });
  });

  private step = (2 * Math.PI) / this.photos.length;
  private target: number | null = null;
  private raf = 0;
  private last = 0;
  private reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private startX = 0;
  private swiped = false;

  constructor() {
    const ref = inject(DestroyRef);
    afterNextRender(() => {
      // only animate while the gallery is on screen
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? this.run() : this.halt()), { threshold: 0.2 });
      io.observe(this.stage().nativeElement);
      ref.onDestroy(() => { io.disconnect(); this.halt(); });
    });
  }

  private run() {
    if (this.raf) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  private halt() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private tick = (now: number) => {
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    const a = this.angle();

    if (this.target !== null) {
      const diff = this.target - a; // glide to the chosen photo
      if (Math.abs(diff) < 0.002) { this.angle.set(this.target); this.target = null; }
      else this.angle.set(a + diff * Math.min(1, dt * 6));
    } else if (!this.paused() && !this.reduce) {
      this.angle.set(a - SPEED * dt); // slow auto-rotation
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  // prev / next buttons
  go(dir: number) {
    const front = Math.round(-this.angle() / this.step);
    this.target = -(front + dir) * this.step;
  }

  // click a photo to bring it to the front
  focus(i: number) {
    if (this.swiped) { this.swiped = false; return; }
    const full = 2 * Math.PI;
    let delta = (-i * this.step - this.angle()) % full;
    if (delta > Math.PI) delta -= full;
    if (delta < -Math.PI) delta += full;
    this.target = this.angle() + delta;
  }

  // pause on mouse hover only (touch taps shouldn't freeze it)
  onEnter(e: PointerEvent) { if (e.pointerType === 'mouse') this.paused.set(true); }

  // swipe left/right on phones
  onDown(e: PointerEvent) { this.startX = e.clientX; this.swiped = false; }
  onUp(e: PointerEvent) {
    const dx = e.clientX - this.startX;
    if (Math.abs(dx) > 40) { this.swiped = true; this.go(dx < 0 ? 1 : -1); }
  }
}