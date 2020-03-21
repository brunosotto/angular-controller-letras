import { Dialog } from '../src/app/design/dialog/dialog.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class DialogServiceMock {
  private _testSetup: any = {};

  public testSetup(key: string, value: any): void {
    this._testSetup[key] = value;
  }

  public open(options: Dialog): Observable<any> {
    // verifica se tem algum retorno em especial
    const arr = this._testSetup.respOpen;
    return this.response(arr);
  }

  private response(arr: Array<any>): Observable<any> {
    // prepara o retorno
    let ret = true;
    if (arr && Array.isArray(arr) && arr.length > 0) {
      ret = arr.shift();
    }

    // retorna
    return of(ret);
  }
}
