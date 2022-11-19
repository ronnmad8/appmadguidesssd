import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class SpinnerService {
 
  isloading$ = new Subject<boolean>();

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {
     ///
  }
    


  show(): void{
    this.isloading$.next(true);
  }

  hide(): void{
    this.isloading$.next(false);
  }


 
}
