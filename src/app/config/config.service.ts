import { environment } from './../../environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpConnectorService } from '../security/http-connector.service';

@Injectable()
export class ConfigService {

  private config: Config;
  private _config: ReplaySubject<Config> = new ReplaySubject();
  public config$: Observable<Config> = this._config.asObservable();

  constructor(
    private readonly http: HttpConnectorService
  ) {
    this.http.get(environment.config)
    // TODO: takeuntil destroy
      .pipe(
        pluck('0'),
      )
      .subscribe((c: Config) => {
        this.config = c;
        this._config.next(c);
      });
  }

  public sendText(text: string): void {
    // TODO: deve ser um observable
    this.config.text = text;

    this.emit();
  }

  public setConfigs(top: boolean, size: number, pad: number): void {
    // TODO: deve ser um observable
    this.config.top = top;
    this.config.size = size;
    this.config.pad = pad;

    this.emit();
  }

  private emit(): void {
    // TODO: deve ser um observable
    // TODO: type para o response
    this.http.post(environment.text, this.config).subscribe(res => this.config.id = res.id);
  }

}

export class Config {
    id?: string;
    top: boolean;
    size: number;
    pad: number;
    text?: string;
}
