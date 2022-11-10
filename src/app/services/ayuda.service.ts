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
import { VisitaAssetsModel } from '../models/VisitaAssets.model';
import { TextoquienessomosModel } from '../models/Textoquienessomos.model';
import { TextoayudaModel } from '../models/Textoayuda.model';


@Injectable({
  providedIn: 'root'
})
export class AyudaService {
  userToken: string = "";
  url: string = '';
  apiurl: string;
  clang: string;
 
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


  getMessages() {
    const headers = this.auth.headers;
    
    let endpoint = '/assets/ayuda';

    this.url = this.apiurl + endpoint;

    // return this.http.get(`${this.url}`, {headers}).pipe(
    //   map((resp) => {
    //     var messageData: VisitaAssetsModel[] = resp as VisitaAssetsModel[];
    //     return messageData;
    //   }),
    //   catchError((err) => {
    //     console.error('Error  ', err.error);
    //     return err.error;
    //   })
    // );

    var messageData: TextoayudaModel = new TextoayudaModel();
    messageData.title1 = "Preguntas frecuentes";
    messageData.message1 = "A continuación encontrarás las preguntas más frecuentes que nos realizan nuestros clientes." ;

    messageData.question1 = "¿Lorem Ipsum is simply dummy text of the printing typesetting indus?";
    messageData.response1 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took";
    messageData.question2 = "¿Lorem Ipsum is simply dummy text of the printing typesetting indus?";
    messageData.response2 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took";
    messageData.question3 = "¿Lorem Ipsum is simply dummy text of the printing typesetting indus?";
    messageData.response3 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took";
    messageData.question4 = "¿Lorem Ipsum is simply dummy text of the printing typesetting indus?";
    messageData.response4 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took";
    messageData.question5 = "¿Lorem Ipsum is simply dummy text of the printing typesetting indus?";
    messageData.response5 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took";

    messageData.noencuentras = "¿No encuentras lo que buscas?";
    messageData.whatsapp = "Escríbenos un WhatsApp (656786524)";
    messageData.telefono = "Llámanos al 91 7896745";
    messageData.escribenos = "Escríbenos a info@madguides.es";
    messageData.formulario = "o a traves de nuestro formulario web";
    
    
    ///fake api
    var SubscribeObservable = new Observable((observer) => {
      observer.next(messageData);
    });
    return SubscribeObservable;
   

  }


  getImages() {
    const headers = this.auth.headers;

    let endpoint = '/assets/find?file=bannerbottom, banner-ficha-de-producto';
    this.url = this.apiurl + endpoint;

    return this.http.get(`${this.url}`).pipe(
      map((resp) => {
        var imageData: ImagenesModel[] = resp as ImagenesModel[];
        return imageData;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }

  


  

  }








  

  
  

  

  



