import { PipesModule } from './../pipes/pipes.module';
import { LouvorService } from './louvor.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MascarasModule } from '../masks/mascaras.module';
import { DesignModule } from '../design/design.module';
import { LouvorFormComponent } from './louvor-form/louvor-form.component';
import { LouvorComponent } from './louvor.component';
import { LouvorFormDetailComponent } from './louvor-form-detail/louvor-form-detail.component';
import { HttpConnectorService } from '../security/http-connector.service';

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
    LouvorComponent,
    LouvorFormComponent,
    LouvorFormDetailComponent,
  ],
  entryComponents: [
    LouvorFormComponent,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LouvorService,
    HttpConnectorService
  ]
})
export class LouvorModule { }
