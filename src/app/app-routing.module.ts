import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Jogo/home/home.component';
import { PersonagemComponent } from './personagens/personagens.component';


const routes: Routes = [
  { path: "", component: PersonagemComponent },
  { path: "jogo", component: HomeComponent },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
