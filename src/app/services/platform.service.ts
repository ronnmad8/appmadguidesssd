import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { Observable, ReplaySubject} from 'rxjs';
import { WindowService } from 'ngx-wow';


@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  isrespon: boolean = false;
  scree: number = 0;
  sWindow: any;
  sDocument: any;
  plId: string = "browser";
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: any,
    private windowService: WindowService,
  ) 
  { 
   this.plId = this.platformId;
   if(isPlatformBrowser(this.platformId)) {
      this.sWindow =  this.windowService.nativeWindow ;
      this.sDocument =  this.document; 
   }
   this.isresponsive();
  }


  isresponsive() {
    
    this.isrespon = false;
    if(this.sWindow != null){
      this.scree = this.sWindow.window.innerWidth;
      if (this.scree < 1198) {
        this.isrespon = true;
      }
    }
  }


}

