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

  textofakehtml: string = '<div id="lipsum">'+
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet sem nec scelerisque maximus. Donec eget diam augue. Morbi ut nisi ac mauris volutpat bibendum. Etiam hendrerit dapibus enim vel pharetra. Nulla et ultricies velit. Aenean iaculis placerat vulputate. Suspendisse fermentum tempus velit, dignissim aliquam lacus. Sed bibendum facilisis nibh, ac gravida diam convallis sed. Praesent lacinia tellus nec odio faucibus eleifend.</p><p>Praesent sagittis orci id dignissim finibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum metus leo, vulputate ac consequat vitae, finibus vitae magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultricies, est sodales interdum rhoncus, metus risus ornare est, eget efficitur felis ante sit amet diam. Proin ut tortor ultrices, maximus ex vitae, rutrum libero. Proin diam tortor, consequat sed lorem pulvinar, varius hendrerit mauris. Nulla auctor metus eget augue suscipit, vitae mollis nisi porttitor. Pellentesque id neque eleifend, consectetur mauris eget, malesuada lorem.</p>'+
  '<p>Aenean nec urna facilisis tortor porttitor sodales. Cras varius auctor nulla id dignissim. Proin venenatis risus justo, eu tristique magna vehicula in. Cras metus dui, scelerisque eu maximus sit amet, rhoncus in massa. Vivamus sed neque vulputate, venenatis sapien eget, maximus metus. Cras faucibus accumsan sem et lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque eros lorem, fringilla vel finibus nec, faucibus non diam. Mauris aliquet tellus at nulla tristique, non ultricies mauris feugiat. Mauris vel sodales mi, ac sollicitudin nibh. Donec tempor at arcu ut dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi luctus quis risus quis tincidunt.</p>'+
  '<p>Integer vitae laoreet tellus. Nulla pretium leo massa, ac pharetra elit eleifend et. Vestibulum fringilla efficitur odio, sit amet tristique nibh pharetra sed. Proin blandit augue eget augue eleifend aliquam. Vestibulum et posuere nunc. Nunc eu nisl gravida tortor egestas tempus. Mauris molestie orci eget ultricies vehicula. Cras porta, ante vitae tincidunt bibendum, ex felis mattis mauris, nec congue lacus nulla eu augue. Cras dapibus eget sapien et tincidunt. Mauris semper lacus sed dolor ullamcorper elementum et id elit. Ut suscipit porttitor hendrerit. Sed ut lorem diam. Aliquam quis ultrices ante. Mauris tincidunt mattis ex.</p></div>';
 
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
    const headers = this.auth.headers;
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
    const headers = this.auth.headers;

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
    const headers = this.auth.headers;

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
    const headers = this.auth.headers;

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
    const headers = this.auth.headers;

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
    const headers = this.auth.headers;

    let endpoint = '/assets/find?file=banner-ficha-de-producto';
    this.url = this.apiurl + endpoint;

    return this.http.get(`${this.url}`, {headers}).pipe(
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








  

  
  

  

  



