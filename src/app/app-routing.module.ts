import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeclienteComponent } from './pages/homecliente/homecliente.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { Ethimocoleccion1Component } from './pages/ethimocoleccion1/ethimocoleccion1.component';
import { Ethimocoleccion2Component } from './pages/ethimocoleccion2/ethimocoleccion2.component';
import { Ethimocoleccion3Component } from './pages/ethimocoleccion3/ethimocoleccion3.component';
import { Ethimocoleccion4Component } from './pages/ethimocoleccion4/ethimocoleccion4.component';
import { Ethimocoleccion5Component } from './pages/ethimocoleccion5/ethimocoleccion5.component';
import { Ethimocoleccion6Component } from './pages/ethimocoleccion6/ethimocoleccion6.component';
import { Ethimocoleccion7Component } from './pages/ethimocoleccion7/ethimocoleccion7.component';
import { Ethimocoleccion8Component } from './pages/ethimocoleccion8/ethimocoleccion8.component';
import { Ethimocoleccion9Component } from './pages/ethimocoleccion9/ethimocoleccion9.component';
import { Ethimocoleccion10Component } from './pages/ethimocoleccion10/ethimocoleccion10.component';
import { Ethimocoleccion11Component } from './pages/ethimocoleccion11/ethimocoleccion11.component';
import { Ethimocoleccion12Component } from './pages/ethimocoleccion12/ethimocoleccion12.component';

import { CorradiComponent } from './pages/corradi/corradi.component';
import { BioclimaticasComponent } from './pages/bioclimaticas/bioclimaticas.component';
import { AlbaComponent } from './pages/alba/alba.component';
import { EteriaComponent } from './pages/eteria/eteria.component';
import { ImagoComponent } from './pages/imago/imago.component';
import { MaestroComponent } from './pages/maestro/maestro.component';
import { BspaceComponent } from './pages/bspace/bspace.component';
import { PergotendaComponent } from './pages/pergotenda/pergotenda.component';
import { SunsailsComponent } from './pages/sunsails/sunsails.component';
import { DefenseComponent } from './pages/defense/defense.component';
import { MaestraleComponent } from './pages/maestrale/maestrale.component';
import { SciroccoComponent } from './pages/scirocco/scirocco.component';
import { ToldosbrazosextensiblesComponent } from './pages/toldosbrazosextensibles/toldosbrazosextensibles.component';
import { Markiluxmx3Component } from './pages/markiluxmx3/markiluxmx3.component';
import { Markilux5010Component } from './pages/markilux5010/markilux5010.component';
import { Markilux6000Component } from './pages/markilux6000/markilux6000.component';
import { Markilux970Component } from './pages/markilux970/markilux970.component';
import { Markilux1710strechComponent } from './pages/markilux1710strech/markilux1710strech.component';
import { Markilux770Component } from './pages/markilux770/markilux770.component';
import { Markilux8800Component } from './pages/markilux8800/markilux8800.component';
import { Markilux779Component } from './pages/markilux779/markilux779.component';
import { Markilux620tracfixComponent } from './pages/markilux620tracfix/markilux620tracfix.component';
import { Markilux776Component } from './pages/markilux776/markilux776.component';
import { PergolasComponent } from './pages/pergolas/pergolas.component';
import { ToldosverandaComponent } from './pages/toldosveranda/toldosveranda.component';
import { ToldosverticalesComponent } from './pages/toldosverticales/toldosverticales.component';
import { MarkiluxpergolaComponent } from './pages/markiluxpergola/markiluxpergola.component';
import { MarkiluxmarkantComponent } from './pages/markiluxmarkant/markiluxmarkant.component';
import { ExylComponent } from './pages/exyl/exyl.component';
import { FluxComponent } from './pages/flux/flux.component';
import { ImpactComponent } from './pages/impact/impact.component';
import { MilleniumcelebComponent } from './pages/milleniumceleb/milleniumceleb.component';
import { PalladiaComponent } from './pages/palladia/palladia.component';
import { Pergotenda45Component } from './pages/pergotenda45/pergotenda45.component';


