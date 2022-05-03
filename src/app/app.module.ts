import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';

import { registerLocaleData } from '@angular/common';
import { FooterComponent } from './pages/shared/footer/footer.component';
import localeEs from '@angular/common/locales/es';
import { NgxPaginationModule } from 'ngx-pagination';
registerLocaleData( localeEs , 'es');




import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { AdminhomeclienteComponent } from './pages/adminhomecliente/adminhomecliente.component';

import { AdminethimocoleccionComponent } from './pages/adminethimocoleccion/adminethimocoleccion.component';
import { Admintipo1Component } from './pages/admintipo1/admintipo1.component';
import { Admintipo2Component } from './pages/admintipo2/admintipo2.component';


import { HomeclienteComponent } from './pages/homecliente/homecliente.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { BlogComponent } from './pages/blog/blog.component';
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

import { NgwWowModule } from 'ngx-wow';
import { SliderComponent } from './components/slider/slider.component';
import { SlidercoleccionesComponent } from './components/slidercolecciones/slidercolecciones.component';
import { SliderproveedoresComponent } from './components/sliderproveedores/sliderproveedores.component';
import { SwiperModule, SWIPER_CONFIG,SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MapComponent } from './components/map/map.component';
import { RouterModule, Routes, ExtraOptions  } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';
import { MontadasiComponent } from './components/montadasi/montadasi.component';
import { MontadasdComponent } from './components/montadasd/montadasd.component';
import { TextoseccionesComponent } from './components/textosecciones/textosecciones.component';
import { TextocoleccionesComponent } from './components/textocolecciones/textocolecciones.component';
import { ContactarComponent } from './components/contactar/contactar.component';
import { EnteraComponent } from './components/entera/entera.component';
import { TripleComponent } from './components/triple/triple.component';
import { SliderlightboxComponent } from './components/sliderlightbox/sliderlightbox.component';
import { SliderarticulocoleccionesComponent } from './components/sliderarticulocolecciones/sliderarticulocolecciones.component';
import { SliderAcabadosComponent } from './components/sliderAcabados/sliderAcabados.component';
import { GaleriacoleccionesComponent } from './components/galeriacolecciones/galeriacolecciones.component';
import { CorradiComponent } from './pages/corradi/corradi.component';
import { Galeria3Component } from './pages/galeria3/galeria3.component';
import { GaleriacinemaComponent } from './components/galeriacinema/galeriacinema.component';
import { BioclimaticasComponent } from './pages/bioclimaticas/bioclimaticas.component';
import { AlbaComponent } from './pages/alba/alba.component';
import { EteriaComponent } from './pages/eteria/eteria.component';
import { ImagoComponent } from './pages/imago/imago.component';
import { MaestroComponent } from './pages/maestro/maestro.component';
import { ImpactComponent } from './pages/impact/impact.component';
import { FluxComponent } from './pages/flux/flux.component';
import { ExylComponent } from './pages/exyl/exyl.component';
import { BspaceComponent } from './pages/bspace/bspace.component';
import { PalladiaComponent } from './pages/palladia/palladia.component';
import { MilleniumcelebComponent } from './pages/milleniumceleb/milleniumceleb.component';
import { Pergotenda45Component } from './pages/pergotenda45/pergotenda45.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';

import { MaestropergotendaComponent } from './pages/maestropergotenda/maestropergotenda.component';

