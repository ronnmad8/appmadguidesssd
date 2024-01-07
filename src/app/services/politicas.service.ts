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
import { VisitaAssetsModel } from '../models/VisitaAssets.model';
import { TextoquienessomosModel } from '../models/Textoquienessomos.model';
import { TextoayudaModel } from '../models/Textoayuda.model';
import { TextopoliticasModel } from '../models/Textopoliticas.model';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class PoliticasService {
  clang: string = 'es';
  url: string = '';
  apiurl: string;

  textofakehtml: string = '<div id="avisolegal">'+
  '<p>Bienvenido/a a nuestra página web. Este aviso legal establece las condiciones de uso del sitio, así como los derechos y obligaciones que se derivan del acceso y la navegación por la misma. Al acceder a este sitio, usted acepta cumplir con los términos y condiciones aquí establecidos.</p>'+
  '<p>Los contenidos de esta página web, incluyendo textos, imágenes, logotipos, y otros elementos, están protegidos por leyes de propiedad intelectual y derechos de autor. Queda prohibida la reproducción, distribución, o modificación de estos elementos sin el consentimiento previo y por escrito de los titulares de los derechos.</p>'+
  '<p>Aunque nos esforzamos por proporcionar información precisa y actualizada, no garantizamos la exactitud ni la integridad de los contenidos. El uso de la información contenida en este sitio web es responsabilidad exclusiva del usuario. No nos hacemos responsables por daños o perjuicios derivados del acceso o uso de la información aquí presentada. Este aviso legal puede ser modificado en cualquier momento, y recomendamos revisarlo periódicamente para estar al tanto de posibles actualizaciones.</p></div>';
 
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private globalService: GlobalService,
  ) {
    this.apiurl = environment.apiurl;
    this.clang = this.globalService.getLanguage();
  }


  getMessagesPoliticascookies() {
    let endpoint = '/assets/politicascookies';
    this.url = this.apiurl + endpoint;

    // return this.http.get(`${this.url}`).pipe(
    //   map((resp) => {
    //     var messageData: VisitaAssetsModel[] = resp as VisitaAssetsModel[];
    //     return messageData;
    //   }),
    //   catchError((err) => {
    //     console.error('Error  ', err.error);
    //     return err.error;
    //   })
    // );

    var messageData: TextopoliticasModel = new TextopoliticasModel();
    messageData.title = "Políticas de cookies";
    messageData.textohtml = this.textofakehtml;

    ///fake api
    var SubscribeObservable = new Observable((observer) => {
      observer.next(messageData);
    });
    return SubscribeObservable;
   

  }

  
  getMessagesPoliticasprivacidad() {

    let endpoint = '/assets/politicasprivacidad';
    this.url = this.apiurl + endpoint;

    // return this.http.get(`${this.url}`).pipe(
    //   map((resp) => {
    //     var messageData: VisitaAssetsModel[] = resp as VisitaAssetsModel[];
    //     return messageData;
    //   }),
    //   catchError((err) => {
    //     console.error('Error  ', err.error);
    //     return err.error;
    //   })
    // );

    var messageData: TextopoliticasModel = new TextopoliticasModel();
    messageData.title = "Politicas de privacidad";
    messageData.textohtml = this.textofakehtml;
    ///fake api
    var SubscribeObservable = new Observable((observer) => {
      observer.next(messageData);
    });
    return SubscribeObservable;
   
  }


  getMessagesPoliticascompra() {

    let endpoint = '/assets/politicascompra';
    this.url = this.apiurl + endpoint;

    // return this.http.get(`${this.url}`).pipe(
    //   map((resp) => {
    //     var messageData: VisitaAssetsModel[] = resp as VisitaAssetsModel[];
    //     return messageData;
    //   }),
    //   catchError((err) => {
    //     console.error('Error  ', err.error);
    //     return err.error;
    //   })
    // );

    var messageData: TextopoliticasModel = new TextopoliticasModel();
    messageData.title = "Politicas de compra y devolución";
    messageData.textohtml = this.textofakehtml;
    ///fake api
    var SubscribeObservable = new Observable((observer) => {
      observer.next(messageData);
    });
    return SubscribeObservable;
   
  }


  getMessagesAvisolegal() {

    let endpoint = '/assets/avisolegal';
    this.url = this.apiurl + endpoint;

    // return this.http.get(`${this.url}`).pipe(
    //   map((resp) => {
    //     var messageData: VisitaAssetsModel[] = resp as VisitaAssetsModel[];
    //     return messageData;
    //   }),
    //   catchError((err) => {
    //     console.error('Error  ', err.error);
    //     return err.error;
    //   })
    // );

    var messageData: TextopoliticasModel = new TextopoliticasModel();
    messageData.title = "Aviso legal";
    messageData.textohtml = this.textofakehtml;
    ///fake api
    var SubscribeObservable = new Observable((observer) => {
      observer.next(messageData);
    });
    return SubscribeObservable;
   
  }


  getMessagesMedidascovid() {

    let endpoint = '/assets/medidascovid';
    this.url = this.apiurl + endpoint;

    // return this.http.get(`${this.url}`).pipe(
    //   map((resp) => {
    //     var messageData: VisitaAssetsModel[] = resp as VisitaAssetsModel[];
    //     return messageData;
    //   }),
    //   catchError((err) => {
    //     console.error('Error  ', err.error);
    //     return err.error;
    //   })
    // );

    var messageData: TextopoliticasModel = new TextopoliticasModel();
    messageData.title = "Medidas covid-19";
    messageData.textohtml = this.textofakehtml;
    ///fake api
    var SubscribeObservable = new Observable((observer) => {
      observer.next(messageData);
    });
    return SubscribeObservable;
   
  }






  getImages() {

    let endpoint = '/assets/find?file=banner-ficha-de-producto';
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








  

  
  

  

  



