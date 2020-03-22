import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { HttpConnectorService } from '../security/http-connector.service';
import { KeyValueModel } from '../models/key-value.model';

@Injectable()
export class TextoService {

  private readonly _environments: KeyValueModel[] = [
    { key: 'develop', value: 'Desenvolvimento' },
    { key: 'homol', value: 'Homologação' },
    { key: 'production', value: 'Produção' }
  ];

  private readonly _scripts: KeyValueModel[] = [
    { key: 'express', value: 'Express' },
    { key: 'spa-angular-sub', value: 'SPA Angular Sub' }
  ];

  constructor(
    private readonly http: HttpConnectorService
  ) { }

  public get environments(): KeyValueModel[] {
    return this._environments;
  }

  public get scripts(): KeyValueModel[] {
    return this._scripts;
  }

  public listProjects(): Observable<Project[]> {
    // cria um observable para retorno
    return Observable.create(observer => {

      // obtém
      this.http.get(environment.project.list_projects).subscribe(
        (res: Project[]) => {
          // retifica os dados
          res = this.adjustData(res);

          // responde com os dados retificados
          observer.next(res);
          observer.complete();
        },
        error => {
          // repassa o erro
          observer.error(error);
          observer.complete();
        }
      );

    });
  }

  private adjustData(projects: Project[]): Project[] {
    // cria instância da data
    projects.forEach(p => {
      p.lastRun = p.lastRun && new Date(p.lastRun);

      p.deploymentEnvs.forEach(e => {
        e.lastDeploy = e.lastDeploy && new Date(e.lastDeploy);
      });
    });

    return projects;
  }

  public findProject(id: string): Observable<Project> {
    // obtém
    const replacement = [{ key: 'id', value: id }];
    return this.http.get(environment.project.get_project, replacement);
  }

  public deleteProject(project: Project): Observable<any> {
    // deleta
    const replacement = [{ key: 'id', value: project.id }];
    return this.http.delete(environment.project.delete_project, replacement);
  }

  public addProject(project: Project): Observable<any> {
    // cria
    return this.http.post(environment.project.insert_project, project);
  }

  public updateProject(project: Project): Observable<any> {
    // altera
    const replacement = [{ key: 'id', value: project.id }];
    return this.http.put(environment.project.update_project, project, replacement);
  }

}
