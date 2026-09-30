import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { WEDDING } from '../../data/wedding.config';

@Component({
  selector: 'app-footer',
  imports: [DatePipe],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer { w = WEDDING; }
