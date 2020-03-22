import { PipesModule } from './../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MascarasModule } from '../masks/mascaras.module';
import { DesignModule } from '../design/design.module';
import { TextoComponent } from './texto.component';
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
    TextoComponent,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DeployService,
    HttpConnectorService
  ]
})
export class TextoModule { }
