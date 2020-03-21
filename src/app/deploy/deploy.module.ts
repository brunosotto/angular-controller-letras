import { Nl2BrPipeModule } from 'nl2br-pipe';
import { DeploymentProgressComponent } from './deployment-progress/deployment-progress.component';
import { PipesModule } from './../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MascarasModule } from '../masks/mascaras.module';
import { DesignModule } from '../design/design.module';
import { HttpConnectorService } from '../security/http-connector.service';
import { DeploymentFormComponent } from './deployment-form/deployment-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DesignModule,
    RouterModule,
    MascarasModule,
    PipesModule,
    Nl2BrPipeModule
  ],
  declarations: [
    DeploymentFormComponent,
    DeploymentProgressComponent
  ],
  entryComponents: [
    DeploymentFormComponent,
    DeploymentProgressComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    HttpConnectorService
  ]
})
export class DeployModule { }
