import { Component } from '@angular/core';
import { Nav } from './components/nav/nav';
import { Hero } from './components/hero/hero';
import { Story } from './components/story/story';
import { Events } from './components/events/events';
// import { Venue } from './components/venue/venue';
import { Confetti } from './components/confetti/confetti';
import { Gallery } from './components/gallery/gallery';
import { Footer } from './components/footer/footer';
import { Rsvp } from './components/rsvp/rsvp';

@Component({
  selector: 'app-root',
  imports: [Nav, Hero, Story, Events, Confetti, Gallery, Footer, Rsvp],
  templateUrl: './app.html',
})
export class App {}
