import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';

@Directive({ selector: '[reveal]', host: { class: 'reveal' } })
export class Reveal {
  constructor() {
    const el: HTMLElement = inject(ElementRef).nativeElement;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    inject(DestroyRef).onDestroy(() => io.disconnect());
  }
}
