import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { NotfoundPageComponent } from './static-pages/notfound-page/notfound-page.component';
import { ProjectComponent } from './project/project.component';
import { TextoComponent } from './texto/texto.component';

const ROUTES: Routes = [
  { path: '', component: HomePageComponent },

  { path: 'louvores', redirectTo: '/louvores/*', pathMatch: 'full' },
  { path: 'louvores/:id', component: ProjectComponent },

  // biblia

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
