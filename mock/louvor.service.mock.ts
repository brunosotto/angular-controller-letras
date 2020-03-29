import { DeploymentEnv } from './../src/app/models/deployment-env.model';
import { Louvor } from '../src/app/models/louvor.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class LouvorServiceMock {
  private _testSetup: any = {};

  private readonly nomes = [
    'Angular-controller-letras',
    'Express-service-ci',
    'Express-site-achou',
    'Express-api-achou',
    'Angular-backoffice-achou',
    'Antigo_missao',
    'Antigo_erp.js',
    'Antigo_erp',
    'Achou_antigo',
    'DailyExpenses',
    'TrackerWeb',
    'TrackerTcpServer',
    'Egret',
    'TrackerFrontend',
    'TrackerBackend',
    'Testeionic',
  ].sort();

  private readonly louvor: Louvor = {
    id: null,
    name: null,
    text: null
  };

  public readonly louvores: Louvor[] = this.nomes.map((name, i) => {
    const id = i === 0 ? '1234' : this.genId();
    const lastRun = this.genDate();

    return {
      ...this.louvor,
      id,
      name,
      lastRun
    };
  });

  public testSetup(key: string, value: any): void {
    this._testSetup[key] = value;
  }

  public listLouvores(): Observable<Louvor[]> {
    // cria um observable para retorno
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(this.louvores.slice(0));
        observer.complete();
      }, 1000);
    });
  }

  public findLouvor(louvorId: string): Observable<Louvor> {
    const louvor = this.louvores.find(t => t.id === louvorId);

    return of(louvor);
  }

  public deleteLouvor(louvor: Louvor): Observable<any> {
    // verifica se tem algum retorno em especial
    const arr = this._testSetup.respDeleteLouvor;
    const ret = this.prepareRet(arr);

    if (ret && ret.throw) {
      return throwError(ret.error || 'erro');
    } else {

      const index = this.indexOf(louvor);
      this.louvores.splice(index, 1);

      return of(ret);

    }
  }

  public addLouvor(louvor: Louvor): Observable<any> {
    // verifica se tem algum retorno em especial
    const arr = this._testSetup.respAddLouvor;
    const ret = this.prepareRet(arr);

    if (ret && ret.throw) {
      return throwError(ret.error || 'erro');
    } else {

      louvor.id = this.genId();

      this.louvores.push(louvor);
      return of(ret);

    }
  }

  public updateLouvor(louvor: Louvor): Observable<any> {
    // verifica se tem algum retorno em especial
    const arr = this._testSetup.respUpdateLouvor;
    const ret = this.prepareRet(arr);

    if (ret && ret.throw) {
      return throwError(ret.error || 'erro');
    } else {

      const aDriver = this.louvores.find(t => t.id === louvor.id);

      aDriver.id = louvor.id;
      aDriver.name = louvor.name;

      return of(ret);

    }
  }

  private indexOf(louvor: Louvor): number {
    let index: number;

    const tr = this.louvores.find((t, i) => {
      if (t.id === louvor.id) {
        index = i;
        return true;
      }
    });

    return tr ? index : null;
  }

  private genId(): string {
    const rand = window.crypto.getRandomValues(new Uint32Array(1))[0] * 12345678;
    return Math.floor(rand).toString(16);
  }

  private genDate(): Date {
    return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
  }

  private prepareRet(arr: Array<any>): any {
    // prepara o retorno
    let ret = { success: true };
    if (arr && Array.isArray(arr) && arr.length > 0) {
      ret = arr.shift();
    }

    return ret;
  }
}
