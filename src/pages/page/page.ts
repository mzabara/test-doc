import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { DocumentPage } from '@pages/page/model/page.model';
import { NgOptimizedImage } from '@angular/common';
import { PageNumber } from '@shared/components/page-number/page-number';
import { AddNewAnnotation } from '@pages/annotation/add-new/add-new';
import { AnnotationStore } from '@shared/store/annotation.store';
import { AnnotationService } from '@pages/annotation/annotation.service';
import { AddedAnnotation } from '@pages/annotation/added/added';

@Component({
  selector: 'app-page',
  imports: [
    NgOptimizedImage,
    PageNumber,
    AddNewAnnotation,
    AddedAnnotation,
  ],
  templateUrl: './page.html',
  styleUrl: './page.scss',
  host: {
    '[attr.data-page-number]': 'page().number'
  },
  providers: [AnnotationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  // DI
  private readonly annotationStore = inject(AnnotationStore);
  private readonly annotationsService = inject(AnnotationService);

  readonly baseWidth = 800;
  readonly baseHeight = 1100;

  readonly page = input.required<DocumentPage>();
  readonly scale = input<number>(1);

  readonly annotations = this.annotationsService.annotations;
  readonly pendingPlacement = this.annotationsService.pendingPlacement;

  readonly showPlacementHint = computed(
    () => this.annotationStore.addAnnotationEnabled() && !this.pendingPlacement()
  );

  readonly scaledWidth = computed(() => Math.round(this.baseWidth * this.scale()));
  readonly scaledHeight = computed(() => Math.round(this.baseHeight * this.scale()));

  constructor() {
    effect(() => {
      this.annotationsService.setPageNumber(this.page().number);
    });

    effect(() => {
      const enabled = this.annotationStore.addAnnotationEnabled();

      if (enabled) {
        this.annotationsService.enablePlacement();
      } else {
        this.annotationsService.disablePlacement();
      }
    });
  }

  protected handleCanvas(event: PointerEvent, pageElement: HTMLElement): void {
    event.preventDefault();
    this.annotationsService.placeAt(event, pageElement);
    this.annotationStore.finishAnnotation();
  }
}
