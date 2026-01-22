import { Directive, input } from '@angular/core';
import { ButtonAppearance, ButtonSize } from '@shared/model/button.model';

@Directive({
  selector: '[appButton]',
  host: {
    class: 'app-btn',
    '[attr.data-appearance]': 'appearance()',
    '[attr.data-size]': 'size()'
  }
})
export class Button {
  appearance = input<ButtonAppearance>('ghost');
  size = input<ButtonSize>('m');
}
