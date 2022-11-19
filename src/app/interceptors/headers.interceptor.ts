import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SpinnerService } from 'src/app/services/spinner.service';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  
  
  constructor(
    private auth: AuthService,
    private globalService: GlobalService,
    
  ) { 
    
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const language = this.globalService.getLanguage();
    const requestlang = request.clone({
      setHeaders: {
         'Language': language
      }
    });
    const idToken = this.auth.leerToken();
    if(idToken){
      const cloned = requestlang.clone({
        headers: requestlang.headers.set("Authorization", "Bearer " + idToken)
      });
      return next.handle(cloned);
    }
    else{
      
      return next.handle(requestlang);
    }
  }


}