import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { AdminhomeclienteComponent } from './pages/adminhomecliente/adminhomecliente.component';

import { AdminethimocoleccionComponent } from './pages/adminethimocoleccion/adminethimocoleccion.component';

import { Admintipo1Component } from './pages/admintipo1/admintipo1.component';
import { Admintipo2Component } from './pages/admintipo2/admintipo2.component';
import { MarkiluxComponent } from './pages/markilux/markilux.component';
import { BioclimaticasproyectosComponent } from './pages/bioclimaticasproyectos/bioclimaticasproyectos.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { TechosmovilesComponent } from './pages/techosmoviles/techosmoviles.component';
import { ValladosComponent } from './pages/vallados/vallados.component';
import { BarandillasComponent } from './pages/barandillas/barandillas.component';
import { HosteleriaComponent } from './pages/hosteleria/hosteleria.component';
import { PorchesComponent } from './pages/porches/porches.component';
import { PergolasproyectosComponent } from './pages/pergolasproyectos/pergolasproyectos.component';
import { TechofijoComponent } from './pages/techofijo/techofijo.component';
import { CortinasdecristalComponent } from './pages/cortinasdecristal/cortinasdecristal.component';
import { TarimasComponent } from './pages/tarimas/tarimas.component';
import { ProyectosamedidaComponent } from './pages/proyectosamedida/proyectosamedida.component';
import { GarajesComponent } from './pages/garajes/garajes.component';
import { Ethimocoleccion13Component } from './pages/ethimocoleccion13/ethimocoleccion13.component';
import { Ethimocoleccion14Component } from './pages/ethimocoleccion14/ethimocoleccion14.component';
import { Ethimocoleccion15Component } from './pages/ethimocoleccion15/ethimocoleccion15.component';
import { AdmincontactoComponent } from './pages/admincontacto/admincontacto.component';
import { MarkiluxstrechComponent } from './pages/markiluxstrech/markiluxstrech.component';
import { PorchesmaderaComponent } from './pages/porchesmadera/porchesmadera.component';
import { PorcheshierromaderaComponent } from './pages/porcheshierromadera/porcheshierromadera.component';
import { PergolasmaderaComponent } from './pages/pergolasmadera/pergolasmadera.component';
import { PergolashierromaderaComponent } from './pages/pergolashierromadera/pergolashierromadera.component';
import { PergolaslonaComponent } from './pages/pergolaslona/pergolaslonamadera.component';
import { TechofijoevolutionComponent } from './pages/techofijoevolution/techofijoevolution.component';
import { TechofijoiskarComponent } from './pages/techofijoiskar/techofijoiskar.component';
import { CortinascorrederasComponent } from './pages/cortinascorrederas/cortinascorrederas.component';
import { CortinasabatiblesComponent } from './pages/cortinasabatibles/cortinasabatibles.component';
import { TarimasdeckComponent } from './pages/tarimasdeck/tarimasdeck.component';
import { TarimasnormalesComponent } from './pages/tarimasnormales/tarimasnormales.component';
import { GarajescerradosComponent } from './pages/garajescerrados/garajescerrados.component';
import { GarajesabiertosComponent } from './pages/garajesabiertos/garajesabiertos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { PoliticasprivacidadComponent } from './pages/politicasprivacidad/politicasprivacidad.component';
import { PoliticascookiesComponent } from './pages/politicascookies/politicascookies.component';
import { BlogdetalleComponent } from './pages/blogdetalle/blogdetalle.component';
import { AdminblogComponent } from './pages/adminblog/adminblog.component';
import { CenadoresComponent } from './pages/cenadores/cenadores.component';
import { MaestropergotendaComponent } from './pages/maestropergotenda/maestropergotenda.component';



