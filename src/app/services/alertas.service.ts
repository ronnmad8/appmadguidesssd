import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonasModel } from '../models/Personas.model';
import { map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  userToken: string;
  idUsuario: string;
  url: string;
  apiurl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.apiurl = environment.apiurl;
  }


  
alertaWarning(mensaje,submensaje){
  return Swal.fire ({
  icon: 'warning',
  html: "<p class='text-warning fs-22'>"+ mensaje +"</p><p class='fs-20'>"+ submensaje +"</p>",
  title: "WEB XANADU",
  showCancelButton: true,
  confirmButtonColor: '#393935',
  cancelButtonColor: '#6c757d',
  confirmButtonText: 'Si',
  cancelButtonText: 'No'

});
}


alertaConfirmar(mensaje, submensaje) {
  return Swal.fire({
    icon: "info",
    html:
      "<p class='tverde  fs-22'>" +
      mensaje +
      "</p><p class=' fs-20'>" +
      submensaje +
      "</p>",
    title: "App",
    showCancelButton: true,
    confirmButtonColor: "#065528",
    cancelButtonColor: "#9A1914",
    confirmButtonText: "Si",
    cancelButtonText: "No",
  }).then();
}


alertaOK(mensaje, submensaje) {
 return  Swal.fire({
    icon: 'success',
    html: "<p class='text-success fs-22'>"+ mensaje +"</p><p class='fs-20'>"+ submensaje +"</p>",
    title: "WEB XANADU",
    timer: 1500,
    showCancelButton: false,
    showConfirmButton: false
    })
}

alertaKO(mensaje, submensaje) {
  return Swal.fire({
    icon: "warning",
    html:
      "<p class='tverde  fs-22'>" +
      mensaje +
      "</p><p class=' fs-20'>" +
      submensaje +
      "</p>",
    title: "App",
    timer: 3000,
    showCancelButton: false,
    showConfirmButton: false,
  }).then();
}

alertaDanger(mensaje, submensaje) {
  return  Swal.fire({
      icon: 'error',
      html: "<p class='text-danger fs-22'>"+ mensaje +"</p><p fs-20>"+ submensaje +"</p>",
      title: "WEB XANADU",
      showCancelButton: true,
      confirmButtonColor: '#393935',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
      })
}


alertaInfo(mensaje, submensaje) {
  return  Swal.fire({
     icon: 'info',
     html: "<p class='text-success fs-22'>"+ mensaje +"</p><p class='fs-20'>"+ submensaje +"</p>",
     title: "WEB XANADU",
     timer: 1500,
     showCancelButton: false,
     showConfirmButton: false
     })
 }
 

 alertaPeq(mensaje) {
 const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 5000,
  background: '#a88f45'
  
});

Toast.fire({
  type: 'success',
  title: '<span class="text-white">'+mensaje+'<span>',
  titleColor: '#ffffff'
});

 }




}
