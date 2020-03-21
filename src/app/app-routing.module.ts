import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { NotfoundPageComponent } from './static-pages/notfound-page/notfound-page.component';
import { ProjectComponent } from './project/project.component';

const ROUTES: Routes = [
  { path: '', component: HomePageComponent },

  { path: 'project', redirectTo: '/project/*', pathMatch: 'full' },
  { path: 'project/:id', component: ProjectComponent },

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