import { MontadasilongComponent } from './components/montadasilong/montadasilong.component';
import { MontadasdlongComponent } from './components/montadadlong/montadasdlong.component';
import { CollageproveedoresComponent } from './components/collageproveedores/collageproveedores.component';

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
import { MarkiluxmarkantComponent } from './pages/markiluxmarkant/markiluxmarkant.component';
import { PergolasComponent } from './pages/pergolas/pergolas.component';
import { ToldosverandaComponent } from './pages/toldosveranda/toldosveranda.component';
import { ToldosverticalesComponent } from './pages/toldosverticales/toldosverticales.component';
import { LoginComponent } from './components/login/login.component';
import { MarkiluxpergolaComponent } from './pages/markiluxpergola/markiluxpergola.component';
import { MarkiluxstrechComponent } from './pages/markiluxstrech/markiluxstrech.component';
import { TablaimagenesComponent } from './components/tablaimagenes/tablaimagenes.component';
import { TablatextosComponent } from './components/tablatextos/tablatextos.component';
import { TablaarticulosComponent } from './components/tablaarticulos/tablaarticulos.component';
import { TituloadminComponent } from './components/tituloadmin/tituloadmin.component';
import { MarkiluxComponent } from './pages/markilux/markilux.component';
import { TablaimagenesgaleriaComponent } from './components/tablaimagenesgaleria/tablaimagenesgaleria.component';
import { TablaacabadosComponent } from './components/tablaacabados/tablaacabados.component';
import { ProyecsComponent } from './components/proyecs/proyecs.component';
import { AccesoriosComponent } from './pages/accesorios/accesorios.component';
import { BioclimaticasproyectosComponent } from './pages/bioclimaticasproyectos/bioclimaticasproyectos.component';
import { ProyecsdComponent } from './components/proyecsd/proyecsd.component';
import { TechosmovilesComponent } from './pages/techosmoviles/techosmoviles.component';
import { ValladosComponent } from './pages/vallados/vallados.component';
import { BarandillasComponent } from './pages/barandillas/barandillas.component';
import { HosteleriaComponent } from './pages/hosteleria/hosteleria.component';
import { PorchesComponent } from './pages/porches/porches.component';
import { PergolasproyectosComponent } from './pages/pergolasproyectos/pergolasproyectos.component';
import { TechofijoComponent } from './pages/techofijo/techofijo.component';
import { CortinasdecristalComponent } from './pages/cortinasdecristal/cortinasdecristal.component';
import { TarimasComponent } from './pages/tarimas/tarimas.component';
import { GarajesComponent } from './pages/garajes/garajes.component';
import { ProyectosamedidaComponent } from './pages/proyectosamedida/proyectosamedida.component';
import { GarajesabiertosComponent } from './pages/garajesabiertos/garajesabiertos.component';
import { GarajescerradosComponent } from './pages/garajescerrados/garajescerrados.component';
import { PorchesmaderaComponent } from './pages/porchesmadera/porchesmadera.component';
import { PorcheshierromaderaComponent } from './pages/porcheshierromadera/porcheshierromadera.component';
import { PergolasmaderaComponent } from './pages/pergolasmadera/pergolasmadera.component';
import { PergolashierromaderaComponent } from './pages/pergolashierromadera/pergolashierromadera.component';
import { PergolaslonaComponent } from './pages/pergolaslona/pergolaslonamadera.component';
import { CortinasabatiblesComponent } from './pages/cortinasabatibles/cortinasabatibles.component';
import { CortinascorrederasComponent } from './pages/cortinascorrederas/cortinascorrederas.component';
import { TarimasdeckComponent } from './pages/tarimasdeck/tarimasdeck.component';
import { TarimasnormalesComponent } from './pages/tarimasnormales/tarimasnormales.component';
import { TechofijoevolutionComponent } from './pages/techofijoevolution/techofijoevolution.component';
import { TechofijoiskarComponent } from './pages/techofijoiskar/techofijoiskar.component';
import { Ethimocoleccion13Component } from './pages/ethimocoleccion13/ethimocoleccion13.component';
import { Ethimocoleccion14Component } from './pages/ethimocoleccion14/ethimocoleccion14.component';
import { Ethimocoleccion15Component } from './pages/ethimocoleccion15/ethimocoleccion15.component';
import { AdmincontactoComponent } from './pages/admincontacto/admincontacto.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { CollagesellosComponent } from './components/collagesellos/collagesellos.component';
import { PoliticasprivacidadComponent } from './pages/politicasprivacidad/politicasprivacidad.component';
import { PoliticascookiesComponent } from './pages/politicascookies/politicascookies.component';
import { GaleriablogComponent } from './components/galeriablog/galeriablog.component';
import { BlogultisComponent } from './components/blogultis/blogultis.component';
import { BlogdetalleComponent } from './pages/blogdetalle/blogdetalle.component';
import { AdminblogComponent } from './pages/adminblog/adminblog.component';
import { CenadoresComponent } from './pages/cenadores/cenadores.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TablablogarticulosComponent } from './components/tablablogarticulos/tablablogarticulos.component';



const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollOffset: [0, 6],
};

const routes: Routes = [
  {
    path: 'content',
    component: AppComponent,
  },
  {
    path: '',
    redirectTo: 'content', // Empty path will redirect to content route.
    pathMatch: 'full'
  }
 ];



