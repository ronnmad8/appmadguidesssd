import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesgaleriaModel } from '../models/Imagenesgaleria.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ImagenesgaleriaService {
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


  crearImagengaleria( imagen: ImagenesgaleriaModel ) {
  
    this.userToken = this.auth.leerToken();
    let endpoint =  '/imagenesgaleria/' ;
    this.url = this.apiurl + endpoint

    const pData = {
      tipos_id: imagen.tipos_id,
      rutabase: imagen.rutabase,
      enlaces_id: imagen.enlaces_id
    };
    
    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    
    return this.http.post( `${this.url}`, pData, {headers} )
    .pipe(
      map( res => res as ImagenesgaleriaModel) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
    
  }


  modificarImagengaleria( imagen: ImagenesgaleriaModel, file1: File, file2: File ) {
  
    this.userToken = this.auth.leerToken();
    let endpoint =  '/imagenesgaleria/modificar' ;
    this.url = this.apiurl + endpoint;

    var pData: FormData = new FormData();
    pData.append('imagepc', file1 );
    pData.append('imagemovil', file2 );
    pData.append('id', imagen.id.toString() );
    pData.append('nombre', imagen.nombre );
    pData.append('observaciones', imagen.observaciones );
    pData.append('descripcion', imagen.descripcion );
    pData.append('rutapc', imagen.rutapc );
    pData.append('rutamovil', imagen.rutamovil );
    if(file1 != null){
      pData.append('nombreimagepc', file1.name );
    }
    if(file2 != null){
      pData.append('nombreimagemovil', file2.name );
    }
    
    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    return this.http.post( `${this.url}`, pData, {headers} )
    .pipe(
      map( res => res as ImagenesgaleriaModel) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }


  getListaImagenesgaleria() {
    let endpoint =  '/imagenesgaleria';
    this.url = this.apiurl + endpoint ;
    return this.http.get( `${this.url}` )
    .pipe(
      map( res => res as ImagenesgaleriaModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }


  getImagenesgaleriaFilt(idenlace :number, idtipo :number)  {
    
    let endpoint = '/imagenesgaleria/filt' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      tipos_id: idtipo
    };
    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as ImagenesgaleriaModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }


  getImagenesgaleriaFiltAdmin(idenlace :number, nombre: string, fechaini: string, fechafin: string)  {

    this.userToken = this.auth.leerToken();
    let endpoint = '/imagenesgaleria/filtadmin' ;
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
      map( res => res as ImagenesgaleriaModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }




  getImagenesgaleriaFiltpos(idenlace :number, idtipo :number, posicion: number)  {
    this.userToken = this.auth.leerToken();
    let endpoint = '/imagenesgaleria/filtpos' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      tipos_id: idtipo,
      posicion: posicion 
      
    };
    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as ImagenesgaleriaModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }


  deleteImagengaleria(id) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/imagenesgaleria/eliminar/' + id ;
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

  



}

