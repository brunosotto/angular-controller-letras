import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { LouvorService } from '../louvor/louvor.service';
import { LouvorFormComponent } from './louvor-form/louvor-form.component';
import { DialogService } from '../design/dialog/dialog.service';
import { Dialog } from '../design/dialog/dialog.model';
import { Louvor } from '../models/louvor.model';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-louvor',
  templateUrl: './louvor.component.html',
  styleUrls: ['./louvor.component.scss']
})
export class LouvorComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  private _isLoading: boolean;

  private _louvores: Louvor[];
  private _expanded: string;

  private readonly LouvoresRoute = 'louvor';

  constructor(
    private readonly louvorService: LouvorService,
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
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(params => {
        this._expanded = params.id;
      });

    // carrega a primeira
    this.loadLouvores();
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }

  public set isLoading(isLoading: boolean) {
    // zera o array se está carregando
    if (isLoading && this.louvores) {
      this.louvores.splice(0, this.louvores.length);
    }

    this._isLoading = isLoading;
  }

  public get louvores(): Louvor[] {
    return this._louvores;
  }

  public get expanded(): string {
    return this._expanded;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onChangePage(page: number): void {
    // o onChangePage atualiza a url, e assim dispara todo o resto do ciclo
    this.router.navigate([this.LouvoresRoute, page]);
  }

  private loadLouvores(): void {
    // carregando
    this.isLoading = true;

    // obtém
    this.louvorService.listLouvores().subscribe(
      data => {
        // libera carregando
        this.isLoading = false;

        // pega os dados e ordena
        this._louvores = this.order(data);
      }
    );
  }

  private order(arr: Louvor[]): Louvor[] {
    return arr.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    });
  }

  public newLouvor(): void {
    const config: MatDialogConfig = {
      width: '73.48rem',
      panelClass: 'custom-dialog-form-container',
      hasBackdrop: true,
      disableClose: true
    };

    const dialogRef = this.matDialog.open(LouvorFormComponent, config);
    dialogRef.afterClosed().subscribe(data => {
      this.maintainLouvor(data);
    });
  }

  private maintainLouvor(louvor: Louvor): void {
    // se cancelar
    if (louvor === null) {
      return;
    }

    // faz a escolha do metodo
    let observable;
    if (louvor.id === null) {
      observable = this.louvorService.addLouvor(louvor);
    } else {
      observable = this.louvorService.updateLouvor(louvor);
    }

    observable.subscribe(
      data => {
        this.loadLouvores();
        this.snackBar.open('Louvor salvo com sucesso', null, {
          duration: 2000
        });
      }
    );
  }

  public detail(louvor: Louvor): void {
    // detalha a louvor
    const dest = this._expanded !== louvor.id ? louvor.id : '*';

    // atualiza a url, e assim dispara todo o resto do ciclo
    this.router.navigate([this.LouvoresRoute, dest]);
  }

  public delete(louvor: Louvor): void {
    const options: Dialog = {
      titulo: 'Deletar louvor',
      texto: `Você deseja excluir o louvor ${louvor.name}?`,
      hint: 'Essa ação não poderá ser desfeita',
      disableClose: true,
      botoes: [
        { texto: 'Excluir', retorno: true, order: 2, class: 'prefer' },
        { texto: 'Cancelar', retorno: false, order: 1 }
      ]
    };

    this.dialog.open(options).subscribe(excluir => {

      if (excluir === true) {
        this.louvorService.deleteLouvor(louvor).subscribe(
          data => {
            this.snackBar.open('Louvor excluído com sucesso', null, {
              duration: 2000
            });
            this.loadLouvores();
          }
        );
      }

    });
  }

  public reload(): void {
    this.loadLouvores();
  }

}
