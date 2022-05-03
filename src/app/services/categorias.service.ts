import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AcabadosModel } from '../models/Acabados.model';
import { CategoriasModel } from '../models/categorias.model';
import { AcabadoscategoriasModel } from '../models/Acabadoscategorias.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouteConfigLoadEnd, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  userToken: string;
  idUsuario: string;
  url: string;
  apiurl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
  }


  crearCategoria( categoria: CategoriasModel ) {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/categorias';
    this.url = this.apiurl + endpoint;

    const pData = {

       nombre:  categoria.nombre

    };
    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });

    return this.http.post( `${this.url}`, pData, {headers} )
    .pipe(
      map( res => res as CategoriasModel) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );

  }



  modificarCategiras( categoria: CategoriasModel, file1: File) {
  
    this.userToken = this.auth.leerToken();
    let endpoint =  '/categorias/modificar' ;
    this.url = this.apiurl + endpoint;

    const pData = {

      id : categoria.id,
      nombre : categoria.nombre
    }

    
    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    
    return this.http.post( `${this.url}`, pData, {headers} )
    .pipe(
      map( res => res as CategoriasModel) ,
      catchError((err) => {
        console.error("Error  " , err.error);
        return err.error;
      })
    );
  }


  getListaCategorias() {
    let endpoint =  '/categorias';
    this.url = this.apiurl + endpoint ;
    return this.http.get( `${this.url}` )
    .pipe(
      map( res => res as CategoriasModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }


  getCategirasFilt(idenlace :number, idcategoria :number)  {
    
    let endpoint = '/categorias/filt' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      acabadocategorias_id: idcategoria
    };
    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as CategoriasModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }


  getCategirasFiltAdmin(idenlace :number, nombre: string, fechaini: string, fechafin: string)  {

    this.userToken = this.auth.leerToken();
    let endpoint = '/categorias/filtadmin' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      id: idenlace,
      nombre: nombre,
      fechaini: fechaini,
      fechafin: fechafin
      
    };
    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    return this.http.post( `${this.url}`, filtData, { headers } )
    .pipe(
      map( res => res as CategoriasModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }


  getCategirasEnlace(idenlace :number)  {
    this.userToken = this.auth.leerToken();
    let endpoint = '/categorias/enlace' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      id: idenlace
    };
    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    return this.http.post( `${this.url}`, filtData, { headers } )
    .pipe(
      map( res => res as CategoriasModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }


  deleteCategira(id) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/categorias/eliminar/' + id ;
    this.url = this.apiurl +  endpoint ;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers }  )
    .pipe(
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    ); 
}



getCategirascategoriasFilt(idenlace :number)  {
    
  let endpoint = '/categorias/filt' ;
  this.url = this.apiurl + endpoint;
  const filtData = {
    enlaces_id: idenlace
  };
  return this.http.post( `${this.url}`, filtData )
  .pipe(
    map( res => res as CategoriasModel[]) ,
    catchError((err) => {
      console.error("Error  " , err.error);
      if(err.includes("Unauthorized")){
        this.router.navigateByUrl("/homecliente");
      }
      return err.error;
    })
  );

}



}
