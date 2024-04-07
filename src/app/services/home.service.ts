import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VisitasModel } from '../models/Visitas.model';
import { HomerespModel } from '../models/Homeresp.model';
import { ComentariosModel } from '../models/Cometarios.model';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { ResultadoModel } from '../models/Resultado.model';
import { MessagesImageModel} from '../models/MessagesImage.model';
import { utf8Encode } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  clang: string = 'es';
  userToken: string = "";
  idUsuario: string = "";
  url: string = "";
  apiurl: string;
  dataresultado: any;
  headers: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
    this.clang = this.globalService.getLanguage();
    this.userToken = this.auth.leerToken();
    
  }

  
    getCommentsHome()  {

      //
    }

    getCajaBuscaHome(busqueda:string){

      let _datos = {
        search: busqueda
      };
      let endpoint = '/visitsearch' ; 
      this.url = this.apiurl + endpoint;
      return this.http.post(`${this.url}`, _datos).pipe(
        map((res) => {
          let respuesta = res as VisitasResultadoModel[];
          return respuesta;
        }),
        catchError((err) => {
          console.error('Error  ', err.error);
          return err.error;
        })
      );
    }


}