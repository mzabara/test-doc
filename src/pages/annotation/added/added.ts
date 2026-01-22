import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { AnnotationService } from '@pages/annotation/annotation.service';
import { Annotation } from '@pages/annotation/model/annotation.model';
import { Button } from '@shared/directives/button';

@Component({
  selector: 'app-added-annotation',
  imports: [
    Button
  ],
  templateUrl: './added.html',
  styleUrl: './added.scss',
  host: {
    '[style.left.%]': 'annotation().x * 100',
    '[style.top.%]': 'annotation().y * 100',
    '(pointerdown)': 'startDrag($event)',
    '(document:pointermove)': 'onPointerMove($event)',
    '(document:pointerup)': 'onPointerUp()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddedAnnotation {
  private readonly annotationsService = inject(AnnotationService);

  readonly annotation = input.required<Annotation>();

  protected startDrag(event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement | null;
    const pageElement = target?.closest('.page-canvas') as HTMLElement | null;

    if (!pageElement) {
      return;
    }
    this.annotationsService.startDrag(event, this.annotation(), pageElement);
  }

  protected onPointerMove(event: PointerEvent): void {
    this.annotationsService.updateDrag(event);
  }

  protected onPointerUp(): void {
    this.annotationsService.endDrag();
  }

  protected remove(): void {
    this.annotationsService.remove(this.annotation().id);
  }
}
