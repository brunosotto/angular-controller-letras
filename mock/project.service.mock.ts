import { DeploymentEnv } from './../src/app/models/deployment-env.model';
import { Project } from '../src/app/models/project.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class ProjectServiceMock {
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

  private get deploymentEnv(): DeploymentEnv {
    return {
      name: 'Production',
      enable: true,
      port: 4199,
      deploymentPath: '~/production/projeto/',
      lastDeploy: this.genDate(),
      githubRepoUrl: 'https://github.com/teste/eee.git',
      authToken: 'ABCDEF12873243'
    };
  }

  private readonly project: Project = {
    id: null,
    name: null,
    lastRun: null,
    deploymentEnvs: [this.deploymentEnv, {...this.deploymentEnv, name: 'Homol'}]
  };

  public readonly projects: Project[] = this.nomes.map((name, i) => {
    const id = i === 0 ? '1234' : this.genId();
    const lastRun = this.genDate();

    return {
      ...this.project,
      id,
      name,
      lastRun
    };
  });

  public testSetup(key: string, value: any): void {
    this._testSetup[key] = value;
  }

  public listProjects(): Observable<Project[]> {
    // cria um observable para retorno
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(this.projects.slice(0));
        observer.complete();
      }, 1000);
    });
  }

  public findProject(projectId: string): Observable<Project> {
    const project = this.projects.find(t => t.id === projectId);

    return of(project);
  }

  public deleteProject(project: Project): Observable<any> {
    // verifica se tem algum retorno em especial
    const arr = this._testSetup.respDeleteProject;
    const ret = this.prepareRet(arr);

    if (ret && ret.throw) {
      return throwError(ret.error || 'erro');
    } else {

      const index = this.indexOf(project);
      this.projects.splice(index, 1);

      return of(ret);

    }
  }

  public addProject(project: Project): Observable<any> {
    // verifica se tem algum retorno em especial
    const arr = this._testSetup.respAddProject;
    const ret = this.prepareRet(arr);

    if (ret && ret.throw) {
      return throwError(ret.error || 'erro');
    } else {

      project.id = this.genId();

      this.projects.push(project);
      return of(ret);

    }
  }

  public updateProject(project: Project): Observable<any> {
    // verifica se tem algum retorno em especial
    const arr = this._testSetup.respUpdateProject;
    const ret = this.prepareRet(arr);

    if (ret && ret.throw) {
      return throwError(ret.error || 'erro');
    } else {

      const aDriver = this.projects.find(t => t.id === project.id);

      aDriver.id = project.id;
      aDriver.name = project.name;

      return of(ret);

    }
  }

  private indexOf(project: Project): number {
    let index: number;

    const tr = this.projects.find((t, i) => {
      if (t.id === project.id) {
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
