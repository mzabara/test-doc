import { Component, input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  template: `
    <img
      src="images/empty.svg"
      width="113"
      height="108"
      [alt]="message()"
    />
    {{ message() }}
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-inline: auto;
      margin-top: 5rem;
      gap: var(--ui-gap-m);
      max-width: 320px;
      text-align: center;
    }
  `,
})
export class NotFound {
  message = input<string | null>();
}
