import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlogarticulosModel } from '../models/blogarticulos.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BlogarticulosService {
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


  crearBlogArticulo() {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/blogarticulos/crear';
    this.url = this.apiurl + endpoint;

    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });

    return this.http.post( `${this.url}`, null, {headers} )
    .pipe(
      map( res => res as BlogarticulosModel) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );

  }


  modificarBlogarticulo( imagen: BlogarticulosModel, file1: File, file2: File) {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/blogarticulos/modificar' ;
    this.url = this.apiurl + endpoint;

    var pData: FormData = new FormData();
    pData.append('imagenpc', file1 );
    pData.append('imagenmovil', file2 );

    pData.append('id', imagen.id.toString() );
    pData.append('titulo', imagen.titulo );
    pData.append('subtitulo', imagen.subtitulo );
    pData.append('texto', imagen.texto );
    pData.append('subtexto', imagen.subtexto );
    pData.append('altimagen', imagen.altimagen );
    pData.append('meta', imagen.meta );
    pData.append('categorias_id', imagen.categorias_id );
    if(file1 != null){
      pData.append('nombreimagenpc', file1.name );
    }
    if(file2 != null){
      pData.append('nombreimagenmovil', file2.name );
    }
    
    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    return this.http.post( `${this.url}`, pData, {headers} )
    .pipe(
      map( res => res as BlogarticulosModel) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }
   

  getListablogarticulos() {

    let endpoint =  '/blogarticulos';
    this.url = this.apiurl + endpoint ;

    return this.http.get( `${this.url}`  )
    .pipe(
      map( res => res as BlogarticulosModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
        return err.error;
      })
    );

  }


  getBlogarticulo(id) {

    let endpoint =  '/blogdetalle/'+id;
    this.url = this.apiurl + endpoint ;

    return this.http.get( `${this.url}`  )
    .pipe(
      map( res => res as BlogarticulosModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
        return err.error;
      })
    );

  }

  getBlogarticuloshome() {

    let endpoint =  '/blogarticulos/home';
    this.url = this.apiurl + endpoint ;
    return this.http.get( `${this.url}`)
    .pipe(
      map( res => res as BlogarticulosModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );

  }


  getblogarticulosFilt(idcategoria :number, year :number, month: number)  {

    let endpoint = '/blogarticulos/filt' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      categorias_id: idcategoria,
      month: month,
      year: year
      
    };
    
    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as BlogarticulosModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }

  getblogarticulosFiltadmin(nombre :string, idcategoria :string, fechai :string, fechaf: string)  {
    const headers = new HttpHeaders ({
      'Authorization': this.auth.leerToken()
    });
    let endpoint = '/blogarticulos/filtadmin' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      id: idcategoria,
      nombre: nombre,
      fechaini: fechai,
      fechafin: fechaf
      
    };
    
    return this.http.post( `${this.url}`, filtData, {headers} )
    .pipe(
      map( res => res as BlogarticulosModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );

  }


  deleteBlogarticulo(id) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/blogarticulos/eliminar/' + id ;
    this.url = this.apiurl +  endpoint ;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers }  )
    .pipe(
      map( res => res as BlogarticulosModel) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );

  }





  

  



}

