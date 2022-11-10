import { isPlatformBrowser } from '@angular/common';
import { APP_ID, Inject, NgModule, PLATFORM_ID, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes, ExtraOptions  } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './componentes/base/base.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BannerComponent } from './componentes/banner/banner.component';
import { BannerhomeComponent } from './componentes/bannerhome/bannerhome.component';
import { BannerbuscadorComponent } from './componentes/bannerbuscador/bannerbuscador.component';
import { SlidervisitasComponent } from './componentes/slidervisitas/slidervisitas.component';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SlidertestimoniosComponent } from './componentes/slidertestimonios/slidertestimonios.component';
import { ZonacontactoComponent } from './componentes/zonacontacto/zonacontacto.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SlidervisitaComponent } from './componentes/slidervisita/slidervisita.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SlidervisitasinteresarComponent } from './componentes/slidervisitasinteresar/slidervisitasinteresar.component';
import { ZonapagoComponent } from './componentes/zonapago/zonapago.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CompraComponent } from './pages/compra/compra.component';
import { ZonacompraComponent } from './componentes/zonacompra/zonacompra.component';
import { CapitalizePipeComponent } from './pipes/capitalize.component';
import { VisitadetailComponent } from './pages/visitadetail/visitadetail.component';
import { FnumberPipeComponent } from './pipes/fnumber.component';
import { IdiomaisoPipeComponent } from './pipes/idiomaiso.component';
import { FechalegPipeComponent } from './pipes/fechaleg.component';
import { HoralegPipeComponent } from './pipes/horaleg.component';
import { AdminclienteComponent } from './pages/admincliente/admincliente.component';
import { ZonamicuentaComponent } from './componentes/zonamicuenta/zonamicuenta.component';
import { QuienessomosComponent } from './pages/quienessomos/quienessomos.component';
import { LaempresaComponent } from './componentes/laempresa/laempresa.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { FaqsComponent } from './componentes/faqs/faqs.component';
import { PoliticascookiesComponent } from './pages/politicascookies/politicascookies.component';
import { PoliticasComponent } from './componentes/politicas/politicas.component';
import { PoliticasprivacidadComponent } from './pages/politicasprivacidad/politicasprivacidad.component';
import { PoliticascompraComponent } from './pages/politicascompra/politicascompra.component';
import { AvisolegalComponent } from './pages/avisolegal/avisolegal.component';
import { MedidascovidComponent } from './pages/medidascovid/medidascovid.component';
import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login'; 

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
    BaseComponent,
    HomeComponent,
    BuscadorComponent,
    NavbarComponent,
    FooterComponent,
    BannerComponent,
    BannerhomeComponent,
    SlidervisitasComponent,
    SlidertestimoniosComponent,
    ZonacontactoComponent,
    BannerbuscadorComponent,
    BusquedaComponent,
    SlidervisitaComponent,
    SlidervisitasinteresarComponent,
    CarritoComponent,
    ZonapagoComponent,
    CompraComponent,
    ZonacompraComponent,
    CapitalizePipeComponent,
    VisitadetailComponent,
    FnumberPipeComponent,
    IdiomaisoPipeComponent,
    FechalegPipeComponent,
    HoralegPipeComponent,
    AdminclienteComponent,
    ZonamicuentaComponent,
    QuienessomosComponent,
    LaempresaComponent,
    ContactoComponent,
    AyudaComponent,
    FaqsComponent,
    PoliticasComponent,
    PoliticascookiesComponent,
    PoliticasprivacidadComponent,
    PoliticascompraComponent,
    AvisolegalComponent,
    MedidascovidComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'madguides' }),
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, routerOptions),
    SwiperModule,
    NgxSliderModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    SocialLoginModule
    
    
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: FacebookLoginProvider.PROVIDER_ID,
    //         provider: new FacebookLoginProvider('869756637733587')

    //       }
    //     ]
    //   } as SocialAuthServiceConfig,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ){
    const platform = isPlatformBrowser(this.platformId) ? 'browser' : 'server';
    console.log("I'm on the ", platform);
  }
}
