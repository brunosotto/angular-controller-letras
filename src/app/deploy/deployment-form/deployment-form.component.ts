import { DeployProject } from './../../models/deploy-project.model';
import { KeyValueModel } from './../../models/key-value.model';
import { ProjectService } from './../../project/project.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormGroup, FormBuilder, FormArray, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UtilityService } from '../../utility.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-deployment-form',
  templateUrl: './deployment-form.component.html',
  styleUrls: ['./deployment-form.component.scss']
})
export class DeploymentFormComponent implements OnInit {

  private project: Project;
  private _deploymentForm: FormGroup;
  private _environments: KeyValueModel[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: { project: Project },
    private readonly dialogRef: MatDialogRef<DeploymentFormComponent>,
    private readonly fb: FormBuilder,
    private readonly util: UtilityService,
    private readonly projectService: ProjectService
  ) {
    // recebe os dados
    this.project = data.project;

    // gera e inicializa o form
    this.generatesEnvs();
    this.createForm();
  }

  private generatesEnvs(): void {
    // gera o array no padrão para o select
    this._environments = this.project.deploymentEnvs.map(
      e => new KeyValueModel(e.name, this.getEnvName(e.name))
    );
  }

  private getEnvName(key: string): string {
    const env = this.projectService.environments.find(e => e.key === key);

    return env.value;
  }

  private createForm(): void {
    this._deploymentForm = this.fb.group({
      environment: ['', Validators.required],
      branch: ['', Validators.required, this.util.validaRegexAsync(this.util.regexCaracterEspecial)]
    });
  }

  public ngOnInit(): void {
  }

  public get environments(): KeyValueModel[] {
    return this._environments;
  }

  public get deploymentForm(): FormGroup {
    return this._deploymentForm;
  }

  public onSubmit(): void {
    if (this.deploymentForm.invalid) {
      return;
    }

    const deploy = this.prepareSave();
    this.dialogClose(deploy);
  }

  private prepareSave(): DeployProject {
    const formModel = this.deploymentForm.value;

    const save: DeployProject = {
      projectId: this.project.id,
      environment: this.util.trimPreventNull(formModel.environment as string),
      branch: this.util.trimPreventNull(formModel.branch as string)
    };

    return save;
  }

  public dialogClose(deploy?: DeployProject): void {
    this.dialogRef.close(deploy);
  }

}

