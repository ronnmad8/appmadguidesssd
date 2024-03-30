import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VisitasModel } from '../models/Visitas.model';
import { VisitaAssetsModel } from '../models/VisitaAssets.model';
import { TextoquienessomosModel } from '../models/Textoquienessomos.model';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class QuienessomosService {
  clang: string = 'es';
  url: string = '';
  apiurl: string;
 
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private globalService: GlobalService,
  ) {
    this.apiurl = environment.apiurl;
    this.clang = this.globalService.getLanguage();
  }




  }








  

  
  

  

  



