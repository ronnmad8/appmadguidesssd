import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  userToken: string = "";
  idUsuario: string = "";
  url: string = "";
  apiurl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
  }


  

  modificarImagen( imagen: ImagenesModel, file1: File, file2: File ) {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/imagenes/modificar' ;
    this.url = this.apiurl + endpoint;

    var pData: FormData = new FormData();
    pData.append('imagepc', file1 );
    pData.append('imagemovil', file2 );
    pData.append('id', imagen.id.toString() );
    pData.append('nombre', imagen.nombre );
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
      map( res => res as ImagenesModel) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
    
  }


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

    this.userToken = this.auth.leerToken();
    let endpoint = '/imagenes/filtadmin' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      id: idenlace,
      id2: idtipo,
      fechaini: fechaini,
      fechafin: fechafin
      
    };
    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    return this.http.post( `${this.url}`, filtData, { headers } )
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
    this.userToken = this.auth.leerToken();
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


  getImagenBanner(idenlace :string)  {
    
    let endpoint = '/imagenes/filtpos' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      tipos_id: 1,
      posicion: 1 
      
    };
  
    let im = new ImagenesModel();

    
    im.rutapc = "assets/images/sinimagen.png";
    if(idenlace == "1"){
      im.rutapc = "assets/images/banner-home.jpg";
      im.rutamovil = "assets/images/banner-home.jpg";
      im.tipo_id = 1;
      im.nombre = "imagenbanner";
    
    }
    if(idenlace == "2"){
      im.rutapc = "assets/images/banner-ficha-de-producto.jpg";
      im.rutamovil = "assets/images/banner-ficha-de-producto.jpg";
      im.tipo_id = 1;
      im.nombre = "imagenbanner";
    
    }

    return im;

    // return this.http.post( `${this.url}`, filtData )
    // .pipe(
    //   map( res => res as ImagenesModel[]) ,
    //   catchError((err) => {
    //     console.error("Error  " , err.error);
    //             return err.error;
    //   })
    // );

  }

  


  

  uploadFile( id: string, filetoupload: File ) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/imagenes/imagen/' ;
    this.url = this.apiurl +  endpoint ;

    var formData: FormData = new FormData();
    formData.append('image', filetoupload, filetoupload.name);
    formData.append('id', id);

    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.post( `${this.url}`, formData , { headers }  )
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

