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
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class QuienessomosService {
  clang: string = 'es';
  url: string = '';
  apiurl: string;
 
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private globalService: GlobalService,
  ) {
    this.apiurl = environment.apiurl;
    this.clang = this.globalService.getLanguage();
  }


  getMessages() {

    let endpoint = '/assets/quienessomos';
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

    var messageData: TextoquienessomosModel = new TextoquienessomosModel();
    messageData.title1 = "Quienes Somos";
    messageData.message1 = "Cooperativa formada sólo por guías oficiales de turismo. A bordo treinta socios y socias" ;

    messageData.title2a = "El equipo ";
    messageData.title2b = "Madguides";
    messageData.message2 = "Somos apasionadas de nuestra ciudad, su historia, su cultura y la vida de sus calle son nuestra herramienta de trabajo. Contamos sus leyendas, mitos y secretos." ;
    messageData.message3 = "Hablamos de Madrid en ocho idiomas español inglés, francés, portugués, italiano, alemán, griego y polaco."
    + "Calidad, profesionalidad y grupos reducidos.";
    messageData.message4 = "Despertamos tu curiosidad no sólo por los museos sino también por la gran oferta culinaria y de ocio de los madriles."
    messageData.message5 = "Elige bien quién te guía" ;
    
    ///fake api
    var SubscribeObservable = new Observable((observer) => {
      observer.next(messageData);
    });
    return SubscribeObservable;
   

  }


  getImages() {

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








  

  
  

  

  



