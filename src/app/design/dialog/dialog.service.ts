import { DialogComponent } from './dialog.component';
import { Dialog } from './dialog.model';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable()
export class DialogService {
  constructor(
    private readonly dialog: MatDialog
  ) { }

  public open(options: Dialog): Observable<any> {
    return Observable.create(observer => {
      this.createDialog(observer, options);
    });
  }

  private getConfig(options: Dialog): MatDialogConfig {
    return {
      width: '44.53rem',
      disableClose: options.disableClose,
      panelClass: 'custom-dialog-container',
      data: options
    };
  }

  private createDialog(observer, options: Dialog): void {
    const dialogRef = this.dialog.open(DialogComponent, this.getConfig(options));

    dialogRef.afterClosed().subscribe(result => {
      observer.next(result);
      observer.complete();
    });
  }
}
