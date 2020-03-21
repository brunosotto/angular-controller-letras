import { MatDialogConfig, MatDialog } from '@angular/material';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpConnectorService } from '../security/http-connector.service';
import { Project } from '../models/project.model';
import { DeploymentFormComponent } from './deployment-form/deployment-form.component';
import { DeploymentProgressComponent } from './deployment-progress/deployment-progress.component';
import { DeployProject } from '../models/deploy-project.model';

@Injectable()
export class DeployService {

  constructor(
    private readonly http: HttpConnectorService,
    private readonly matDialog: MatDialog,
  ) { }

  public deploy(project: Project): Observable<boolean> {
    // cria um observable para retorno
    return Observable.create(observer => {

      // seleciona ambiente, branche para fazer deploy do projeto
      const config: MatDialogConfig = {
        width: '73.48rem',
        panelClass: 'custom-dialog-form-container',
        hasBackdrop: true,
        disableClose: true,
        data: { project }
      };

      const dialogRef = this.matDialog.open(DeploymentFormComponent, config);
      dialogRef.afterClosed().subscribe((deploy: DeployProject) => {
        if (!deploy) {
          return;
        }

        this.showProgress(observer, deploy);
      });

    });
  }

  private showProgress(observer: Observer<boolean>, deploy: DeployProject): void {
    // mostra o progresso do deploy
    const config: MatDialogConfig = {
      width: '95rem',
      panelClass: 'custom-dialog-form-container',
      hasBackdrop: true,
      disableClose: true,
      data: { progress: this.runReploy(deploy) }
    };

    const dialogRef = this.matDialog.open(DeploymentProgressComponent, config);
    dialogRef.afterClosed().subscribe(() => {
      observer.next(true);
      observer.complete();
    });
  }

  private runReploy(body: DeployProject): Observable<string> {
    // cria um observable para retorno
    return Observable.create(observer => {
      // pega a url e cria um xhr
      const url = environment.deploy.run;
      const xhr = new XMLHttpRequest();

      // seta o metodo e url
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      // fica observando o progresso
      xhr.onprogress = () => {
        if (this.isOk(xhr)) {
          observer.next(xhr.responseText);
        }
      };

      // fica observando o fim
      xhr.onloadend = () => {
        if (this.isOk(xhr)) {

          // se o último caracter não for 0 responde com erro
          if (xhr.responseText.substr(-1) !== '0') {
            observer.error(xhr.responseText.substr(-1));
          }

          // de toda forma completa
          observer.complete();

        } else {
          const error = this.treatsError(xhr.responseText);

          // reponde com erro
          observer.error(error);
          observer.complete();
        }
      };

      // fica observando o erro
      xhr.onerror = (error) => {
        observer.error(error);
        observer.complete();
      };

      // envia
      const str = JSON.stringify(body);
      xhr.send(str);

    });
  }

  private treatsError(error): string {
    try {
      const errObj = JSON.parse(error);
      return errObj.message;
    } catch (e) {
      return error;
    }
  }

  private isOk(xhr: XMLHttpRequest): boolean {
    return xhr.statusText === 'OK';
  }

}
