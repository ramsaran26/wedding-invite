import { Injectable } from '@angular/core';
import { WEDDING_THEME } from '../data/wedding.config';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  async init() {
    this.apply(WEDDING_THEME);
    try {
      const res = await fetch('theme.json');
      if (res.ok) this.apply(await res.json());
    } catch { /* keep defaults */ }
  }

  // text1 -> --color-text-1, primary -> --color-primary
  apply(theme: Record<string, string>) {
    const style = document.documentElement.style;
    for (const [key, value] of Object.entries(theme)) {
      style.setProperty('--color-' + key.replace(/(\d+)/, '-$1'), value);
    }
  }
}
