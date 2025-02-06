import { Component, HostListener } from '@angular/core';
import { GlobalService } from './services/global.service';
import { PlatformService } from './services/platform.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'madguides';
  footersinlinks: boolean = false;
  private resizeTimeout: any;

  constructor(
    private platformService: PlatformService,
    private globalService: GlobalService
  )
{
  this.getCurrentLanguage() ;
  
  this.globalService.setTextContents();
  this.globalService.setlanguages();
}

@HostListener('window:resize', ['$event'])
  onWindowResize() {
    // Cancela el temporizador anterior para evitar múltiples recargas
    clearTimeout(this.resizeTimeout);

    this.resizeTimeout = setTimeout(() => {
        window.location.reload();
    }, 1000);
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
