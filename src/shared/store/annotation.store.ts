import { computed, Injectable, signal } from '@angular/core';
import { Annotation } from '@pages/annotation/model/annotation.model';

@Injectable({providedIn: 'root'})
export class AnnotationStore {
  readonly annotations = signal<Annotation[]>([]);
  readonly addAnnotationEnabled = signal(false);

  readonly hasAnnotations = computed(() => this.annotations().length > 0);

  startAnnotation(): void {
    this.addAnnotationEnabled.set(true);
  }

  finishAnnotation(): void {
    this.addAnnotationEnabled.set(false);
  }

  reset(): void {
    this.annotations.set([]);
    this.addAnnotationEnabled.set(false);
  }

  addAnnotation(annotation: Annotation): void {
    this.annotations.update((items) => [...items, annotation]);
  }

  updateAnnotationPosition(id: string, x: number, y: number): void {
    this.annotations.update((items) =>
      items.map((item) => (item.id === id ? {...item, x, y} : item))
    );
  }

  removeAnnotation(id: string): void {
    this.annotations.update((items) => items.filter((item) => item.id !== id));
  }
}
