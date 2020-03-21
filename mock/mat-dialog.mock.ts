import { Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialogConfig, MatDialogRef } from '@angular/material';

@Injectable()
export class MatDialogMock {
  private _testSetup: any = {};

  public testSetup(key: string, value: any): void {
    this._testSetup[key] = value;
  }

  public open<T, D = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T> {
    const ret = {
      afterClosed: () => {
        return Observable.create(observer => {

          const resp = this._testSetup.respAfterClosed;

          observer.next(resp);
          observer.complete();

        });
      }
    };

    return ret as MatDialogRef<T>;
  }

}
