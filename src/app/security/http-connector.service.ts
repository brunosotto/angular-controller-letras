import { DialogService } from './../design/dialog/dialog.service';
import { Dialog } from './../design/dialog/dialog.model';
import { ResponseModel } from './../models/response.model';
import { Observable, Subscriber, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpConnectorService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly dialog: DialogService
  ) { }

  public get<T>(url: string, replacement?: ReplacementParameter[]): Observable<T> {
    // faz replace na url se necessário
    url = this.replacement(url, replacement);

    // cria um observable para retorno
    return Observable.create(observer => {
      this.http.get(url).subscribe(
        (response: T) => this.onSuccess(observer, response),
        error => this.onError(error, observer)
      );
    });
  }

  public post(url: string, body: any, replacement?: ReplacementParameter[]): Observable<ResponseModel> {
    // faz replace na url se necessário
    url = this.replacement(url, replacement);

    // cria um observable para retorno
    return Observable.create(observer => {
      this.http.post(url, body).subscribe(
        (response: ResponseModel) => this.onSuccess(observer, response),
        error => this.onError(error, observer)
      );
    });
  }

  public put(url: string, body: any, replacement?: ReplacementParameter[]): Observable<ResponseModel> {
    // faz replace na url se necessário
    url = this.replacement(url, replacement);

    // cria um observable para retorno
    return Observable.create(observer => {
      this.http.put(url, body).subscribe(
        (response: ResponseModel) => this.onSuccess(observer, response),
        error => this.onError(error, observer)
      );
    });
  }

  public delete(url: string, replacement?: ReplacementParameter[]): Observable<ResponseModel> {
    // faz replace na url se necessário
    url = this.replacement(url, replacement);

    // cria um observable para retorno
    return Observable.create(observer => {
      this.http.delete(url).subscribe(
        (response: ResponseModel) => this.onSuccess(observer, response),
        error => this.onError(error, observer)
      );
    });
  }

  private replacement(url: string, replacement: ReplacementParameter[]): string {
    // se não tem o replacement já retorna a url
    if (!replacement) {
      return url;
    }

    // o replacement procura por {key} e troca pelo value
    replacement.forEach(r => {
      // gera o regex
      const regex = new RegExp(`{${r.key}}`, 'g');

      // substitui
      url = url.replace(regex, r.value);
    });

    // retorna a url modificada
    return url;
  }

  private onSuccess<T>(observer: Subscriber<any>, response: T): void {
    observer.next(response);
    observer.complete();
  }

  private onError(error: any, observer: Subscriber<any>): void {
    const UNAUTHORIZED = 401;

    if (error.status === UNAUTHORIZED) {
      this.router.navigateByUrl('/login');
    } else {
      // mostra mensagem se vier
      if (error && error.error && error.error.message) {
        this.communicationFailure(error.error.message);
      }
    }

    observer.error(error.error);
    observer.complete();
  }

  private communicationFailure(msg: string): void {
    const options: Dialog = {
      titulo: 'Erro',
      texto: msg,
      disableClose: false
    };
    this.dialog.open(options).subscribe();
  }

}

class ReplacementParameter {
  key: string;
  value: string;
}
