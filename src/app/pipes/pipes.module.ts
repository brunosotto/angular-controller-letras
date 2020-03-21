import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelativeTimePipe } from './relative-time.pipe';
import { FirstCapitalPhrasePipe } from './first-capital-phrase.pipe';
import { ShowDatePipe } from './show-date.pipe';
import { StatesOfBrazilPipe } from './states-of-brazil.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RelativeTimePipe,
    FirstCapitalPhrasePipe,
    ShowDatePipe,
    StatesOfBrazilPipe
  ],
  exports: [
    RelativeTimePipe,
    FirstCapitalPhrasePipe,
    ShowDatePipe,
    StatesOfBrazilPipe
  ]
})
export class PipesModule { }
