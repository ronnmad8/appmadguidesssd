import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SpinnerService } from 'src/app/services/spinner.service';
import { catchError, finalize, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { AlertasService } from '../services/alertas.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  
  
  constructor(
    private auth: AuthService,
    private globalService: GlobalService,
    private alertasService: AlertasService,
    
  ) { 
    
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => event), 
      catchError((error: HttpErrorResponse) => {
        
          if (error && error.status == 401){
            console.log("intercept error", error);
            this.alertasService.alertaKO('Madguides', 'Error, revise los campos');
          }
          else{
            this.alertasService.alertaKO('Madguides', 'Error, Algo fue mal durante el proceso');
          }
          return throwError(error);
      }));
    
  }


}
