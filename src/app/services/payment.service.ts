import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ListasService } from './listas.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  url: string = "";
  apiurl: string;

  constructor(
      private http: HttpClient,

    ) {
      this.apiurl = environment.apiurl;

    }

  initPayment(amount: number): Observable<any> {

    let endpoint = '/init-payment' ;
    this.url = this.apiurl + endpoint;

    return this.http.post(this.url, { amount });
  }
}