const routes: Routes =[
  
  // { path: 'homecliente/:id' , component: HomeclienteComponent, canActivate: [AuthGuard] },
  // { path: 'homecliente/:id/:servicio' , component: HomeclienteComponent, canActivate: [AuthGuard] },
  
  //////////////////////////////principales
  { path: 'homecliente' , component: HomeclienteComponent},

  { path: 'blog' , component: BlogComponent},
  { path: 'blogdetalle/:id' , component: BlogdetalleComponent},
  { path: 'corradi' , component: CorradiComponent},
  { path: 'markilux' , component: MarkiluxComponent},
  { path: 'nosotros' , component: NosotrosComponent},
  { path: 'proyectos' , component: ProyectosComponent},
  { path: 'contacto' , component: ContactoComponent},
  { path: 'ethimo' , component: HomeclienteComponent},
  { path: 'politicasprivacidad' , component: PoliticasprivacidadComponent},
  { path: 'politicascookies' , component: PoliticascookiesComponent},


  ///////////////////////////subenlaces
  { path: 'ethimo/coleccion1' , component: Ethimocoleccion1Component},
  { path: 'ethimo/coleccion2' , component: Ethimocoleccion2Component},
  { path: 'ethimo/coleccion3' , component: Ethimocoleccion3Component},
  { path: 'ethimo/coleccion4' , component: Ethimocoleccion4Component},
  { path: 'ethimo/coleccion5' , component: Ethimocoleccion5Component},
  { path: 'ethimo/coleccion6' , component: Ethimocoleccion6Component},
  { path: 'ethimo/coleccion7' , component: Ethimocoleccion7Component},
  { path: 'ethimo/coleccion8' , component: Ethimocoleccion8Component},
  { path: 'ethimo/coleccion9' , component: Ethimocoleccion9Component},
  { path: 'ethimo/coleccion10' , component: Ethimocoleccion10Component},
  { path: 'ethimo/coleccion11' , component: Ethimocoleccion11Component},
  { path: 'ethimo/coleccion12' , component: Ethimocoleccion12Component},
  { path: 'ethimo/coleccion13' , component: Ethimocoleccion13Component},
  { path: 'ethimo/coleccion14' , component: Ethimocoleccion14Component},
  { path: 'ethimo/coleccion15' , component: Ethimocoleccion15Component},

  { path: 'corradi/bioclimaticas' , component: BioclimaticasComponent},
  { path: 'corradi/bioclimaticas/alba' , component: AlbaComponent},
  { path: 'corradi/bioclimaticas/eteria' , component: EteriaComponent},
  { path: 'corradi/bioclimaticas/imago' , component: ImagoComponent},
  { path: 'corradi/bioclimaticas/maestro' , component: MaestroComponent},
  { path: 'corradi/pergotenda' , component: PergotendaComponent},
  { path: 'corradi/pergotenda/bspace' , component: BspaceComponent},
  { path: 'corradi/pergotenda/exyl' , component: ExylComponent},
  { path: 'corradi/pergotenda/flux' , component: FluxComponent},
  { path: 'corradi/pergotenda/impact' , component: ImpactComponent},
  { path: 'corradi/pergotenda/maestro' , component: MaestropergotendaComponent},
  { path: 'corradi/pergotenda/milleniumceleb' , component: MilleniumcelebComponent},
  { path: 'corradi/pergotenda/palladia' , component: PalladiaComponent},
  { path: 'corradi/pergotenda/pergotenda45' , component: Pergotenda45Component},
  { path: 'corradi/sunsails' , component: SunsailsComponent},
  { path: 'corradi/sunsails/defense' , component: DefenseComponent},
  { path: 'corradi/sunsails/maestrale' , component: MaestraleComponent},
  { path: 'corradi/sunsails/scirocco' , component: SciroccoComponent},
  
  { path: 'markilux/toldosbrazosextensibles' , component: ToldosbrazosextensiblesComponent},
  { path: 'markilux/toldosveranda' , component: ToldosverandaComponent},
  { path: 'markilux/toldosverticales' , component: ToldosverticalesComponent},
  { path: 'markilux/pergolas' , component: PergolasComponent},
  { path: 'markilux/toldosbrazosextensibles/markiluxmx3' , component: Markiluxmx3Component},
  { path: 'markilux/toldosbrazosextensibles/markilux5010' , component: Markilux5010Component},
  { path: 'markilux/toldosbrazosextensibles/markilux6000' , component: Markilux6000Component},
  { path: 'markilux/toldosbrazosextensibles/markilux970' , component: Markilux970Component},
  { path: 'markilux/toldosbrazosextensibles/markilux1710strech' , component: Markilux1710strechComponent},
  { path: 'markilux/toldosveranda/markilux770' , component: Markilux770Component},
  { path: 'markilux/toldosveranda/markilux8800' , component: Markilux8800Component},
  { path: 'markilux/toldosveranda/markilux779' , component: Markilux779Component},
  { path: 'markilux/toldosverticales/markilux776' , component: Markilux776Component},
  { path: 'markilux/toldosverticales/markilux620tracfix' , component: Markilux620tracfixComponent},
  { path: 'markilux/pergolas/markiluxpergola' , component: MarkiluxpergolaComponent},
  { path: 'markilux/pergolas/markiluxmarkant' , component: MarkiluxmarkantComponent},
  { path: 'markilux/pergolas/markiluxstrech' , component: MarkiluxstrechComponent},

  { path: 'proyectos/bioclimaticasproyectos' , component: BioclimaticasproyectosComponent},
  { path: 'proyectos/techosmoviles' , component: TechosmovilesComponent},
  { path: 'proyectos/vallados' , component: ValladosComponent},
  { path: 'proyectos/barandillas' , component: BarandillasComponent},
  { path: 'proyectos/hosteleria' , component: HosteleriaComponent},
  { path: 'proyectos/porches' , component: PorchesComponent},
  { path: 'proyectos/pergolasproyectos' , component: PergolasproyectosComponent},
  { path: 'proyectos/techofijo' , component: TechofijoComponent},
  { path: 'proyectos/cortinasdecristal' , component: CortinasdecristalComponent},
  { path: 'proyectos/tarimas' , component: TarimasComponent},
  { path: 'proyectos/garajes' , component: GarajesComponent},
  { path: 'proyectos/cenadores' , component: CenadoresComponent},
  { path: 'proyectos/proyectosamedida' , component: ProyectosamedidaComponent},
  
  { path: 'proyectos/porches/madera' , component: PorchesmaderaComponent},
  { path: 'proyectos/porches/hierromadera' , component: PorcheshierromaderaComponent},
  { path: 'proyectos/pergolasproyectos/madera' , component: PergolasmaderaComponent},
  { path: 'proyectos/pergolasproyectos/hierromadera' , component: PergolashierromaderaComponent},
  { path: 'proyectos/pergolasproyectos/lonasacrilicas' , component: PergolaslonaComponent},
  { path: 'proyectos/techofijo/evolution' , component: TechofijoevolutionComponent},
  { path: 'proyectos/techofijo/iskar' , component: TechofijoiskarComponent},
  { path: 'proyectos/cortinasdecristal/correderas' , component: CortinascorrederasComponent},
  { path: 'proyectos/cortinasdecristal/abatibles' , component: CortinasabatiblesComponent},
  { path: 'proyectos/tarimas/deck' , component: TarimasdeckComponent},
  { path: 'proyectos/tarimas/normales' , component: TarimasnormalesComponent},
  { path: 'proyectos/garajes/cerrados' , component: GarajescerradosComponent},
  { path: 'proyectos/garajes/abiertos' , component: GarajesabiertosComponent},


  /////////////////////////////////////////////admin
  { path: 'adminhome' , component: AdminhomeComponent, canActivate: [AuthGuard] },
  { path: 'adminblog' , component: AdminblogComponent, canActivate: [AuthGuard] },
  { path: 'admincontacto' , component: AdmincontactoComponent, canActivate: [AuthGuard] },
  { path: 'adminhomecliente' , component: AdminhomeclienteComponent, canActivate: [AuthGuard] },
  { path: 'admintipo1/:idenlace' , component: Admintipo1Component, canActivate: [AuthGuard] },
  { path: 'admintipo2/:idenlace' , component: Admintipo2Component, canActivate: [AuthGuard] },
  { path: 'adminethimocoleccion/:idenlace' , component: AdminethimocoleccionComponent, canActivate: [AuthGuard] },

  
  //////////////////////////////////////////////default
  { path: '' , component: HomeclienteComponent},
  { path: '**' , component: HomeclienteComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
