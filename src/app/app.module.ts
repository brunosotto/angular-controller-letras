import { PipesModule } from './pipes/pipes.module';
import { HomeModule } from './home/home.module';
import { DesignModule } from './design/design.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StaticPagesModule } from './static-pages/static-pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextoModule } from './texto/texto.module';
import { ConfigService } from './config/config.service';
import { LouvorModule } from './louvor/louvor.module';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { BibliaModule } from './biblia/biblia.module';
import { ConfigModule } from './config/config.module';

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
    ConfigModule,
    StaticPagesModule,
    TextoModule,
    BibliaModule,
    LouvorModule,
    PipesModule,
    Nl2BrPipeModule
  ],
  providers: [
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
