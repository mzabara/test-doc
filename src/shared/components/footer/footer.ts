import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <div class="copyright">
      &copy; Maksim Zabara, 2026, Telegram: <a href="https://t.me/mzabara" class="tg-link">mzabara</a>
    </div>
  `,
  styleUrl: './footer.scss',
})
export class Footer {}
