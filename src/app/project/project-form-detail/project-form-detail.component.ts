import { DeployedVersions } from './../../models/deployed-versions.model';
import { DeployService } from './../../deploy/deploy.service';
import { DeploymentEnv } from 'src/app/models/deployment-env.model';
import { KeyValueModel } from 'src/app/models/key-value.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Project } from '../../models/project.model';
import { UtilityService } from '../../utility.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-form-detail',
  templateUrl: './project-form-detail.component.html',
  styleUrls: ['./project-form-detail.component.scss']
})
export class ProjectFormDetailComponent implements OnInit {
  @Input() private readonly project: Project;
  @Output() private readonly apply: EventEmitter<Project> = new EventEmitter<Project>();
  @Output() private readonly reload: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _projectForm: FormGroup;
  private _editing: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly util: UtilityService,
    private readonly service: ProjectService,
    private readonly deployService: DeployService
  ) {
    this.createForm();
    this._editing = false;
  }

  private createForm(): void {
    this._projectForm = this.fb.group({
      name: ['', Validators.required, this.util.multiValida([
        this.util.validaEspacoAsync(),
        this.util.validaRegexAsync(this.util.regexCaracterEspecial)
      ])],
      enable: [''],
      script: ['', Validators.required],
      deploymentPath: ['', [
        Validators.required,
        this.util.validatePath()
      ], this.util.validaEspacoAsync()],
      lastRun: [],
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

  private createEnvForm(env: DeploymentEnv): FormGroup {
    return this.fb.group({
      name: [env.name, Validators.required],
      lastDeploy: [env.lastDeploy],
      port: [env.port, Validators.required, this.util.multiValida([
        this.util.validaEspacoAsync(),
        this.util.validaNumericoAsync(0, 65535, false)
      ])],
    });
  }

  public ngOnInit(): void {
    this.loadForm();
    this.lockFields();
  }

  public get environments(): KeyValueModel[] {
    return this.service.environments;
  }

  public get scripts(): KeyValueModel[] {
    return this.service.scripts;
  }

  public getEnvName(index: number): string {
    const name = this.getControl(index, 'name').value;

    // se o nome é nulo previne
    if (!name) {
      return;
    }

    return this.util.capitaLize(name);
  }

  public get projectForm(): FormGroup {
    return this._projectForm;
  }

  public get editing(): boolean {
    return this._editing;
  }

  private loadForm(): void {
    if (!this.project) {
      return;
    }

    const lastRun = this.project.lastRun && this.project.lastRun.toISOString();
    this.projectForm.reset({
      name: this.project.name,
      enable: this.project.enable,
      script: this.project.script,
      deploymentPath: this.project.deploymentPath,
      lastRun,
      githubRepoUrl: this.project.githubRepoUrl,
      authToken: this.project.authToken,
    });

    // remove todos os ambientes
    this.removeAllEnvs();

    // cria os ambientes
    this.project.deploymentEnvs.forEach(env => {
      const envFG = this.createEnvForm(env);

      this.formArrayEnvs.push(envFG);
    });
  }

  public onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    const project = this.prepareSave();
    this.apply.emit(project);
  }

  private prepareSave(): Project {
    const formModel = this.projectForm.value;

    const deploymentEnvs = this.prepareSaveEnvs();

    const save: Project = {
      id: this.project.id,
      name: this.util.trimPreventNull(formModel.name as string),
      enable: formModel.enable,
      script: this.util.trimPreventNull(formModel.script as string),
      deploymentPath: this.util.trimPreventNull(formModel.deploymentPath as string),
      lastRun: formModel.lastRun && new Date(formModel.lastRun),
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

      // pega o nome da env
      const name = this.util.trimPreventNull(formModel.name as string);

      // pega o env para extrair o versions dele
      const currentEnv = this.project.deploymentEnvs.find(e => e.name === name);

      // pega o lastLog ou anula
      const lastLog = currentEnv && currentEnv.lastLog || null;

      // pega o versions ou cria novo
      const versions = currentEnv && currentEnv.versions || [];

      const env: DeploymentEnv = {
        name,
        port: parseInt(formModel.port, 10),
        lastDeploy: formModel.lastDeploy && new Date(formModel.lastDeploy),
        lastLog,
        versions
      };

      envs.push(env);
    }

    return envs;
  }

  public addEnv(): void {
    const envFG = this.createEnvForm(new DeploymentEnv(null, null, null, null, null));

    this.formArrayEnvs.push(envFG);
  }

  public remEnv(index: number): void {
    this.formArrayEnvs.removeAt(index);

    this._projectForm.markAsDirty();
  }

  private removeAllEnvs(): void {
    this.formArrayEnvs.clear();
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

  public cancel(): void {
    this._editing = false;

    this.loadForm();
    this.lockFields();
  }

  public edit(): void {
    this._editing = true;

    this.unlockFields();
  }

  private lockFields(): void {
    // disabilita campos
    this.projectForm.get('name').disable();
    this.projectForm.get('enable').disable();
    this.projectForm.get('script').disable();
    this.projectForm.get('deploymentPath').disable();
    this.projectForm.get('githubRepoUrl').disable();
    this.projectForm.get('authToken').disable();

    // itera sobre os ambientes
    const l = this.formArrayEnvs.length;
    for (let i = 0; i < l; i++) {
      const form = this.formArrayEnvs.get(i.toString());

      form.get('name').disable();
      form.get('port').disable();
    }
  }

  private unlockFields(): void {
    // disabilita campos
    this.projectForm.get('name').enable();
    this.projectForm.get('enable').enable();
    this.projectForm.get('script').enable();
    this.projectForm.get('deploymentPath').enable();
    this.projectForm.get('githubRepoUrl').enable();
    this.projectForm.get('authToken').enable();

    // itera sobre os ambientes
    const l = this.formArrayEnvs.length;
    for (let i = 0; i < l; i++) {
      const form = this.formArrayEnvs.get(i.toString());

      form.get('name').enable();
      form.get('port').enable();
    }
  }

  public getVersions(index: number): DeployedVersions[] {
    const env = this.project.deploymentEnvs[index];

    // previne ambiente nulo
    if (!env) {
      return;
    }

    const versions = env.versions;

    // inverte a lista
    versions.reverse();

    // retorna 10
    return versions.slice(0, 10);
  }

  public deploy(): void {
    // executa o deploy
    this.deployService.deploy(this.project).subscribe(
      ok => {
        this.reload.emit(true);
      }
    );
  }

}
