import { Component } from '@angular/core';
import { WEDDING } from '../../data/wedding.config';

@Component({
  selector: 'app-events',
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  events = WEDDING.events;

  mapLink(e: { mapUrl: string; place: string }) {
    return e.mapUrl || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(e.place);
  }
}