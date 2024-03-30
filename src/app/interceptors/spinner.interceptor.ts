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

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  
  
  constructor(
    private readonly spinnerService: SpinnerService,
    
  ) { 
    
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //this.spinnerService.show();
    return next.handle(request).pipe(
      finalize(() => {
       // this.spinnerService.hide();
      })
    );
  }


}
