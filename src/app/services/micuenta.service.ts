import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { TimesModel } from '../models/Times.model';
import { ResultadoModel } from '../models/Resultado.model';
import { UserModel } from '../models/User.model';
import { PrefixModel } from '../models/Prefix.model';
import { ReservationModel } from '../models/Reservations.model';
import { RespuestaModel } from '../models/Respuesta.model';


@Injectable({
  providedIn: 'root',
})
export class MicuentaService {
  userToken: string = '';
  idUsuario: string = '';
  url: string = '';
  apiurl: string;
  clang: string = 'es';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
    
  }

  
  // getMessagesMicuenta() {

  //   let endpoint = '/assets/micuenta';
  //   this.url = this.apiurl + endpoint;

  //   return this.http.get(`${this.url}`).pipe(
  //     map((resp) => {
  //       var messageData: VisitaAssetsModel = resp as VisitaAssetsModel;
  //       return messageData;
  //     }),
  //     catchError((err) => {
  //       console.error('Error', err.error);
  //       return err.error;
  //     })
  //   );
  // }


  meUser(user: UserModel) {

    let endpoint = '/me';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, null).pipe(
      map((res) => {
        let respuesta = res;

        return user;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }



  

  getPrefix() {

    let endpoint = '/i18n/prefix?per_page=1000';
    this.url = this.apiurl + endpoint;
    let prefixs: PrefixModel[] = [];
    return this.http.get(`${this.url}`).pipe(
      map((res) => {
        if(res != null){
          prefixs = res['data'] as PrefixModel[];
        }
        return prefixs;
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }


  getReservation() {
    let idlang = this.globalService.getLanguageId();
    let endpoint = '/reservasclienteall/'+idlang;
    this.url = this.apiurl + endpoint;
    let visitas: any[] = [];
    return this.http.get(`${this.url}`).pipe(
      map((res) => {
        if(res != null){
          visitas = res['data'] as ReservationModel[];
        }
        return visitas;
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }


  deleteReservation(uuid){
    let _datos = {
      uuid
    };
    
    let endpoint = 'reservation/cancel';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos).pipe(
      map((res) => {
        
        let user = res as RespuestaModel;
        return user;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }




}
