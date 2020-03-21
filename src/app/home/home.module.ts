import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { DesignModule } from '../design/design.module';

@NgModule({
  imports: [
    CommonModule,
    DesignModule
  ],
  declarations: [
    HomePageComponent,
  ]
})
export class HomeModule { }
