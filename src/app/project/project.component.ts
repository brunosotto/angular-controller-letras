import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { ProjectService } from '../project/project.service';
import { ProjectFormComponent } from './project-form/project-form.component';
import { DialogService } from '../design/dialog/dialog.service';
import { Dialog } from '../design/dialog/dialog.model';
import { Project } from '../models/project.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  private inscRoute: Subscription;
  private _isLoading: boolean;

  private _projects: Project[];
  private _expanded: string;

  private readonly ProjectsRoute = 'project';

  constructor(
    private readonly projectService: ProjectService,
    private readonly matDialog: MatDialog,
    private readonly dialog: DialogService,
    private readonly snackBar: MatSnackBar,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    // joga como carregando de imediato
    this.isLoading = true;
  }

  public ngOnInit(): void {
    // carregando
    this.isLoading = true;

    // pega os param imediato
    this._expanded = this.route.snapshot.params.id;

    // monitora os params
    this.inscRoute = this.route.params.subscribe(params => {
      this._expanded = params.id;
    });

    // carrega a primeira
    this.loadProjects();
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }

  public set isLoading(isLoading: boolean) {
    // zera o array se está carregando
    if (isLoading && this.projects) {
      this.projects.splice(0, this.projects.length);
    }

    this._isLoading = isLoading;
  }

  public get projects(): Project[] {
    return this._projects;
  }

  public get expanded(): string {
    return this._expanded;
  }

  public ngOnDestroy(): void {
    // mata a inscrição da rota
    this.inscRoute.unsubscribe();
  }

  public onChangePage(page: number): void {
    // o onChangePage atualiza a url, e assim dispara todo o resto do ciclo
    this.router.navigate([this.ProjectsRoute, page]);
  }

  private loadProjects(): void {
    // carregando
    this.isLoading = true;

    // obtém
    this.projectService.listProjects().subscribe(
      data => {
        // libera carregando
        this.isLoading = false;

        // pega os dados e ordena
        this._projects = this.order(data);
      }
    );
  }

  private order(arr: Project[]): Project[] {
    return arr.sort((a, b) => {
      // se é nulo algum
      if (!a.lastRun || !b.lastRun) {
        return 0;
      }

      // compara
      return (b.lastRun.getTime() - a.lastRun.getTime());
    });
  }

  public newProject(): void {
    const config: MatDialogConfig = {
      width: '73.48rem',
      panelClass: 'custom-dialog-form-container',
      hasBackdrop: true,
      disableClose: true
    };

    const dialogRef = this.matDialog.open(ProjectFormComponent, config);
    dialogRef.afterClosed().subscribe(data => {
      this.maintainProject(data);
    });
  }

  private maintainProject(project: Project): void {
    // se cancelar
    if (project === null) {
      return;
    }

    // faz a escolha do metodo
    let observable;
    if (project.id === null) {
      observable = this.projectService.addProject(project);
    } else {
      observable = this.projectService.updateProject(project);
    }

    observable.subscribe(
      data => {
        this.loadProjects();
        this.snackBar.open('Projeto salvo com sucesso', null, {
          duration: 2000
        });
      }
    );
  }

  public detail(project: Project): void {
    // detalha a project
    const dest = this._expanded !== project.id ? project.id : '*';

    // atualiza a url, e assim dispara todo o resto do ciclo
    this.router.navigate([this.ProjectsRoute, dest]);
  }

  public delete(project: Project): void {
    const options: Dialog = {
      titulo: 'Deletar projeto',
      texto: `Você deseja excluir o projeto ${project.name}?`,
      hint: 'Essa ação não poderá ser desfeita',
      disableClose: true,
      botoes: [
        { texto: 'Excluir', retorno: true, order: 2, class: 'prefer' },
        { texto: 'Cancelar', retorno: false, order: 1 }
      ]
    };

    this.dialog.open(options).subscribe(excluir => {

      if (excluir === true) {
        this.projectService.deleteProject(project).subscribe(
          data => {
            this.snackBar.open('Projeto excluído com sucesso', null, {
              duration: 2000
            });
            this.loadProjects();
          }
        );
      }

    });
  }

  public reload(): void {
    this.loadProjects();
  }

}
