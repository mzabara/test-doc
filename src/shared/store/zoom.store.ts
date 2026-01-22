import { computed, Injectable, signal } from '@angular/core';
import { zoomIn, zoomOut } from '@shared/utils/zoom';

@Injectable({providedIn: 'root'})
export class ZoomStore {
  readonly zoom = signal(1);
  readonly scaleLabel = computed(() => `${Math.round(this.zoom() * 100)}%`);

  private readonly minZoom = 0.5;
  private readonly maxZoom = 1.5;
  private readonly zoomStep = 0.1;

  zoomIn(): void {
    this.zoom.update((value) => zoomIn(value, this.maxZoom, this.zoomStep));
  }

  zoomOut(): void {
    this.zoom.update((value) => zoomOut(value, this.minZoom, this.zoomStep));
  }
}
