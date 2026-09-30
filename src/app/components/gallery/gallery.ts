import { Component } from '@angular/core';
import { WEDDING } from '../../data/wedding.config';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-gallery',
  imports: [Reveal],
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.css'],
})
export class Gallery { w = WEDDING; }
