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

    let endpoint = '/initpayment' ;
    this.url = this.apiurl + endpoint;

    return this.http.post(this.url, { amount });
  }

  sendRedsysPayment(Ds_MerchantParameters: string, Ds_Signature: string): any { // Devuelve SafeHtml
    const Ds_SignatureVersion = 'HMAC_SHA256_V1';
    const url = "https://sis-t.redsys.es:25443/sis/realizarPago"; // URL de Redsys
    //const url = "https://sis.redsys.es:25443/sis/realizarPago"; // URL de Redsys

    const form = document.createElement('form');
    form.action = url;
    form.method = 'POST';

    const merchantParamsField = document.createElement('input');
    merchantParamsField.type = 'hidden';
    merchantParamsField.name = 'Ds_MerchantParameters';
    merchantParamsField.value = Ds_MerchantParameters;
    form.appendChild(merchantParamsField);

    const signatureField = document.createElement('input');
    signatureField.type = 'hidden';
    signatureField.name = 'Ds_Signature';
    signatureField.value = Ds_Signature;
    form.appendChild(signatureField);

    const signatureVersionField = document.createElement('input');
    signatureVersionField.type = 'hidden';
    signatureVersionField.name = 'Ds_SignatureVersion';
    signatureVersionField.value = Ds_SignatureVersion;
    form.appendChild(signatureVersionField);

    document.body.appendChild(form);
    console.log("Formulario:", form); 

    form.submit();

  }

}
