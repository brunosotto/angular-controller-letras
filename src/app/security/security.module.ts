import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpConnectorService } from './http-connector.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    HttpConnectorService
  ]
})
export class SecurityModule { }
