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
import { RecomendadasModel } from '../models/Recomendadas.model';
import { HomerespModel } from '../models/Homeresp.model';
import { ComentariosModel } from '../models/Cometarios.model';
import { TextosModel } from '../models/Textos.model';
import { MessagesModel } from '../models/Messages.model';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { ResultadoModel } from '../models/Resultado.model';
import { MessagesFormModel} from '../models/MessageseForm.model';
import { MessagesImageModel} from '../models/MessagesImage.model';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  userToken: string = "";
  idUsuario: string = "";
  url: string = "";
  apiurl: string;
  dataresultado: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  getDataHome()  {
    
    let endpoint = '/home' ;
    this.url = this.apiurl + endpoint;

    return this.http.get( `${this.url}` )
    .pipe(
      map( res =>{
        return res;
      } ) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////


  


  getRecomendadasHome()  {
      let endpoint = '/home?recommended' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var recomendadas:RecomendadasModel[] = [];
          var homeresp :HomerespModel = resp as HomerespModel;
          var recomendadasData: VisitasModel[] = homeresp.recommended as VisitasModel[]; 
          console.log("rd ",recomendadasData);
          recomendadasData.forEach((el: any, index: number) => {
            var recomendado: RecomendadasModel = new RecomendadasModel();
            recomendado.id = index;
            recomendado.min = el.min ?? 0;
            recomendado.max = el.max ?? 0;
            recomendado.uuid = el.uuid ?? "";
            recomendado.time_init = el.time_init ?? "";
            recomendado.date= el.time_date ?? "";
            recomendado.precio = el.precio ?? "";
            recomendado.iso= el.iso ?? "";
            recomendado.duration = el.duration ?? "";
            recomendado.visit_uuid = el.visit_uuid ?? "";
            recomendado.visit_refundable = el.visit_refundable ?? "";
            recomendado.visit_privada = el.visit_privada ?? "";
            recomendado.visit_temporada = el.visit_temporada ?? "";
            recomendado.visit_accesibility = el.visit_accesibility ?? "";
            recomendado.visit_iso = el.visit_iso ?? "";
            recomendado.visit_uuid = el.visit_uuid ?? "";
            recomendado.visit_title = el.visit_title ?? "";
            recomendado.visit_description = el.visit_description ?? "";
            recomendado.visit_metadata = el.visit_metadata ?? "";
            recomendado.visit_image_uuid = el.visit_image_uuid ?? "";
            recomendado.visit_image_url= el.visit_image_url ?? "";
            recomendado.visit_image_url_movil = el.visit_image_url_movil ?? "";
            recomendado.visit_image_url_gallery = el.visit_image_url_gallery ?? "";
            recomendado.visit_image_name = el.visit_image_name ?? "";
            recomendado.visit_image_iso = el.visit_image_iso ?? "";
            recomendado.visit_image_title = el.visit_image_title ?? "";
            recomendado.visit_image_description = el.visit_image_description ?? "";
            recomendado.recommended = el.recommended ?? "";
            recomendado.category_uuid = el.category_uuid ?? "";
            recomendado.category_iso = el.category_iso ?? "";
            recomendado.category_title = el.category_title ?? "";
            recomendado.category_description = el.category_description ?? "";
            recomendado.category_parent_uuid = el.category_parent_uuid ?? "";
            recomendado.category_parent_iso = el.category_parent_iso ?? "";
            recomendado.category_title = el.category_title ?? "";
            recomendado.category_parent_description = el.category_parent_description ?? "";
            
           recomendadas.push(recomendado);
        });
        return recomendadas;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }
    
  


    getCommentsHome()  {
      let endpoint = '/home?comments' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
    
          var comments: ComentariosModel[] = [];
          var homeresp :HomerespModel = resp as HomerespModel;
          var comentariosData = homeresp.comments; 
          comentariosData.forEach((el: any, index: number) => {
          var comentario: ComentariosModel = new ComentariosModel();
          comentario.id = index;
          comentario.uuid = el.uuid ?? "";
          comentario.name = el.name ?? "";
          comentario.image = el.image ?? "";
          comentario.lang_iso = el.lang_iso ?? "";
          comentario.lang_title = el.lang_title ?? "";
          comentario.lang_description = el.lang_description ?? "";
          comentario.lang_uuid = el.lang_uuid ?? "";
          comentario.visit_uuid = el.visit_uuid ?? "";
          comentario.visit_refundable = el.visit_refundable ?? "";
          comentario.visit_temporada = el.visit_temporada ?? "";
          comentario.visit_image_uuid = el.visit_image_uuid ?? "";
          comentario.visit_image_url = el.visit_image_url ?? "";
          comentario.visit_image_url_movil = el.visit_image_url_movil ?? "";
          comentario.visit_image_url_gallery = el.visit_image_url_gallery ?? "";
          comentario.visit_image_name = el.visit_image_name ?? "";
          comentario.visit_lang_iso = el.visit_lang_iso ?? "";
          comentario.visit_lang_title = el.visit_lang_title ?? "";
          comentario.visit_lang_description = el.visit_lang_description ?? "";
          comentario.visit_lang_uuid = el.visit_lang_uuid ?? "";
          comentario.visit_lang_metadata = el.visit_lang_metadata ?? "";

          comments.push(comentario);
        });

        return comments;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }



    getImagenesHome()  {
      let endpoint = '/home?images' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var imagenes: ImagenesModel[] = [];
          var homeresp :HomerespModel = resp as HomerespModel;
          var imagesData = homeresp.images; 
          imagesData.forEach((el: any, index: number) => {
          var imagen: ImagenesModel = new ImagenesModel();
          imagen.id = index;
          imagen.name = el.name ?? "";
          imagen.url = el.url ?? "";
          imagen.url_movil = el.url_movil ?? "";
          imagen.url_galleria = el.url_galleria ?? "";

          imagenes.push(imagen);
        });

        return imagenes;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }



    getMessagesHome()  {
      let endpoint = '/home?messages' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var homeresp :HomerespModel = resp as HomerespModel;  
          var messageData = homeresp.messages;
      
          return messageData;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }

    getMessagesContacto()  {
      let endpoint = '/assets/form' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var messageData = resp as MessagesModel;  
          return messageData;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }

    getMessagesSeacrh()  {
      let endpoint = '/assets/search' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var messageData = resp as MessagesModel;  
          return messageData;   
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getMessagesForm()  {
      let endpoint = '/assets/home/form' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var messageData = resp as MessagesFormModel;  
          return messageData;   
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }

    getMessagesImage()  {
      let endpoint = '/assets/home/image' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var messageImageData = resp as MessagesImageModel; 
          return messageImageData;   
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getCajaBuscaHome(busqueda:string){
      let endpoint = '/visit?title='+busqueda.trim()+'&per_page=5'; ;
      this.url = this.apiurl + endpoint;
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var visitas = resp as ResultadoModel;
          return  visitas;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }



  
  



}