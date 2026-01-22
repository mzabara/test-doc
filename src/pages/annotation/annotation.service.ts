import { computed, inject, Injectable, signal } from '@angular/core';

import { createDragState, getDraggedRatio, getPointerRatio, Position } from '@shared/utils/drag';
import { ActiveDragState, Annotation } from '@pages/annotation/model/annotation.model';
import { AnnotationStore } from '@shared/store/annotation.store';

@Injectable()
export class AnnotationService {
  private readonly store = inject(AnnotationStore);
  private annotationCounter = 0;
  private readonly pageNumber = signal<number | null>(null);

  readonly annotations = computed(() => {
    const pageNumber = this.pageNumber();
    if (pageNumber === null) {
      return [];
    }
    return this.store.annotations().filter((item) => item.pageNumber === pageNumber);
  });
  readonly pendingPlacement = signal<Position | null>(null);

  readonly placingEnabled = signal(false);

  readonly dragState = signal<ActiveDragState | null>(null);

  enablePlacement(): void {
    this.placingEnabled.set(true);
    this.pendingPlacement.set(null);
  }

  disablePlacement(): void {
    this.placingEnabled.set(false);
  }

  setPageNumber(value: number): void {
    this.pageNumber.set(value);
    this.pendingPlacement.set(null);
  }

  placeAt(event: PointerEvent, pageElement: HTMLElement): void {
    if (!this.placingEnabled()) {
      return;
    }
    this.pendingPlacement.set(getPointerRatio(event, pageElement));
    this.placingEnabled.set(false);
  }

  save(text: string, pageNumber: number): void {
    const placement = this.pendingPlacement();

    if (!placement) {
      return;
    }

    const annotation: Annotation = {
      id: this.nextAnnotationId(pageNumber),
      x: placement.x,
      y: placement.y,
      text,
      pageNumber,
    };

    this.store.addAnnotation(annotation);
    this.pendingPlacement.set(null);
  }

  cancelPlacement(): void {
    this.pendingPlacement.set(null);
  }

  startDrag(event: PointerEvent, annotation: Annotation, pageElement: HTMLElement): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement | null;
    target?.setPointerCapture(event.pointerId);

    this.dragState.set({
      annotationId: annotation.id,
      ...createDragState(event, pageElement, {x: annotation.x, y: annotation.y})
    });
  }

  updateDrag(event: PointerEvent): void {
    const drag = this.dragState();
    if (!drag) {
      return;
    }

    const {x, y} = getDraggedRatio(event, drag);

    this.store.updateAnnotationPosition(drag.annotationId, x, y);
  }

  endDrag(): void {
    if (this.dragState()) {
      this.dragState.set(null);
    }
  }

  remove(id: string): void {
    this.store.removeAnnotation(id);
  }

  private nextAnnotationId(pageNumber: number): string {
    this.annotationCounter += 1;
    return `p${pageNumber}-a${this.annotationCounter}`;
  }
}
