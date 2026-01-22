import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { Button } from '@shared/directives/button';
import { DocumentStore } from '@shared/store/document.store';
import { AnnotationStore } from '@shared/store/annotation.store';
import { ZoomStore } from '@shared/store/zoom.store';

@Component({
  selector: 'app-toolbar',
  imports: [
    Button
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toolbar {
  // DI
  public readonly store = inject(DocumentStore);
  public readonly annotationStore = inject(AnnotationStore);
  private readonly zoomStore = inject(ZoomStore);

  // UI
  readonly scale = this.zoomStore.scaleLabel;

  readonly addAnnotation = output<void>();
  readonly saveDocument = output<void>();

  protected zoomIn(): void {
    this.zoomStore.zoomIn();
  }

  protected zoomOut(): void {
    this.zoomStore.zoomOut();
  }

  protected requestAnnotation(): void {
    this.addAnnotation.emit();
  }

  protected requestSave(): void {
    this.saveDocument.emit();
  }

}
