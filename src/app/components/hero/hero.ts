import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { WEDDING } from '../../data/wedding.config';
import { Countdown } from '../countdown/countdown';

@Component({
  selector: 'app-hero',
  imports: [DatePipe, Countdown],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero { w = WEDDING; }
