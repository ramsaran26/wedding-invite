import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChildren } from '@angular/core';
import { WEDDING } from '../../data/wedding.config';

const SETTLE = 700;  // ms a point stays before its arrow starts
const DRAW = 1300;   // ms for the arrow to draw (keep a little above the CSS 1.2s)

@Component({
  selector: 'app-story',
  templateUrl: './story.html',
  styleUrl: './story.css',
})
export class Story {
  story = WEDDING.story;

  // 0 = point 1, 1 = arrow 1, 2 = point 2, 3 = arrow 2, ...
  stage = signal(-1);
  items = viewChildren<ElementRef<HTMLElement>>('item');

  private dead = false;
  private observers: IntersectionObserver[] = [];

  constructor() {
    afterNextRender(() => this.play());
    inject(DestroyRef).onDestroy(() => {
      this.dead = true;
      this.observers.forEach(o => o.disconnect());
    });
  }

  private async play() {
    const els = this.items();
    for (let i = 0; i < els.length; i++) {
      await this.whenVisible(els[i].nativeElement);
      if (this.dead) return;
      this.stage.set(i * 2); // show point

      if (i === els.length - 1) break;
      await this.wait(SETTLE);
      if (this.dead) return;
      this.stage.set(i * 2 + 1); // draw arrow to next point
      await this.wait(DRAW);
    }
  }

  private whenVisible(el: HTMLElement) {
    return new Promise<void>(resolve => {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { io.disconnect(); resolve(); }
      }, { threshold: 0.3 });
      io.observe(el);
      this.observers.push(io);
    });
  }

  private wait(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }
}