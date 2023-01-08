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
import { HomerespModel } from '../models/Homeresp.model';
import { ComentariosModel } from '../models/Cometarios.model';
import { TextosModel } from '../models/Textos.model';
import { MessagesModel } from '../models/Messages.model';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { ResultadoModel } from '../models/Resultado.model';
import { MessagesFormModel} from '../models/MessageseForm.model';
import { MessagesImageModel} from '../models/MessagesImage.model';
import { utf8Encode } from '@angular/compiler/src/util';
import { TextotourModel } from '../models/Textotour.model';
import { TextoiconsModel } from '../models/Textoicons.model';
import { TextorecomendadasModel } from '../models/Textorecomendadas.model';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  clang: string = 'es';
  userToken: string = "";
  idUsuario: string = "";
  url: string = "";
  apiurl: string;
  dataresultado: any;
  headers: any;

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



  getRecomendadasHome()  {
     
      let endpoint = '/home?recommended' ;
      this.url = this.apiurl + endpoint ;
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var recomendadas: VisitasResultadoModel[] = [];
          var homeresp :HomerespModel = resp as HomerespModel;
          recomendadas = homeresp.recommended as VisitasResultadoModel[];
          
          ///correccion TIMES lista o unico
          recomendadas.forEach((el: any, index: number) => {
            if(el.visit_time_uuid != null && el.visit_time == null){
              el = this.globalService.mapperVisitas(el);
            }
          });
          return recomendadas;
        }),
        catchError((err) => {
          console.error("Error  " , err.error);
          return err.error;
        })
      );
    }
    
  
    getCommentsHome()  {

      let endpoint = '/home?comments' ;
      this.url = this.apiurl + endpoint ;
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

      let endpoint = '/assets/find?file=bannerbottom,bannertop,logo' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}`)
      .pipe(
        map( resp =>{
          let data: ImagenesModel[] = resp as ImagenesModel[];
          return data;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getMessagesHome()  {

      let endpoint = '/home?messages' ;
      this.url = this.apiurl + endpoint ;
  
      return this.http.get( `${this.url}`)
      .pipe(
        map( resp =>{
          var homeresp :HomerespModel = resp as HomerespModel;  
          var data = homeresp.messages;
      
          return data;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getMessagesContacto()  {

      let endpoint = '/assets/form?' ;
      this.url = this.apiurl + endpoint;

      return this.http.get( `${this.url}`)
      .pipe(
        map( resp =>{
          var data = resp as MessagesModel;  
          return data;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getMessagesTour()  {

      let endpoint = '/assets/home/tour?' ;
      this.url = this.apiurl + endpoint ;
  
      return this.http.get( `${this.url}`)
      .pipe(
        map( resp =>{
          var data = resp as TextotourModel;  
          return data;   
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getMessagesIcons()  {

      let endpoint = '/assets/home/tour/icons?' ;
      this.url = this.apiurl + endpoint ;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var data = resp as TextoiconsModel;  
          return data;   
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getMessagesOpinions()  {

      let endpoint = '/assets/home/opinions?' ;
      this.url = this.apiurl + endpoint ;
  
      return this.http.get( `${this.url}`)
      .pipe(
        map( resp =>{
          var data = resp as TextotourModel;  
          return data;   
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getMessagesRecomendadas()  {

      let endpoint = '/assets/home/visit?' ;
      this.url = this.apiurl + endpoint ;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var data = resp as TextorecomendadasModel;  
          return data;   
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getMessagesForm()  {

      let endpoint = '/assets/home/form?' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}`)
      .pipe(
        map( resp =>{
          var data = resp as MessagesFormModel;  
          return data;   
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getMessagesImage()  {

      let endpoint = '/assets/home/image?' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}`)
      .pipe(
        map( resp =>{
          var data = resp as MessagesImageModel; 
          return data;   
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getCajaBuscaHome(busqueda:string){

      let endpoint = '/visit?per_page=5&title='+busqueda.trim() ; 
      this.url = this.apiurl + endpoint;
      return this.http.get( `${this.url}`)
      .pipe(
        map( resp =>{
          var data = resp as ResultadoModel;
          return  data;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }



  



}