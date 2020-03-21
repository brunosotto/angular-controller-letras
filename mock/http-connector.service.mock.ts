import { of, throwError, Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';

const ResponseMock: any = {
  status: 0,
  json: () => {
    return {
      HostName: ''
    };
  }
};

const CustomResponseMock = (res: any) => {
  return {
    status: 0,
    json: () => {
      return res;
    }
  };
};

@Injectable()
export class HttpConnectorServiceMock {

  private _testSetup: any = {};

  public testSetup(key: string, value: any): void {
    this._testSetup[key] = value;
  }

  public getFromHub<T>(firstLevelUrl: string, secondLevelUrl: string): Observable<T> {
    return this.get();
  }

  public getFromHubByUrl<T>(observer: Observer<T>, url: string): void {
    this.get().subscribe(
      res => {
        observer.next(res);
        observer.complete();
      },
      error => {
        observer.error(error);
        observer.complete();
      },
    );
  }

  public get(): any {
    // o get olha para o setup e retorna o próximo da fila do respGet[]
    // se o próximo do respGet for um objeto e o atributo throw for true
    // retorna erro com o conteúdo do atributo error:any
    // {throw: true, error: ''}

    // verifica se tem algum retorno em especial
    const arr = this._testSetup.respGet;
    if (arr && Array.isArray(arr) && arr.length > 0) {

      const response = arr.shift();

      // decide se retorna como erro ou não
      if (response && response.throw === true) {

        // faz o retorno com erro do response programado
        return throwError(response.error);

      } else {

        // ajeita o response
        const res = response.direct === true ? response.msg : CustomResponseMock(response).json();

        // faz o retorno com sucesso do response programado
        return of(res);

      }

    } else {

      return of(ResponseMock.json());

    }
  }

  public postToHub<T, B>(firstLevelUrl: string, secondLevelUrl: string, body: B): Observable<T> {
    return this.post();
  }

  public post(): any {
    // o post olha para o setup e retorna o próximo da fila do respPost[]
    // se o próximo do respPost for um objeto e o atributo throw for true
    // retorna erro com o conteúdo do atributo error:any
    // {throw: true, error: ''}

    // verifica se tem algum retorno em especial
    const arr = this._testSetup.respPost;
    if (arr && Array.isArray(arr) && arr.length > 0) {

      const response = arr.shift();

      // decide se retorna como erro ou não
      if (response && response.throw === true) {

        // faz o retorno com erro do response programado
        return throwError(response.error);

      } else {

        // ajeita o response
        const res = response.direct === true ? response.msg : CustomResponseMock(response).json();

        // faz o retorno com sucesso do response programado
        return of(res);

      }

    } else {

      return of(ResponseMock.json());

    }
  }

  public put(): any {
    // o put olha para o setup e retorna o próximo da fila do respPut[]
    // se o próximo do respPut for um objeto e o atributo throw for true
    // retorna erro com o conteúdo do atributo error:any
    // {throw: true, error: ''}

    // verifica se tem algum retorno em especial
    const arr = this._testSetup.respPut;
    if (arr && Array.isArray(arr) && arr.length > 0) {

      const response = arr.shift();

      // decide se retorna como erro ou não
      if (response && response.throw === true) {

        // faz o retorno com erro do response programado
        return throwError(response.error);

      } else {

        // ajeita o response
        const res = response.direct === true ? response.msg : CustomResponseMock(response).json();

        // faz o retorno com sucesso do response programado
        return of(res);

      }

    } else {

      return of(ResponseMock.json());

    }
  }

  public delete(): any {
    // o delete olha para o setup e retorna o próximo da fila do respDelete[]
    // se o próximo do respDelete for um objeto e o atributo throw for true
    // retorna erro com o conteúdo do atributo error:any
    // {throw: true, error: ''}

    // verifica se tem algum retorno em especial
    const arr = this._testSetup.respDelete;
    if (arr && Array.isArray(arr) && arr.length > 0) {

      const response = arr.shift();

      // decide se retorna como erro ou não
      if (response && response.throw === true) {

        // faz o retorno com erro do response programado
        return throwError(response.error);

      } else {

        // ajeita o response
        const res = response.direct === true ? response.msg : CustomResponseMock(response).json();

        // faz o retorno com sucesso do response programado
        return of(res);

      }

    } else {

      return of(ResponseMock.json());

    }
  }
}
