import { Component, computed, signal } from '@angular/core';
import { WEDDING } from '../../data/wedding.config';

// 2027-02-14T09:30:00+05:30 -> 20270214T040000Z (the format calendars expect)
const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, '');

// escape text for .ics files
const esc = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.css',
})
export class Rsvp {
  w = WEDDING;
  guest = signal('');

  private cal = WEDDING.calendar;
  private title = `${WEDDING.groom} & ${WEDDING.bride} Wedding`;
  private day = new Date(WEDDING.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  groomLink = computed(() => this.chat(WEDDING.whatsapp.groom, WEDDING.groom));
  brideLink = computed(() => this.chat(WEDDING.whatsapp.bride, WEDDING.bride));

  // Android (and any browser): opens Google Calendar with the event filled in
  googleUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(this.title)}` +
    `&dates=${stamp(this.cal.start)}/${stamp(this.cal.end)}` +
    `&details=${encodeURIComponent(this.cal.description)}` +
    `&location=${encodeURIComponent(this.cal.location)}`;

  onName(e: Event) {
    this.guest.set((e.target as HTMLInputElement).value);
  }

  private chat(number: string, name: string) {
    const who = this.guest().trim();
    const text = `Hi ${name}! ${who ? `This is ${who}. ` : ''}Thank you for the invitation to your wedding. I would love to join your celebration!`;
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }

  // iPhone (and Android too): downloads an .ics file that opens in the calendar app
  downloadIcs() {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invite//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${stamp(this.cal.start)}@wedding-invite`,
      `DTSTAMP:${stamp(new Date().toISOString())}`,
      `DTSTART:${stamp(this.cal.start)}`,
      `DTEND:${stamp(this.cal.end)}`,
      `SUMMARY:${esc(this.title)}`,
      `DESCRIPTION:${esc(this.cal.description)}`,
      `LOCATION:${esc(this.cal.location)}`,
      'BEGIN:VALARM',
      'TRIGGER:-P1D', // reminder one day before
      'ACTION:DISPLAY',
      `DESCRIPTION:${esc(this.title)} is tomorrow`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ];
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}