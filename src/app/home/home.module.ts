import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { DesignModule } from '../design/design.module';
import { PipesModule } from '../pipes/pipes.module';
import { MascarasModule } from '../masks/mascaras.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    HomePageComponent,
  ]
})
export class HomeModule { }
