import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/homecliente/home.component';

const routes: Routes = [

  { path: 'home' , component: HomeComponent},
  { path: 'quienessomos' , component: HomeComponent},
  { path: 'ayuda' , component: HomeComponent},
  { path: 'blog' , component: HomeComponent},
  { path: 'contacto' , component: HomeComponent},
  { path: 'buscador' , component: HomeComponent},

  

  //////////////////////////////////////////////default
  { path: '' , component: HomeComponent},
  { path: '**' , component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
