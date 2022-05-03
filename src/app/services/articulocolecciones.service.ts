import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticulocoleccionesModel } from '../models/articulocolecciones.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AcabadoscoleccionesModel } from '../models/acabadoscolecciones.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ArticulocoleccionesService {
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


  crearArticulocolecciones( articulocolecciones: ArticulocoleccionesModel ) {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/articulocolecciones';
    this.url = this.apiurl + endpoint;

    const pData = {

      colecciones_id:  articulocolecciones.colecciones_id,
      rutabase: articulocolecciones.rutabase

    };
    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });

    return this.http.post( `${this.url}`, pData, {headers} )
    .pipe(
      map( res => res as ArticulocoleccionesModel) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );

  }


  modificararticulo( articulocolecciones: ArticulocoleccionesModel, file1: File ) {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/articulocolecciones/modificar' ;
    this.url = this.apiurl + endpoint;

    var pData: FormData = new FormData();
    pData.append('imagen', file1 );
    let lid = articulocolecciones.id.toString();

    pData.append('id', lid );
    pData.append('nombre', articulocolecciones.nombre );
    pData.append('precio', articulocolecciones.precio );
    pData.append('dimensiones', articulocolecciones.dimensiones );
    pData.append('rutaimagen', articulocolecciones.rutaimagen );
    pData.append('acabadostouch', ""+ articulocolecciones.acabadostouch );

    if(file1 != null){
      pData.append('nombreimagen', file1.name );
    }

    //crear acabadoscolecciones con los datos de acabados articulocolecciones.articulosacabados1
    var orden1 = 1;
    var listaarsacabs1: AcabadoscoleccionesModel[] = [];
    if(articulocolecciones.articulosacabados1 != null){

      articulocolecciones.articulosacabados1.forEach((el)=>{
        let arsacabs1 = new AcabadoscoleccionesModel;
        arsacabs1.acabados_id = el.id;
        arsacabs1.orden = orden1;
        orden1++;
        listaarsacabs1.push(arsacabs1);
      })
      pData.append('articulosacabados1',  JSON.stringify(listaarsacabs1) );
    }

    //crear acabadoscolecciones con los daos de acabados articulocolecciones.articulosacabados2
    var orden2 = 1;
    var listaarsacabs2: AcabadoscoleccionesModel[] = [];
    if(articulocolecciones.articulosacabados1 != null){
    articulocolecciones.articulosacabados2.forEach((el)=>{
      let arsacabs2 = new AcabadoscoleccionesModel;
      arsacabs2.acabados_id = el.id;
      arsacabs2.orden = orden2;
      orden2++;
      listaarsacabs2.push(arsacabs2);
    })
    pData.append('articulosacabados2',  JSON.stringify(listaarsacabs2) );
    }

    //crear acabadoscolecciones con los daos de acabados articulocolecciones.articulosacabados3
    var orden3 = 1;
    var listaarsacabs3: AcabadoscoleccionesModel[] = [];
    if(articulocolecciones.articulosacabados1 != null){
    articulocolecciones.articulosacabados3.forEach((el)=>{
      let arsacabs3 = new AcabadoscoleccionesModel;
      arsacabs3.acabados_id = el.id;
      arsacabs3.orden = orden3;
      orden3++;
      listaarsacabs3.push(arsacabs3);
    })
    pData.append('articulosacabados3',  JSON.stringify(listaarsacabs3) );
    }

    if(file1 != null){
      pData.append('imagen', file1.name );
    }

    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });

    return this.http.post( `${this.url}`, pData, {headers} )
    .pipe(
      map( res => res as ArticulocoleccionesModel) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }


  getListaarticulocolecciones() {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/articulocolecciones';
    this.url = this.apiurl + endpoint ;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers }  )
    .pipe(
      map( res => res as ArticulocoleccionesModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }



  getarticulocoleccionesFiltadmin(idcoleccion: number, nombre: string , fechaini: string, fechafin: string)  {
    this.userToken = this.auth.leerToken();
    let endpoint = '/articulocolecciones/filtadmin' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      id: idcoleccion,
      nombre: nombre,
      fechaini: fechaini,
      fechafin: fechafin

    };
    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    
    return this.http.post( `${this.url}`, filtData, { headers } )
    .pipe(
      map( res => res as ArticulocoleccionesModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }


  getarticulocoleccionesGallery(idcoleccion :number)  {

    let endpoint = '/articulocolecciones/gallery' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      id: idcoleccion,
    };

    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as ArticulocoleccionesModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );

  }


  deletearticulo(id) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/articulocolecciones/eliminar/' + id ;
    this.url = this.apiurl +  endpoint ;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers }  )
    .pipe(
      map( res => res as ArticulocoleccionesModel) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );

  }








}

