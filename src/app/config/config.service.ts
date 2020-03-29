import { environment } from './../../environments/environment';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { pluck, takeUntil } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpConnectorService } from '../security/http-connector.service';

@Injectable()
export class ConfigService implements OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  private config: Config;
  private _config: ReplaySubject<Config> = new ReplaySubject();
  public config$: Observable<Config> = this._config.asObservable();

  constructor(
    private readonly http: HttpConnectorService
  ) {
    this.http.get<Config[]>(environment.config)
      .pipe(
        takeUntil(this.destroy$),
        pluck('0'),
      )
      .subscribe((c: Config) => {
        this.config = c;
        this._config.next(c);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public sendText(text: string): void {
    // TODO: deve ser um observable
    this.config.text = text;

    this.emitText();
  }

  public setConfigs(top: boolean, size: number, pad: number): void {
    // TODO: deve ser um observable
    this.config.top = top;
    this.config.size = size;
    this.config.pad = pad;

    this.emitConfig();
  }

  private emitText(): void {
    // TODO: deve ser um observable
    this.http.post(environment.text, {text: this.config.text}).subscribe();
  }

  private emitConfig(): void {
    // TODO: deve ser um observable
    this.http.post(environment.text, {...this.config, text: undefined}).subscribe(res => this.config.id = res.id);
  }

}

export class Config {
  id?: string;
  top: boolean;
  size: number;
  pad: number;
  text?: string;
}
