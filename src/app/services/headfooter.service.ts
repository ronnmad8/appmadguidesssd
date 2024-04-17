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
import { HomerespModel } from '../models/Homeresp.model';
import { ComentariosModel } from '../models/Cometarios.model';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { ResultadoModel } from '../models/Resultado.model';
import { utf8Encode } from '@angular/compiler/src/util';
import { MenuModel } from '../models/Menu.model';
import { FooterModel } from '../models/Footer.model';




@Injectable({
  providedIn: 'root'
})
export class HeadfooterService {
  clang: string = 'es';
  userToken: string = "";
  url: string = "";
  apiurl: string;
  

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.apiurl = environment.apiurlold;
    this.clang = this.globalService.getLanguage();
  }


    


}