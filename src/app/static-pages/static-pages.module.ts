import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';
import { DesignModule } from '../design/design.module';

@NgModule({
  imports: [
    CommonModule,
    DesignModule
  ],
  declarations: [
    NotfoundPageComponent
  ]
})
export class StaticPagesModule { }
