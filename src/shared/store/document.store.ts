import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, distinctUntilChanged, filter, finalize, of, switchMap, tap } from 'rxjs';

import { DocumentService } from '@shared/api/api.service';
import { DocumentData } from '@pages/viewer/model/document.model';
import { Annotation } from '@pages/annotation/model/annotation.model';

@Injectable({providedIn: 'root'})
export class DocumentStore {
  private readonly api = inject(DocumentService);

  private readonly documentId = signal<string | null>(null);

  readonly loading = signal(false);

  // Errors
  readonly errorMessage = signal<string | null>(null);

  readonly emptyPagesMessage = computed(() => {
    const document = this.document();

    if (!document) {
      return null;
    }

    return document.pages.length === 0
      ? 'В документе отсутствуют страницы для просмотра.'
      : null;
  });

  readonly document = toSignal(
    toObservable(this.documentId).pipe(
      filter((id): id is string => Boolean(id)),
      distinctUntilChanged(),
      tap(() => {
        this.loading.set(true);
        this.errorMessage.set(null);
      }),
      switchMap((id) =>
        this.api.getDocument(id).pipe(
          catchError(() => {
            this.errorMessage.set('Не удалось загрузить документ.');
            return of(null);
          }),
          finalize(() => this.loading.set(false))
        )
      )
    ),
    {initialValue: null as DocumentData | null}
  );

  load(id: string): void {
    this.documentId.set(id);
  }

  saveDocument(annotations: Annotation[]): void {
    const document = this.document();
    if (!document) {
      return;
    }

    const payload = {
      id: this.documentId() ?? '',
      annotations,
      ...document,
    };

    console.log('Информация о документе:', payload);
  }
}
