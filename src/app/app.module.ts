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
import { SlidervisitasComponent } from './componentes/slidervisitas/slidervisitas.component';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SlidertestimoniosComponent } from './componentes/slidertestimonios/slidertestimonios.component';
import { ZonacontactoComponent } from './componentes/zonacontacto/zonacontacto.component';


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
    ZonacontactoComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'madguides' }),
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, routerOptions),
    SwiperModule

    
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
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
