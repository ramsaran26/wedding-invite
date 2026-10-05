import { Component, signal } from '@angular/core';
import { WEDDING } from '../../data/wedding.config';

@Component({
  selector: 'app-nav',
  host: { '(window:scroll)': 'onScroll()' },
  templateUrl: './nav.html',
  styleUrls: ['./nav.css'],
})
export class Nav {
  w = WEDDING;
  solid = signal(false);
  open = signal(false);
  links = [
    { id: 'story', label: 'Our story' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'rsvp', label: 'RSVP' }
  ];
  onScroll() { this.solid.set(window.scrollY > 40); }
}
