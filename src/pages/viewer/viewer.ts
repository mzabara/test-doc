import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { distinctUntilChanged, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { DocumentStore } from '@shared/store/document.store';
import { AnnotationStore } from '@shared/store/annotation.store';
import { ZoomStore } from '@shared/store/zoom.store';
import { PageComponent } from '@pages/page/page';
import { NotFound } from '@shared/components/not-found/not-found';
import { Loader } from '@shared/components/loader/loader';

@Component({
  selector: 'app-viewer',
  imports: [PageComponent, NotFound, Loader],
  templateUrl: 'viewer.html',
  styleUrl: './viewer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Viewer {
  // DI
  private readonly route = inject(ActivatedRoute);
  public readonly store = inject(DocumentStore);
  private readonly annotationStore = inject(AnnotationStore);
  readonly zoom = inject(ZoomStore).zoom;

  readonly documentId = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id') ?? '1'),
      distinctUntilChanged()
    ),
    {initialValue: '1'}
  );

  constructor() {
    effect(() => {
      const id = this.documentId();
      this.annotationStore.reset();
      this.store.load(id);
    });
  }
}
