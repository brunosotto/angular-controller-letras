import { Component } from '@angular/core';
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

  public emitir(ver: Versiculo): void {
    const text = `${ver.texto}\n\n${this.livro.nome} ${this.capitulo.capitulo}:${String(ver.versiculo)}`;

    // TODO: bloquear todos até receber de volta
    this.config.sendText(text);
  }

}
