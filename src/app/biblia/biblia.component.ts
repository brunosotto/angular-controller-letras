import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { versions } from './biblia.utils';
import { KeyValueModel } from '../models/key-value.model';
import { BibliaService } from './biblia.service';
import { BibliaLivro, Capitulo, Versiculo } from '../models/biblia.model';
import { ConfigService } from '../config/config.service';

const versionsArr = Object.keys(versions).map(k => ({ key: k, value: versions[k] }));

@Component({
  selector: 'app-biblia',
  templateUrl: './biblia.component.html',
  styleUrls: ['./biblia.component.scss'],
  providers: [
    BibliaService,
  ],
})
export class BibliaComponent {

  private destroy$: Subject<void> = new Subject<void>();
  public versao: string;
  public versions = versions;
  public versionsArr: KeyValueModel[] = versionsArr;
  public biblia$: Observable<BibliaLivro[]>;
  public siglaLivro: string;
  public livro: BibliaLivro;
  public capituloNum: number;
  public capitulo: Capitulo;
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
    private readonly service: BibliaService,
    private readonly config: ConfigService,
  ) {
    // monitora os params
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(params => {
        this.last = undefined;

        this.versao = params.versao;
        this.siglaLivro = params.siglaLivro;
        this.capituloNum = Number(params.capituloNum);
        this.biblia$ = this.service.getBiblia(this.versao)
          .pipe(
            tap((biblia: BibliaLivro[]) => this.getLivroCap(biblia))
          );
      });
  }

  private getLivroCap(biblia: BibliaLivro[]): void {
    if (!this.siglaLivro) {
      return;
    }

    this.livro = biblia.find(l => l.sigla === this.siglaLivro);

    if (!this.capituloNum) {
      return;
    }

    this.capitulo = this.livro.capitulos.find(c => c.capitulo === this.capituloNum);
  }

  private limpar(): void {
    // marca o forte
    this.forte = false;

    this.config.sendText(' ');
  }

  private reEmitir(): void {
    this.emitir(this.last || 0, true);
  }

  private next(): void {
    if (this.capitulo.versiculos.length === ((this.last || 0) + 1)) {
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

  public bookLink(sigla: string): string[] {
    if (this.capituloNum) {
      return ['../..', sigla];
    }

    if (this.siglaLivro) {
      return ['..', sigla];
    }

    return [sigla];
  }

  public capLink(cap: number): string[] {
    if (this.capituloNum) {
      return ['..', String(cap)];
    }

    return [String(cap)];
  }

  public emitir(index: number, autoScroll?: boolean): void {
    const ver = this.capitulo.versiculos[index];
    const text = `${ver.texto}\n\n${this.livro.nome} ${this.capitulo.capitulo}:${String(ver.versiculo)}`;

    // guarda o indice
    this.last = index;

    // marca o forte
    this.forte = true;

    // segue no scroll
    if (autoScroll) {
      const scrollId = index ? 'versiculo-' + (index - 1) : 'topo-title';
      this.scroll(scrollId);
    }

    // TODO: bloquear todos até receber de volta
    this.config.sendText(text);
  }

}
