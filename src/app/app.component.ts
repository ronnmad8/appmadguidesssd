import { Component } from '@angular/core';
import { PlatformService } from './services/platform.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'madguides';
  footersinlinks: boolean = false;

  constructor(
    private platformService: PlatformService
  )
{
  this.mostrarenlacesenfooter();
  this.getCurrentLanguage() ;
}

  nomostrarenlacesenfooter(){
     
     this.footersinlinks = true;
  }
  
  mostrarenlacesenfooter(){
     
     this.footersinlinks = false;
  }

  getCurrentLanguage() {
    let cl = localStorage.getItem('currentLanguage');
    let lang = "es";
    if(this.platformService.plId == "browser") {
      let sWindow = this.platformService.sWindow ;
      if(sWindow != null){
        lang = sWindow.navigator.language;
      }
    }
    if(cl == null) {
      localStorage.setItem('currentLanguage', lang);
    }
  }



}
