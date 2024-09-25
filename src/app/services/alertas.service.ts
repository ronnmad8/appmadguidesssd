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
export class AlertasService {
  userToken: string;
  idUsuario: string;
  url: string;
  apiurl: string;

  constructor(
    private http: HttpClient, 
    private auth: AuthService,
    private globalService: GlobalService
  ) {
    this.apiurl = environment.apiurl;
  }

  alertaWarning(mensaje: string, submensaje: string) {
    return Swal.fire({
      icon: 'warning',
      html:
        "<p class='text-warning fs-22'>" +
        mensaje +
        "</p><p class='fs-20'>" +
        submensaje +
        '</p>',
      title: 'WEB MADGUIDES',
      showCancelButton: true,
      confirmButtonColor: '#CD163F',
      cancelButtonColor: '#584446',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });
  }

  alertaConfirmar(mensaje: string, submensaje: string) {
    return Swal.fire({
      icon: 'info',
      html:
        "<p class='tverde  fs-22'>" +
        mensaje +
        "</p><p class=' fs-20'>" +
        submensaje +
        '</p>',
      title: 'WEB MADGUIDES',
      showCancelButton: true,
      confirmButtonColor: '#CD163F',
      cancelButtonColor: '#584446',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      
    }).then();
  }

  alertaOK(mensaje: string, submensaje: string) {
    return Swal.fire({
      icon: 'success',
      html:
        "<p class='text-success fs-22'>" +
        mensaje +
        "</p><p class='fs-20'>" +
        submensaje +
        '</p>',
      title: 'WEB MADGUIDES',
      timer: 3500,
      showCancelButton: false,
      showConfirmButton: false,
    });
  }

  alertaKO(mensaje: string, submensaje: string) {
    return Swal.fire({
      icon: 'warning',
      html:
        "<p class='tverde  fs-22'>" +
        mensaje +
        "</p><p class=' fs-20'>" +
        submensaje +
        '</p>',
      title: 'App',
      timer: 3500,
      showCancelButton: false,
      showConfirmButton: false,
    }).then();
  }

  alertaDanger(mensaje: string, submensaje: string) {
    return Swal.fire({
      icon: 'error',
      html:
        "<p class='text-danger fs-22'>" +
        mensaje +
        '</p><p fs-20>' +
        submensaje +
        '</p>',
      title: 'WEB MADGUIDES',
      showCancelButton: true,
      confirmButtonColor: '#393935',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    });
  }

  alertaInfo(mensaje: string, submensaje: string) {
    return Swal.fire({
      icon: 'info',
      html:
        "<p class='text-success fs-22'>" +
        mensaje +
        "</p><p class='fs-20'>" +
        submensaje +
        '</p>',
      title: 'WEB MADGUIDES',
      timer: 3500,
      showCancelButton: false,
      showConfirmButton: false,
    });
  }

  alertaPeq(mensaje: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 5000,
      background: '#a88f45',
    });
  }


  //////////////////////////////////////////////con traduccion


 isoalert( tipo: string ){
    return this.globalService.getAlerta(tipo);
 }







}
