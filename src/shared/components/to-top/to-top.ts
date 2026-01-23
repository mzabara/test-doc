import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Button } from '@shared/directives/button';

@Component({
  selector: 'app-to-top',
  imports: [
    Button
  ],
  template: `
    @if (visible()) {
      <button
        type="button"
        appButton
        appearance="icon"
        title="На верх"
        (click)="scrollTop()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
             class="lucide lucide-arrow-up-icon lucide-arrow-up"
        >
          <path d="m5 12 7-7 7 7"/>
          <path d="M12 19V5"/>
        </svg>
      </button>
    }
  `,
  styles: `
    :host {
      position: fixed;
      inset-inline-end: var(--ui-padding-l);
      inset-block-end: calc(var(--app-footer-height) + var(--ui-size-l));
      z-index: 10;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToTop {
  // DI
  private readonly document = inject(DOCUMENT);

  // UI
  readonly visible = signal(false);

  private readonly viewPort = this.document.defaultView;

  constructor() {
    effect((onCleanup) => {
      if (!this.viewPort) {
        return;
      }

      const onScroll = (): void => {
        this.visible.set(this.viewPort!.scrollY > 300);
      };

      this.viewPort.addEventListener('scroll', onScroll, {passive: true});
      onScroll();

      onCleanup(() => this.viewPort!.removeEventListener('scroll', onScroll));
    });
  }

  protected scrollTop(): void {
    this.viewPort?.scrollTo({top: 0, behavior: 'smooth'});
  }
}
