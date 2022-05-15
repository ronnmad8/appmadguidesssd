import { isPlatformBrowser } from '@angular/common';
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './componentes/base/base.component';
import { HomeComponent } from './pages/homecliente/home.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { NavbarComponent } from './pages/shared/navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'madguides' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
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
