import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
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
  public louvor$: Observable<Louvor>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly louvorService: LouvorService,
    private readonly service: ConfigService,
  ) {
    this.louvor$ = this.route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => this.louvorService.findLouvor(String(params.id)))
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toArray(text: string): string[] {
    return text.replace(/\r\n/g, '\n').split(/[\n]{2,}/g);
  }

  public emitir(text: string): void {
    // TODO: bloquear todos até receber de volta
    this.service.sendText(text);
  }

}
