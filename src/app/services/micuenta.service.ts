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
import { VisitasModel } from '../models/Visitas.model';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { VisitaAssetsModel } from '../models/VisitaAssets.model';
import { TimesModel } from '../models/Times.model';
import { ResultadoModel } from '../models/Resultado.model';
import { UserModel } from '../models/User.model';


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

  
  getMessagesMicuenta() {

    let endpoint = '/assets/micuenta';
    this.url = this.apiurl + endpoint;

    return this.http.get(`${this.url}`).pipe(
      map((resp) => {
        var messageData: VisitaAssetsModel = resp as VisitaAssetsModel;
        return messageData;
      }),
      catchError((err) => {
        console.error('Error', err.error);
        return err.error;
      })
    );
  }


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








}
