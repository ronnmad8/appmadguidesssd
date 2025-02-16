import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { FiltersModel } from '../models/Filters.model';



@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
  userToken: string = "";
  idUsuario: string = "";
  url: string = "";
  apiurl: string;
  clang: string = 'es';

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




  getResultadoBuscador( filters: FiltersModel, page: number ) {

    let endpoint = '/visitsearch' ;
    this.url = this.apiurl + endpoint;

    filters.precioFin = (filters.precioFin == 0 ? 1000000 : filters.precioFin );
   
    let params ={
      "search": filters.title,
      "tags" : filters.caracteristicas,
      "categories" : filters.categorias,
      "languages" : filters.languages,
      "precioIni" : filters.precioIni,
      "precioFin" : filters.precioFin,
      "duracion" : filters.duracion,
      "franjashorarias" : filters.franja,
      "fechaini" : filters.fechaIni,
      "fechafin" : filters.fechaFin,
      "ordenar" : filters.ordenar,
      "idlang" : this.globalService.idlang

    }

    return this.http.post( `${this.url}`, params )
    .pipe(
      map( resp =>{
        let respuesta =  resp["data"]  as VisitasResultadoModel[]; 
        return respuesta;
      } ) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }


}

