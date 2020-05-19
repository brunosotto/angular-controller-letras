import { Component, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LouvorService } from '../louvor.service';
import { Louvor } from 'src/app/models/louvor.model';
import { ConfigService } from 'src/app/config/config.service';

@Component({
  selector: 'app-louvor-show',
  templateUrl: './louvor-show.component.html',
  styleUrls: ['./louvor-show.component.scss']
})
export class LouvorShowComponent implements OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public louvor: Louvor;
  public last: number;
  public forte: boolean;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'Escape') {
      this.limpar();
    }

    if (event.key === 'ArrowRight') {
      this.reEmitir();
    }

    if (event.key === 'ArrowDown') {
      this.next();
    }

    if (event.key === 'ArrowUp') {
      this.prev();
    }
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly louvorService: LouvorService,
    private readonly service: ConfigService,
  ) {
    this.route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => this.louvorService.findLouvor(String(params.id)))
    ).subscribe(l => {
      l.arr = this.toArray(l.text);
      this.louvor = l;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toArray(text: string): string[] {
    return text.replace(/\r\n/g, '\n').split(/[\n]{2,}/g);
  }

  private limpar(): void {
    // marca o forte
    this.forte = false;

    this.service.sendText(' ');
  }

  private reEmitir(): void {
    this.emitir(this.last || 0, true);
  }

  private next(): void {
    if (this.louvor.arr.length === ((this.last || 0) + 1)) {
      return;
    }

    this.emitir(isNaN(this.last) ? 0 : (this.last + 1), true);
  }

  private prev(): void {
    if (this.last === 0) {
      return;
    }

    this.emitir(isNaN(this.last) ? 0 : (this.last - 1), true);
  }

  private scroll(id): void {
    const el = document.getElementById(id);
    el.scrollIntoView();
  }

  public emitir(index: number, autoScroll?: boolean): void {
    // guarda o indice
    this.last = index;

    // marca o forte
    this.forte = true;

    // segue no scroll
    if (autoScroll) {
      const scrollId = index ? 'louvor-' + (index - 1) : 'topo-title';
      this.scroll(scrollId);
    }

    // TODO: bloquear todos até receber de volta
    this.service.sendText(this.louvor.arr[this.last]);
  }

}
