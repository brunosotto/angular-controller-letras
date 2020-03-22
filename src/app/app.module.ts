import { PipesModule } from './pipes/pipes.module';
import { ProjectModule } from './project/project.module';
import { HomeModule } from './home/home.module';
import { DesignModule } from './design/design.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StaticPagesModule } from './static-pages/static-pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeployModule } from './deploy/deploy.module';
import { TextoModule } from './texto/texto.module';
import { ConfigService } from './config/config.service';
import { LouvorModule } from './louvor/louvor.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    DesignModule,
    HomeModule,
    StaticPagesModule,
    ProjectModule,
    TextoModule,
    LouvorModule,
    PipesModule,
    DeployModule
  ],
  providers: [
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
