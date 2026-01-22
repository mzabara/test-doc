import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Toolbar } from '@shared/components/toolbar/toolbar';
import { DocumentStore } from '@shared/store/document.store';
import { AnnotationStore } from '@shared/store/annotation.store';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    Toolbar
  ],
  template: `
    <a routerLink="/"
       class="logo"
    >
      DocMark
    </a>

    @if (store.document()) {
      <app-toolbar
        (addAnnotation)="addNewAnnotation()"
        (saveDocument)="saveDocument()"
      />
    }
  `,
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  public readonly store = inject(DocumentStore);
  private readonly annotationStore = inject(AnnotationStore);

  protected addNewAnnotation(): void {
    this.annotationStore.startAnnotation();
  }

  protected saveDocument(): void {
    this.store.saveDocument(this.annotationStore.annotations());
  }
}
