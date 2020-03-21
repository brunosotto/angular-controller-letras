import { Observable } from 'rxjs';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-deployment-progress',
  templateUrl: './deployment-progress.component.html',
  styleUrls: ['./deployment-progress.component.scss']
})
export class DeploymentProgressComponent implements OnInit {
  @ViewChild('dialogContent', { static: false }) dialogContent: ElementRef;

  private _progress: string;
  private _error: string;
  private _hasError: boolean;
  private _complete: boolean;
  private _autoscroll: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: { progress: Observable<string> },
    private readonly dialogRef: MatDialogRef<DeploymentProgressComponent>
  ) {
    // default
    this._autoscroll = true;
  }

  public ngOnInit(): void {
    // faz subscribe para receber os dados
    this.data.progress.subscribe(
      r => {
        this._progress = r;
        this.scroll();
      },
      error => {
        this._hasError = true;
        this._error = error;
      },
      () => this._complete = true
    );
  }

  public get progress(): string {
    return this._progress;
  }

  public get error(): string {
    return this._error;
  }

  public get hasError(): boolean {
    return this._hasError;
  }

  public get complete(): boolean {
    return this._complete;
  }

  public get autoscroll(): boolean {
    return this._autoscroll;
  }

  public set autoscroll(op: boolean) {
    this._autoscroll = op;
  }

  private scroll(): void {
    // dá scroll na saída do deploy
    setTimeout(() => {
      // pula fora se tem bypass do autoscroll
      if (!this.autoscroll) {
        return;
      }

      this.dialogContent.nativeElement.scroll(0, 1000000000);
    }, 100);
  }

  public dialogClose(): void {
    this.dialogRef.close();
  }

}
