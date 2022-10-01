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
import { EventsrespModel } from '../models/Eventsresp.model';


@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
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




  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  getDataBuscador()  {
    
    let endpoint = '/events' ;
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


  getVisitasBuscador( )  {
    let endpoint = '/events' ;
    this.url = this.apiurl + endpoint;

    //filters
    // if(price != 0){
    //   this.url += "&price=" + price;
    // }
    // if(duration != 0){
    //   this.url += "&duration=" + duration;
    // }

    return this.http.get( `${this.url}` )
    .pipe(
      map( resp =>{
  
        var visitas: VisitasModel[] = [];
        var eventsresp :EventsrespModel = resp as EventsrespModel;
        var visitasData = eventsresp.data; 
        visitasData.forEach((el: any, index: number) => {

        var visita: VisitasModel = new VisitasModel();
        visita.id = index;
        visita.min = el.min ?? 0;
        visita.max = el.max ?? 0;
        visita.title = el.visit.visit.language[0].title ?? "";
        visita.description = el.visit.visit.language[0].description ?? "";
        visita.uuid = el.uuid ?? "";
        visita.metadata=  el.visit.visit.metadata ?? "";
        visita.refundable = el.visit.visit.refundable ?? "";
        visita.iso= el.visit.visit.language[0].iso ?? "";
        visita.category_parent_title= el.visit.visit.category[0].category.parent.language[0].title ?? "";
        visita.category_parent_description= el.visit.visit.category[0].category.parent.language[0].description ?? "";
        visita.category_title= el.visit.visit.category[0].category.language[0].title ?? "";
        visita.category_description= el.visit.visit.category[0].category.language[0].description ?? "";
        visita.image_uuid= el.visit.visit.image.uuid ?? "";
        visita.url= el.visit.visit.image.url ?? "";
        visita.url_movil= el.visit.visit.image.url_movil ?? "";
        visita.url_gallery= el.visit.visit.image.url_gallery ?? "";
        visita.image_name= el.visit.visit.image.image_name ?? "";
        visita.image_alt= el.visit.visit.image.image_alt ?? "";
        visita.image_title= el.visit.visit.image.language[0].title ?? "";
        visita.image_description= el.visit.visit.image.language[0].description ?? "";
        visita.price = el.visit.visit.price.price ?? "";
        visita.time_init = el.time.time.time_init ?? "";
        visita.time_end = el.time.time.time_end ?? "";
        visita.time_date= el.time.time.time_date ?? "";
        visita.duration = el.time.time.duration ?? "";
      
        visitas.push(visita);
      });

      return visitas;    
      } ) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }

  


  getImagenesBuscador()  {
    let endpoint = '/events?images' ;
    this.url = this.apiurl + endpoint;

    return this.http.get( `${this.url}` )
    .pipe(
      map( resp =>{
        var imagenes: ImagenesModel[] = [];
        var eventsresp :EventsrespModel = resp as EventsrespModel;
        var imagesData = eventsresp.data  ; 
        imagesData.forEach((el: any, index: number) => {
        var imagen: ImagenesModel = new ImagenesModel();
        imagen.id = index;
        // imagen.title = el.image.language[0].title ?? "";
        // imagen.description = el.image.language[0].description ?? "";
        // imagen.alt = el.image.language[0].alt ?? "";
        // imagen.iso = el.image.language[0].iso ?? "";
        // imagen.uuid = el.image.uuid ?? "";
        // imagen.url = el.image.url ?? "";
        // imagen.url_movil = el.image.url_movil ?? "";
        // imagen.url_gallery = el.image.url_gallery ?? "";
        // imagen.image_name = el.image.image_name ?? "";
        
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


  getTextosBucador()  {
    let endpoint = '/home?messages' ;
    this.url = this.apiurl + endpoint;

    return this.http.get( `${this.url}` )
    .pipe(
      map( resp =>{
        var eventsresp :EventsrespModel = resp as EventsrespModel;  
        
        return eventsresp.data;    
      } ) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }





  // getVisitasBuscador()  {
    
  //   let endpoint = '/visitas/Buscador' ;
  //   this.url = this.apiurl + endpoint;

  //   /////////pruebas
  //   let visitas: VisitasModel[] = [];
  //   let visitaTest: VisitasModel = new VisitasModel();
  //   visitaTest.url = "assets/images/imagenVisita.jpg";
  //   visitaTest.url_movil = "assets/images/imagenVisita.jpg";
  //   visitaTest.price = 23;
  //   visitaTest.duration = 2;
  //   visitaTest.title = "Visita a Madrid";
  //   visitaTest.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    
  //   visitaTest.idiomas = ["Español", "Inglés, Italiano", "Portugués","Alemán"] ;
    
  //   visitas.push(visitaTest);
  //   visitas.push(visitaTest);
  //   visitas.push(visitaTest);
  //   visitas.push(visitaTest);
  //   visitas.push(visitaTest);
  //   visitas.push(visitaTest);
  //   visitas.push(visitaTest);
  //   visitas.push(visitaTest);
  //   visitas.push(visitaTest);
  //   visitas.push(visitaTest);

  //   return visitas;


  //   // return this.http.get( `${this.url}` )
  //   // .pipe(
  //   //   map( res => res as ImagenesModel[]) ,
  //   //   catchError((err) => {
  //   //     console.error("Error  " , err.error);
  //   //             return err.error;
  //   //   })
  //   // );

  // }



  
  


  

  

  



}

