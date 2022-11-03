import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminclienteComponent } from './pages/admincliente/admincliente.component';
import { AvisolegalComponent } from './pages/avisolegal/avisolegal.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CompraComponent } from './pages/compra/compra.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { HomeComponent } from './pages/home/home.component';
import { MedidascovidComponent } from './pages/medidascovid/medidascovid.component';
import { PoliticascompraComponent } from './pages/politicascompra/politicascompra.component';
import { PoliticascookiesComponent } from './pages/politicascookies/politicascookies.component';
import { PoliticasprivacidadComponent } from './pages/politicasprivacidad/politicasprivacidad.component';
import { QuienessomosComponent } from './pages/quienessomos/quienessomos.component';
import { VisitadetailComponent } from './pages/visitadetail/visitadetail.component';

const routes: Routes = [

  { path: 'home' , component: HomeComponent},
  { path: 'quienessomos' , component: QuienessomosComponent},
  { path: 'ayuda' , component: AyudaComponent},
  { path: 'blog' , component: HomeComponent},
  { path: 'contacto' , component: ContactoComponent},
  { path: 'buscador' , component: BuscadorComponent},
  { path: 'buscador/category/:category_uuid?' , component: BuscadorComponent},
  { path: 'buscador/recommended/:recommended' , component: BuscadorComponent},
  { path: 'buscador/title/:title' , component: BuscadorComponent},
  { path: 'visita/:title/:uuid' , component: VisitadetailComponent},
  { path: 'visitatitulo/:title' , component: VisitadetailComponent},
  { path: 'carrito' , component: CarritoComponent},
  { path: 'compra' , component: CompraComponent},
  { path: 'politicasprivacidad' , component: PoliticasprivacidadComponent},
  { path: 'politicascookies' , component: PoliticascookiesComponent},
  { path: 'avisolegal' , component: AvisolegalComponent},
  { path: 'politicascompra' , component: PoliticascompraComponent},
  { path: 'medidascovid' , component: MedidascovidComponent},
  { path: 'zonacliente' , component: AdminclienteComponent},
  { path: 'zonacliente/:section' , component: AdminclienteComponent},


  //////////////////////////////////////////////default
  { path: '' , component: HomeComponent},
  { path: '**' , component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
