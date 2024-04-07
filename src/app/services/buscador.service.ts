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
import { ResultadoModel } from '../models/Resultado.model';
import { FiltersModel } from '../models/Filters.model';
import { TimesModel } from '../models/Times.model';



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

    let endpoint = '/visit?' ;
    this.url = this.apiurl + endpoint;
    filters.precioFin = (filters.precioFin == 0 ? 1000000 : filters.precioFin );
   
    ////filtro titulo
    if(filters.title != ''){
      this.url += "&title=" + filters.title ;  
    }
    
    ///perpage
    this.url += "&per_page= 8" ;

    ///pagina
    this.url += "&page=" + page ;

    ////filtro fechas
    if(filters.fechaIni != ''){
      this.url += "&date=" + filters.fechaIni 
      if(filters.fechaFin != ''){
        this.url +=  "," + filters.fechaFin; 
      }  
    }
    ////filtro idiomas
    if(filters.languages.length > 0){
      this.url += "&language=" + filters.languages.join(','); 
    }
    ////filtro duracion
    if(filters.duracion.length > 0){
      this.url += "&duration=" + filters.duracion.join('-');  ; 
    }
    ////filtro franja horaria
    if(filters.franja.length > 0){
      this.url += "&time=" + filters.franja.join(',');
    }
    ////filtro precio
    if(filters.precioIni != 0 || filters.precioFin != 0){
       this.url += "&price=" + filters.precioIni + "," + filters.precioFin;
    }
    ///filtro caracteristicas
    if(filters.caracteristicas.length > 0){
      this.url += "&tags=" + filters.caracteristicas.join(',');
    }
    ///filtro categorias
    if(filters.categorias.length > 0){
      this.url += "&category=" + filters.categorias.join(',');
    }
    ///filtro orden
    this.url += "&order=" + filters.ordenar + "&orderby="+ filters.orderasc ;

    return this.http.get( `${this.url}` )
    .pipe(
      map( resp =>{
        
        var resultado: ResultadoModel  = resp as ResultadoModel; 
        resultado.data.forEach((el: any, index: number) => {
            if(el.visit_time_uuid != null && el.visit_time == null){
                el = [];

            }
          });
        return resultado;    
      } ) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }


}

