import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Button } from '@shared/directives/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Textarea } from '@shared/directives/textarea';
import { AnnotationService } from '@pages/annotation/annotation.service';
import { AnnotationPosition } from '@pages/annotation/model/annotation.model';


@Component({
  selector: 'app-add-new-annotation',
  imports: [
    Button,
    ReactiveFormsModule,
    Textarea
  ],
  templateUrl: './add-new.html',
  styleUrl: './add-new.scss',
  host: {
    class: 'annotation-editor',
    '[style.left.%]': 'position().x * 100',
    '[style.top.%]': 'position().y * 100',
    '(pointerdown)': '$event.stopPropagation()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewAnnotation {
  private readonly annotationsService = inject(AnnotationService);

  readonly position = input.required<AnnotationPosition>();
  readonly pageNumber = input.required<number>();

  protected readonly form = new FormGroup({
    text: new FormControl('', [Validators.required])
  });

  protected submit(): void {
    if (this.form.invalid) {
      return;
    }

    const text = this.form.value.text?.trim() ?? '';

    if (!text) {
      return;
    }

    this.annotationsService.save(text, this.pageNumber());
    this.form.reset();
  }

  protected cancelEdit(): void {
    this.annotationsService.cancelPlacement();
    this.form.reset();
  }
}
