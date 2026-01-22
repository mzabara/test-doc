import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-number',
  imports: [],
  template: `
    Страница: {{ pageNumber() }}
  `,
  styleUrl: './page-number.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNumber {
  readonly pageNumber = input.required<number>();
}
