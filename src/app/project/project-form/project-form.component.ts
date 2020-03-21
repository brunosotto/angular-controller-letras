import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Validators, FormGroup, FormBuilder, FormArray, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UtilityService } from '../../utility.service';
import { Project } from '../../models/project.model';
import { DeploymentEnv } from 'src/app/models/deployment-env.model';
import { KeyValueModel } from 'src/app/models/key-value.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  private project: Project;
  private _projectForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<ProjectFormComponent>,
    private readonly util: UtilityService,
    private readonly service: ProjectService
  ) {
    this.createForm();
  }

  private createForm(): void {
    this._projectForm = this.fb.group({
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
    return this._projectForm.get('deploymentEnvs') as FormArray;
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

  public get projectForm(): FormGroup {
    return this._projectForm;
  }

  public onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    this.project = this.prepareSave();
    this.dialogClose(this.project);
  }

  private prepareSave(): Project {
    const formModel = this.projectForm.value;

    const deploymentEnvs = this.prepareSaveEnvs();

    const save: Project = {
      id: null,
      name: this.util.trimPreventNull(formModel.name as string),
      enable: formModel.enable,
      script: this.util.trimPreventNull(formModel.script as string),
      deploymentPath: this.util.trimPreventNull(formModel.deploymentPath as string),
      lastRun: null,
      deploymentEnvs,
      githubRepoUrl: this.util.trimPreventNull(formModel.githubRepoUrl as string),
      authToken: this.util.trimPreventNull(formModel.authToken as string),
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

  public dialogClose(project?: Project): void {
    this.dialogRef.close(project);
  }

  public addEnv(): void {
    const envFG = this.createEnvForm();

    this.formArrayEnvs.push(envFG);
  }

  public remEnv(index: number): void {
    this.formArrayEnvs.removeAt(index);

    this._projectForm.markAsDirty();
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
