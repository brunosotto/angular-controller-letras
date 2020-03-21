import { PipesModule } from './../pipes/pipes.module';
import { ProjectService } from './project.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MascarasModule } from '../masks/mascaras.module';
import { DesignModule } from '../design/design.module';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectComponent } from './project.component';
import { ProjectFormDetailComponent } from './project-form-detail/project-form-detail.component';
import { HttpConnectorService } from '../security/http-connector.service';
import { DeployService } from '../deploy/deploy.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DesignModule,
    RouterModule,
    MascarasModule,
    PipesModule
  ],
  declarations: [
    ProjectComponent,
    ProjectFormComponent,
    ProjectFormDetailComponent,
  ],
  entryComponents: [
    ProjectFormComponent,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ProjectService,
    DeployService,
    HttpConnectorService
  ]
})
export class ProjectModule { }