@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,

    AdminhomeComponent,
    AdminhomeclienteComponent,
    AdmincontactoComponent,
    AdminblogComponent,
    AdminethimocoleccionComponent,

    Admintipo1Component,
    Admintipo2Component,

    HomeclienteComponent,
    NosotrosComponent,
    BlogComponent,
    ContactoComponent,
    Ethimocoleccion1Component,
    Ethimocoleccion2Component,
    Ethimocoleccion3Component,
    Ethimocoleccion4Component,
    Ethimocoleccion5Component,
    Ethimocoleccion6Component,
    Ethimocoleccion7Component,
    Ethimocoleccion8Component,
    Ethimocoleccion9Component,
    Ethimocoleccion10Component,
    Ethimocoleccion11Component,
    Ethimocoleccion12Component,
    Ethimocoleccion13Component,
    Ethimocoleccion14Component,
    Ethimocoleccion15Component,
  
    SliderComponent,
    SlidercoleccionesComponent,
    SliderproveedoresComponent,
    CollageproveedoresComponent,
    MapComponent,
    BannerComponent,
    MontadasiComponent,
    MontadasdComponent,
    TextoseccionesComponent,
    TextocoleccionesComponent,
    ContactarComponent,
    EnteraComponent,
    SlidercoleccionesComponent,
    SliderlightboxComponent,
    TripleComponent,
    SliderarticulocoleccionesComponent,
    SliderAcabadosComponent,
    GaleriacoleccionesComponent,
    CorradiComponent,
    MarkiluxComponent,
    Galeria3Component,
    GaleriacinemaComponent,
    MontadasilongComponent,
    MontadasdlongComponent,

    BioclimaticasComponent,
    AlbaComponent,
    EteriaComponent,
    ImagoComponent,
    MaestroComponent,
    ImpactComponent,
    FluxComponent,
    ExylComponent,
    BspaceComponent,
    PalladiaComponent,
    PergotendaComponent,
    ToldosbrazosextensiblesComponent,
    ToldosverandaComponent,
    ToldosverticalesComponent,
    PergolasComponent,
    Markiluxmx3Component,
    Markilux5010Component,
    Markilux6000Component,
    Markilux970Component,
    Markilux1710strechComponent,
    Markilux770Component,
    Markilux8800Component,
    Markilux779Component,
    Markilux776Component,
    Markilux620tracfixComponent,
    SunsailsComponent,
    DefenseComponent,
    MaestraleComponent,
    SciroccoComponent,
    MilleniumcelebComponent,
    Pergotenda45Component,
    MarkiluxmarkantComponent,
    MaestropergotendaComponent,
    MarkiluxpergolaComponent,
    MarkiluxstrechComponent,
    TablaimagenesComponent,
    TablablogarticulosComponent,
    TablaimagenesgaleriaComponent,
    TablatextosComponent,
    TablaarticulosComponent,
    TituloadminComponent,
    TablaacabadosComponent,
    AccesoriosComponent,
    BioclimaticasproyectosComponent,
    ProyectosComponent,
    ProyecsdComponent,
    ProyecsComponent,
    TechosmovilesComponent,
    ValladosComponent,
    BarandillasComponent,
    HosteleriaComponent,
    PorchesComponent,
    PergolasproyectosComponent,
    TechofijoComponent,
    CortinasdecristalComponent,
    TarimasComponent,
    GarajesComponent,
    ProyectosamedidaComponent,
    GarajesabiertosComponent,
    GarajescerradosComponent,
    PorchesmaderaComponent,
    PorcheshierromaderaComponent,
    PergolasmaderaComponent,
    PergolashierromaderaComponent,
    PergolaslonaComponent,
    CortinasabatiblesComponent,
    CortinascorrederasComponent,
    TarimasdeckComponent,
    TarimasnormalesComponent,
    TechofijoevolutionComponent,
    TechofijoiskarComponent,
    CollagesellosComponent,
    PoliticasprivacidadComponent,
    PoliticascookiesComponent,
    GaleriablogComponent,
    BlogultisComponent,
    BlogdetalleComponent,
    CenadoresComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgwWowModule,
    SwiperModule,
    RouterModule.forRoot(routes, routerOptions),
    CKEditorModule, 

  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'},
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  
  ],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
