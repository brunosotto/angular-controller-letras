import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Validators, FormGroup, FormBuilder, FormArray, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UtilityService } from '../../utility.service';
import { Louvor } from '../../models/louvor.model';
import { DeploymentEnv } from 'src/app/models/deployment-env.model';
import { KeyValueModel } from 'src/app/models/key-value.model';
import { LouvorService } from '../louvor.service';

@Component({
  selector: 'app-louvor-form',
  templateUrl: './louvor-form.component.html',
  styleUrls: ['./louvor-form.component.scss']
})
export class LouvorFormComponent implements OnInit {

  private louvor: Louvor;
  private _louvorForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<LouvorFormComponent>,
    private readonly util: UtilityService,
    private readonly service: LouvorService
  ) {
    this.createForm();
  }

  private createForm(): void {
    this._louvorForm = this.fb.group({
      name: ['', Validators.required, this.util.multiValida([
        this.util.validaEspacoAsync(),
        this.util.validaRegexAsync(this.util.regexCaracterEspecial)
      ])],
      enable: [true],
      script: ['', Validators.required],
      deploymentPath: ['', [
        Validators.required,
        this.util.validatePath()
      ], this.util.validaEspacoAsync()],
      deploymentEnvs: this.fb.array([]),
      githubRepoUrl: ['', [
        Validators.required,
        this.util.validateGitHubUrl()
      ], this.util.validaEspacoAsync()],
      authToken: [''],
    });
  }

  public get formArrayEnvs(): FormArray {
    return this._louvorForm.get('deploymentEnvs') as FormArray;
  }

  private createEnvForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      port: [null, Validators.required, this.util.multiValida([
        this.util.validaEspacoAsync(),
        this.util.validaNumericoAsync(0, 65535, false)
      ])],
    });
  }

  public ngOnInit(): void {
    // adiciona o primeiro
    this.addEnv();
  }

  public get environments(): KeyValueModel[] {
    return this.service.environments;
  }

  public get scripts(): KeyValueModel[] {
    return this.service.scripts;
  }

  public getEnvName(index: number): string {
    const name = this.getControl(index, 'name').value;
    return this.util.capitaLize(name);
  }

  public get louvorForm(): FormGroup {
    return this._louvorForm;
  }

  public onSubmit(): void {
    if (this.louvorForm.invalid) {
      return;
    }

    this.louvor = this.prepareSave();
    this.dialogClose(this.louvor);
  }

  private prepareSave(): Louvor {
    const formModel = this.louvorForm.value;

    const deploymentEnvs = this.prepareSaveEnvs();

    const save: Louvor = {
      id: null,
      name: this.util.trimPreventNull(formModel.name as string),
      text: this.util.trimPreventNull(formModel.text as string),
    };

    return save;
  }

  private prepareSaveEnvs(): DeploymentEnv[] {
    const envs: DeploymentEnv[] = [];

    // itera sobre os ambientes
    const l = this.formArrayEnvs.length;
    for (let i = 0; i < l; i++) {
      const form = this.formArrayEnvs.get(i.toString());
      const formModel = form.value;

      const env: DeploymentEnv = {
        name: this.util.trimPreventNull(formModel.name as string),
        port: parseInt(formModel.port, 10),
        lastDeploy: null,
        lastLog: null,
        versions: []
      };

      envs.push(env);
    }

    return envs;
  }

  public dialogClose(louvor?: Louvor): void {
    this.dialogRef.close(louvor);
  }

  public addEnv(): void {
    const envFG = this.createEnvForm();

    this.formArrayEnvs.push(envFG);
  }

  public remEnv(index: number): void {
    this.formArrayEnvs.removeAt(index);

    this._louvorForm.markAsDirty();
  }

  public getControl(indexForm: number, path: string): AbstractControl {
    // pega o control pelo path passado
    return this.formArrayEnvs.get(indexForm.toString()).get(path);
  }

  public hasError(indexForm: number, path: string, error: string): boolean {
    // pega o control pelo path passado
    const control = this.getControl(indexForm, path);

    // retorna se tem
    return control && control.hasError(error);
  }

}
