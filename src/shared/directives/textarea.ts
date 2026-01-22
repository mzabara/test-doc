import { Directive } from '@angular/core';

@Directive({
  selector: '[appTextarea]',
  host: {
    class: 'app-textarea',
  }
})
export class Textarea {}
