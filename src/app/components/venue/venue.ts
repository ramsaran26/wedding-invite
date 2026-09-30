import { Component } from '@angular/core';
import { WEDDING } from '../../data/wedding.config';

@Component({
  selector: 'app-venue',
  template: `
    <section id="venue" class="section">
      <h2 class="title">Venue</h2>
      <p class="name">{{ w.venueOne.name }}</p>
      <p>{{ w.venueOne.address }}</p>
      <p class="cta"><a class="btn" [href]="w.venueOne.mapUrl" target="_blank" rel="noopener">Get directions</a></p>
    </section>`,
  styles: `
    .name { font: 400 1.8rem var(--font-heading); color: var(--color-primary); }
    .cta { margin-top: 2rem; }`,
})
export class Venue { w = WEDDING; }
