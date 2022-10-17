import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CompraComponent } from './pages/compra/compra.component';
import { HomeComponent } from './pages/home/home.component';
import { VisitadetailComponent } from './pages/visitadetail/visitadetail.component';

const routes: Routes = [

  { path: 'home' , component: HomeComponent},
  { path: 'quienessomos' , component: HomeComponent},
  { path: 'ayuda' , component: HomeComponent},
  { path: 'blog' , component: HomeComponent},
  { path: 'contacto' , component: HomeComponent},
  { path: 'buscador' , component: BuscadorComponent},
  { path: 'buscador/category/:category_uuid?' , component: BuscadorComponent},
  { path: 'buscador/recommended/:recommended' , component: BuscadorComponent},
  { path: 'buscador/title/:title' , component: BuscadorComponent},
  { path: 'visita/:title/:uuid' , component: VisitadetailComponent},
  { path: 'visitatitulo/:title' , component: VisitadetailComponent},
  { path: 'carrito' , component: CarritoComponent},
  { path: 'compra' , component: CompraComponent},
  { path: 'politicaprivacidad' , component: HomeComponent},
  { path: 'politicacookies' , component: HomeComponent},
  { path: 'avisolegal' , component: HomeComponent},
  { path: 'politicacompra' , component: HomeComponent},
  { path: 'medidascovid' , component: HomeComponent},
  { path: 'misreservas' , component: HomeComponent},


  //////////////////////////////////////////////default
  { path: '' , component: HomeComponent},
  { path: '**' , component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
