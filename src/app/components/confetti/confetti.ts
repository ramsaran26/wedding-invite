import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';

const PLAY_ONCE = false; // false = play on every page load (handy while tuning)
const GRAVITY = 0.35;
const DRAG = 0.99;

interface Piece {
  x: number; y: number; vx: number; vy: number;
  size: number; rot: number; vr: number;
  flip: number; vf: number; wob: number;
  life: number; color: string; shape: number;
}

@Component({
  selector: 'app-confetti',
  templateUrl: './confetti.html',
  styleUrl: './confetti.css',
})
export class Confetti {
  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('cv');
  done = signal(false);

  private ctx!: CanvasRenderingContext2D;
  private pieces: Piece[] = [];
  private colors: string[] = [];
  private w = 0;
  private h = 0;
  private raf = 0;
  private last = 0;
  private startAt = 0;
  private timers: number[] = [];

  constructor() {
    afterNextRender(() => this.start());
    inject(DestroyRef).onDestroy(() => {
      cancelAnimationFrame(this.raf);
      this.timers.forEach(t => clearTimeout(t));
    });
  }

  private start() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return this.done.set(true);
    if (PLAY_ONCE) {
      try {
        if (sessionStorage.getItem('popper')) return this.done.set(true);
        sessionStorage.setItem('popper', '1');
      } catch { /* storage blocked: just play */ }
    }

    const cv = this.canvas().nativeElement;
    const dpr = window.devicePixelRatio || 1;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    cv.width = this.w * dpr;
    cv.height = this.h * dpr;
    this.ctx = cv.getContext('2d')!;
    this.ctx.scale(dpr, dpr);

    const css = getComputedStyle(document.documentElement);
    const c = (name: string) => css.getPropertyValue(name).trim();
    this.colors = [c('--color-tertiary'), c('--color-secondary'), '#ffffff', c('--color-tertiary'), c('--color-secondary')];

    this.timers.push(
      window.setTimeout(() => this.pop(110), 700),   // first pop as the names appear
      window.setTimeout(() => this.pop(80), 2400),   // second pop as the countdown appears
    );
    this.last = this.startAt = performance.now();
    this.raf = requestAnimationFrame(t => this.frame(t));
  }

  // one popper from each bottom corner, shooting up and inwards
  private pop(count: number) {
    const base = Math.sqrt(2 * GRAVITY * this.h) * 1.05;
    for (const dir of [1, -1]) {
      for (let i = 0; i < count; i++) {
        const angle = 0.6 + Math.random() * 0.8; // 35 to 80 degrees above horizontal
        const speed = base * (0.45 + Math.random() * 0.65);
        this.pieces.push({
          x: dir === 1 ? 0 : this.w,
          y: this.h + 10,
          vx: dir * Math.cos(angle) * speed,
          vy: -Math.sin(angle) * speed,
          size: 5 + Math.random() * 6,
          rot: Math.random() * 6.28,
          vr: (Math.random() - 0.5) * 0.3,
          flip: Math.random() * 6.28,
          vf: 0.1 + Math.random() * 0.15,
          wob: Math.random() * 6.28,
          life: 220 + Math.random() * 140,
          color: this.colors[i % this.colors.length],
          shape: i % 3,
        });
      }
    }
  }

  private frame(now: number) {
    const dt = Math.min((now - this.last) / 16.67, 2);
    this.last = now;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);

    this.pieces = this.pieces.filter(p => p.life > 0 && p.y < this.h + 40);

    for (const p of this.pieces) {
      p.vx *= Math.pow(DRAG, dt);
      p.vy = Math.min(p.vy + GRAVITY * dt, 5); // capped fall speed = gentle flutter
      p.wob += 0.08 * dt;
      p.x += (p.vx + Math.sin(p.wob) * 0.6) * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      p.flip += p.vf * dt;
      p.life -= dt;

      ctx.save();
      ctx.globalAlpha = Math.min(1, p.life / 50);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.cos(p.flip)); // fake 3D flip
      ctx.fillStyle = p.color;
      if (p.shape === 0) {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2); // paper strip
      } else if (p.shape === 1) {
        ctx.beginPath(); ctx.arc(0, 0, p.size / 2.4, 0, 6.28); ctx.fill(); // dot
      } else {
        ctx.beginPath(); ctx.ellipse(0, 0, p.size / 1.6, p.size / 3, 0, 0, 6.28); ctx.fill(); // petal
      }
      ctx.restore();
    }

    if (!this.pieces.length && now - this.startAt > 3000) {
      ctx.clearRect(0, 0, this.w, this.h);
      this.done.set(true);
      return;
    }
    this.raf = requestAnimationFrame(t => this.frame(t));
  }
}