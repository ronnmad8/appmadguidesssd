import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [

  { path: 'home' , component: HomeComponent},
  { path: 'quienessomos' , component: HomeComponent},
  { path: 'ayuda' , component: HomeComponent},
  { path: 'blog' , component: HomeComponent},
  { path: 'contacto' , component: HomeComponent},
  { path: 'buscador' , component: BuscadorComponent},
  { path: 'politicaprivacidad' , component: BuscadorComponent},
  { path: 'politicacookies' , component: BuscadorComponent},
  { path: 'avisolegal' , component: BuscadorComponent},
  { path: 'politicacompra' , component: BuscadorComponent},
  { path: 'medidascovid' , component: BuscadorComponent},


  //////////////////////////////////////////////default
  { path: '' , component: HomeComponent},
  { path: '**' , component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
