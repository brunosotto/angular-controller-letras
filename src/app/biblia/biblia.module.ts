import { PipesModule } from './../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MascarasModule } from '../masks/mascaras.module';
import { DesignModule } from '../design/design.module';
import { BibliaComponent } from './biblia.component';
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
    BibliaComponent,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    HttpConnectorService
  ]
})
export class BibliaModule { }
