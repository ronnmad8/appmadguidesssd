import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  userToken: string = "";
  idUsuario: string = "";
  url: string = "";
  apiurl: string;
  clang: string = "";

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
    this.clang = this.globalService.getLanguage();
  }


  

  // modificarImagen( imagen: ImagenesModel, file1: File, file2: File ) {
  //   this.userToken = this.auth.leerToken();
  //   let endpoint =  '/imagenes/modificar' ;
  //   this.url = this.apiurl + endpoint;

  //   var pData: FormData = new FormData();
  //   pData.append('imagepc', file1 );
  //   pData.append('imagemovil', file2 );
  //   pData.append('id', imagen.id.toString() );
  //   pData.append('nombre', imagen.nombre );
  //   pData.append('rutapc', imagen.rutapc );
  //   pData.append('rutamovil', imagen.rutamovil );
  //   if(file1 != null){
  //     pData.append('nombreimagepc', file1.name );
  //   }
  //   if(file2 != null){
  //     pData.append('nombreimagemovil', file2.name );
  //   }
    
  //   const headers = new HttpHeaders ({
  //     'Authorization': this.userToken
  //   });
  //   return this.http.post( `${this.url}`, pData )
  //   .pipe(
  //     map( res => res as ImagenesModel) ,
  //     catchError((err) => {
  //       console.error("Error  " , err.error);
  //               return err.error;
  //     })
  //   );
    
  // }


  getListaImagenes() {

    let endpoint =  '/imagenes';
    this.url = this.apiurl + endpoint ;
    return this.http.get( `${this.url}` )
    .pipe(
      map( res => res as ImagenesModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }


  getImagenesFilt(idenlace :number, idtipo :number)  {

    let endpoint = '/imagenes/filt' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      tipos_id: idtipo
      
    };
    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as ImagenesModel[]) ,
      catchError((err) => {
        console.error("Error  ", err.error);
        // if(err.includes("Unauthorized")){
        //   this.router.navigateByUrl("/homecliente");
        // }
        return err.error;
      })
    );

  }


  getImagenesFiltAdmin(idenlace :number, idtipo: number, fechaini: string, fechafin: string)  {

    let endpoint = '/imagenes/filtadmin' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      id: idenlace,
      id2: idtipo,
      fechaini: fechaini,
      fechafin: fechafin
      
    };

    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as ImagenesModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }


  getBanner(idenlace :number, idtipo :number)  {

    let endpoint = '/imagenes/bannershome' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      tipos_id: idtipo
    };

    return "https://madguides.es/assets/images/banner-home.jpg";

    // return this.http.post( `${this.url}`, filtData )
    // .pipe(
    //   map( res => res as ImagenesModel[]) ,
    //   catchError((err) => {
    //     console.error("Error  " , err.error);
    //             return err.error;
    //   })
    // );

  }


  getColeccioneshome(idenlace :number, idtipo :number)  {

    let endpoint = '/imagenes/coleccioneshome' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      tipos_id: idtipo
      
    };
    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as ImagenesModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }



  getImagenesFiltpos(idenlace :number, idtipo :number, posicion: number)  {

    let endpoint = '/imagenes/filtpos' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      tipos_id: idtipo,
      posicion: posicion 
      
    };
    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as ImagenesModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }


  
  


  

  uploadFile( id: string, filetoupload: File ) {

    let endpoint = '/imagenes/imagen/' ;
    this.url = this.apiurl +  endpoint ;

    var formData: FormData = new FormData();
    formData.append('image', filetoupload, filetoupload.name);
    formData.append('id', id);

    return this.http.post( `${this.url}`, formData )
    .pipe(
      catchError(err => {
      console.error('Error  ' , err.error);
      if(err.includes("Unauthorized")){
        this.router.navigateByUrl("/homecliente");
      }
      return err.error;
    }));

  }

  



}

