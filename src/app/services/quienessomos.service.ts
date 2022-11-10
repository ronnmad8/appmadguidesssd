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
    const headers = new HttpHeaders ({
      "Content-type": "application/json; charset=UTF-8",
      "Language": this.clang
     });

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
    messageData.message1 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries." ;

    messageData.title2a = "El equipo ";
    messageData.title2b = "Madguides";
    messageData.message2 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries." ;
    messageData.message3 = "“unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.”" ;
    
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








  

  
  

  

  



