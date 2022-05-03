import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AcabadoscoleccionesModel } from '../models/Acabadoscolecciones.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AcabadoscoleccionesService {
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


  crearAcabado( acabadocolecciones: AcabadoscoleccionesModel ) {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/acabados';
    this.url = this.apiurl + endpoint;

    const productoData = {

      articulocolecciones_id: acabadocolecciones.articulocolecciones_id,
      acabados_id: acabadocolecciones.acabados_id,
      orden:  acabadocolecciones.orden,


    };

    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });

    return this.http.post( `${this.url}`, productoData, {headers} )
    .pipe(
      map( res => res as AcabadoscoleccionesModel) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );

  }

  modificarAcabado( acabadocolecciones: AcabadoscoleccionesModel ) {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/acabadoscolecciones/modificar' ;
    this.url = this.apiurl + endpoint;

    const productoData = {
      id: acabadocolecciones.id,
      articulocolecciones_id: acabadocolecciones.articulocolecciones_id,
      acabados_id: acabadocolecciones.acabados_id,
      orden:  acabadocolecciones.orden,

    };

    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    return this.http.post( `${this.url}`, productoData, {headers} )
    .pipe(
      map( res => res as AcabadoscoleccionesModel) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
    
  }


  getListaAcabadoscolecciones() {
    let endpoint =  '/acabados';
    this.url = this.apiurl + endpoint ;
    return this.http.get( `${this.url}` )
    .pipe(
      map( res => res as AcabadoscoleccionesModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );

  }


  getAcabadoscoleccionesFilt(acabados_id :number, articulocolecciones_id :number)  {
    this.userToken = this.auth.leerToken();
    let endpoint = '/acabadoscolecciones/filt' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      acabados_id: acabados_id,
      articulocolecciones_id: articulocolecciones_id
      
    };
    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    return this.http.post( `${this.url}`, filtData, {headers} )
    .pipe(
      map( res => res as AcabadoscoleccionesModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );

  }


  getAcabadoscoleccionesFiltpos(idenlace :number, articulocolecciones_id :number, orden: number, acabados_id: number)  {
    
    let endpoint = '/acabados/filtpos' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      articulocolecciones_id: articulocolecciones_id,
      acabados_id: acabados_id,
      orden: orden
      
    };
    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as AcabadoscoleccionesModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );

  }


  deleteAcabadocolecciones(id) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/acabadoscolecciones/eliminar/' + id ;
    this.url = this.apiurl +  endpoint ;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers }  )
    .pipe(
      map( res => res as AcabadoscoleccionesModel) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    ); 

  }



  



}

