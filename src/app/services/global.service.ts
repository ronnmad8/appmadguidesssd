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


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
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


  



  getVisitascarrito()  {
    
    let endpoint = '/visitas/carrito' ;
    this.url = this.apiurl + endpoint;
    
    /////////pruebas
    let visitas: VisitasModel[] = [];
    let visitaTest1: VisitasModel = new VisitasModel();
    visitaTest1.url = "assets/images/imagenVisita.jpg";
    visitaTest1.url_movil = "assets/images/imagenVisita.jpg";
    visitaTest1.price = 23;
    visitaTest1.duration = 2;
    visitaTest1.title = "Visita a Madrid";
    visitaTest1.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest1.id = 1;
    visitas.push(visitaTest1);
    
    let visitaTest2: VisitasModel = new VisitasModel();
    visitaTest2.url = "assets/images/imagenVisita.jpg";
    visitaTest2.url_movil = "assets/images/imagenVisita.jpg";
    visitaTest2.price = 23;
    visitaTest2.duration = 2;
    visitaTest2.title = "Visita a Madrid";
    visitaTest2.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest2.id = 2;
    visitas.push(visitaTest2);

    let visitaTest3: VisitasModel = new VisitasModel();
    visitaTest3.url = "assets/images/imagenVisita.jpg";
    visitaTest3.url_movil = "assets/images/imagenVisita.jpg";
    visitaTest3.price = 33;
    visitaTest3.duration = 3;
    visitaTest3.title = "Visita a Madrid";
    visitaTest3.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest3.id = 3;
    visitas.push(visitaTest3);

    return visitas;


    // return this.http.get( `${this.url}` )
    // .pipe(
    //   map( res => res as ImagenesModel[]) ,
    //   catchError((err) => {
    //     console.error("Error  " , err.error);
    //             return err.error;
    //   })
    // );

  }

  getVisitasprop()  {
    
    let endpoint = '/visitas/carrito/propuestas' ;
    this.url = this.apiurl + endpoint;
    
    /////////pruebas
    let visitas: VisitasModel[] = [];
    let visitaTest1: VisitasModel = new VisitasModel();
    visitaTest1.url = "assets/images/imagenVisita.jpg";
    visitaTest1.url_movil = "assets/images/imagenVisita.jpg";
    visitaTest1.price = 23;
    visitaTest1.duration = 2;
    visitaTest1.title = "Visita a Madrid";
    visitaTest1.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest1.id = 1;
    visitas.push(visitaTest1);
    
    let visitaTest2: VisitasModel = new VisitasModel();
    visitaTest2.url = "assets/images/imagenVisita.jpg";
    visitaTest2.url_movil = "assets/images/imagenVisita.jpg";
    visitaTest2.price = 23;
    visitaTest2.duration = 2;
    visitaTest2.title = "Visita a Madrid";
    visitaTest2.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest2.id = 2;
    visitas.push(visitaTest2);

    let visitaTest3: VisitasModel = new VisitasModel();
    visitaTest3.url = "assets/images/imagenVisita.jpg";
    visitaTest3.url_movil = "assets/images/imagenVisita.jpg";
    visitaTest3.price = 33;
    visitaTest3.duration = 3;
    visitaTest3.title = "Visita a Madrid";
    visitaTest3.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest3.id = 3;
    visitas.push(visitaTest3);

    let visitaTest4: VisitasModel = new VisitasModel();
    visitaTest4.url = "assets/images/imagenVisita.jpg";
    visitaTest4.url_movil = "assets/images/imagenVisita.jpg";
    visitaTest4.price = 44;
    visitaTest4.duration = 4;
    visitaTest4.title = "Visita a Madrid";
    visitaTest4.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest4.id = 4;
    visitas.push(visitaTest4);

    let visitaTest5: VisitasModel = new VisitasModel();
    visitaTest5.url = "assets/images/imagenVisita.jpg";
    visitaTest5.url_movil = "assets/images/imagenVisita.jpg";
    visitaTest5.price = 55;
    visitaTest5.duration = 5;
    visitaTest5.title = "Visita a Madrid";
    visitaTest5.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest5.id = 5;
    visitas.push(visitaTest5);

    return visitas;


    // return this.http.get( `${this.url}` )
    // .pipe(
    //   map( res => res as ImagenesModel[]) ,
    //   catchError((err) => {
    //     console.error("Error  " , err.error);
    //             return err.error;
    //   })
    // );

  }








  // getImagenBannerHome()  {

  //   let tipos_id = 1;
  //   let enlaces_id = 1;
  //   let posicion = 1;
    
  //   let endpoint = '/imagenes/filtpos' ;
  //   this.url = this.apiurl + endpoint;
  //   const filtData = {
  //     enlaces_id: enlaces_id,
  //     tipos_id: tipos_id,
  //     posicion: posicion 
      
  //   }
  
  //   let im = new ImagenesModel();
  //   im.rutapc = "assets/images/sinimagen.jpg";
  //   im.rutapc = "assets/images/banner-home.jpg";
  //   im.rutamovil = "assets/images/banner-home.jpg";
  //   im.tipo_id = tipos_id;

  //   return im;

    // return this.http.post( `${this.url}`, filtData )
    // .pipe(
    //   map( res => res as ImagenesModel[]) ,
    //   catchError((err) => {
    //     console.error("Error  " , err.error);
    //             return err.error;
    //   })
    // );

  //}

  
  

  

  



}

