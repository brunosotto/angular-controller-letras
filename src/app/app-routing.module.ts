import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { NotfoundPageComponent } from './static-pages/notfound-page/notfound-page.component';
import { TextoComponent } from './texto/texto.component';
import { LouvorComponent } from './louvor/louvor.component';
import { LouvorShowComponent } from './louvor/louvor-show/louvor-show.component';
import { BibliaComponent } from './biblia/biblia.component';

const ROUTES: Routes = [
  { path: '', component: HomePageComponent },

  { path: 'biblia', component: BibliaComponent },
  { path: 'biblia/:versao', component: BibliaComponent },
  { path: 'biblia/:versao/:siglaLivro', component: BibliaComponent },
  { path: 'biblia/:versao/:siglaLivro/:capituloNum', component: BibliaComponent },

  { path: 'louvor', redirectTo: '/louvor/*', pathMatch: 'full' },
  { path: 'louvor/:id', component: LouvorComponent },
  { path: 'louvor/:id/show', component: LouvorShowComponent },

  { path: 'texto', component: TextoComponent },

  // páginas 404
  { path: '404', component: NotfoundPageComponent },

  // redireciona qualquer outra para a página 404
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
