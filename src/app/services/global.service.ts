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
import { TestimoniosModel } from '../models/Testimonios.model';


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
    visitaTest1.urlpc = "assets/images/imagenVisita.jpg";
    visitaTest1.urlmovil = "assets/images/imagenVisita.jpg";
    visitaTest1.precioPersona = 23;
    visitaTest1.duracion = 2;
    visitaTest1.titulo = "Visita a Madrid";
    visitaTest1.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest1.id = 1;
    visitas.push(visitaTest1);
    
    let visitaTest2: VisitasModel = new VisitasModel();
    visitaTest2.urlpc = "assets/images/imagenVisita.jpg";
    visitaTest2.urlmovil = "assets/images/imagenVisita.jpg";
    visitaTest2.precioPersona = 23;
    visitaTest2.duracion = 2;
    visitaTest2.titulo = "Visita a Madrid";
    visitaTest2.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest2.id = 2;
    visitas.push(visitaTest2);

    let visitaTest3: VisitasModel = new VisitasModel();
    visitaTest3.urlpc = "assets/images/imagenVisita.jpg";
    visitaTest3.urlmovil = "assets/images/imagenVisita.jpg";
    visitaTest3.precioPersona = 33;
    visitaTest3.duracion = 3;
    visitaTest3.titulo = "Visita a Madrid";
    visitaTest3.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
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
    visitaTest1.urlpc = "assets/images/imagenVisita.jpg";
    visitaTest1.urlmovil = "assets/images/imagenVisita.jpg";
    visitaTest1.precioPersona = 23;
    visitaTest1.duracion = 2;
    visitaTest1.titulo = "Visita a Madrid";
    visitaTest1.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest1.id = 1;
    visitas.push(visitaTest1);
    
    let visitaTest2: VisitasModel = new VisitasModel();
    visitaTest2.urlpc = "assets/images/imagenVisita.jpg";
    visitaTest2.urlmovil = "assets/images/imagenVisita.jpg";
    visitaTest2.precioPersona = 23;
    visitaTest2.duracion = 2;
    visitaTest2.titulo = "Visita a Madrid";
    visitaTest2.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest2.id = 2;
    visitas.push(visitaTest2);

    let visitaTest3: VisitasModel = new VisitasModel();
    visitaTest3.urlpc = "assets/images/imagenVisita.jpg";
    visitaTest3.urlmovil = "assets/images/imagenVisita.jpg";
    visitaTest3.precioPersona = 33;
    visitaTest3.duracion = 3;
    visitaTest3.titulo = "Visita a Madrid";
    visitaTest3.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest3.id = 3;
    visitas.push(visitaTest3);

    let visitaTest4: VisitasModel = new VisitasModel();
    visitaTest4.urlpc = "assets/images/imagenVisita.jpg";
    visitaTest4.urlmovil = "assets/images/imagenVisita.jpg";
    visitaTest4.precioPersona = 44;
    visitaTest4.duracion = 4;
    visitaTest4.titulo = "Visita a Madrid";
    visitaTest4.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitaTest4.id = 4;
    visitas.push(visitaTest4);

    let visitaTest5: VisitasModel = new VisitasModel();
    visitaTest5.urlpc = "assets/images/imagenVisita.jpg";
    visitaTest5.urlmovil = "assets/images/imagenVisita.jpg";
    visitaTest5.precioPersona = 55;
    visitaTest5.duracion = 5;
    visitaTest5.titulo = "Visita a Madrid";
    visitaTest5.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
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



  getTestimonioshome()  {
    
    let endpoint = '/testimonios/home' ;
    this.url = this.apiurl + endpoint;

    /////////pruebas
    let testimonios: TestimoniosModel[] = [];
    let testimonioTest: TestimoniosModel = new TestimoniosModel();
    testimonioTest.urlimagen = "assets/images/imagenTestimonio.jpg";
    
    testimonioTest.titulo = "Monica Trillo";
    testimonioTest.titulo = "AMPLIAMENTE LO RECOMIENDO";
    testimonioTest.visita = "Visita a Madrid";
    testimonioTest.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    testimonios.push(testimonioTest);
    testimonios.push(testimonioTest);
    testimonios.push(testimonioTest);
    testimonios.push(testimonioTest);
    testimonios.push(testimonioTest);
    testimonios.push(testimonioTest);

    return testimonios;


    // return this.http.get( `${this.url}` )
    // .pipe(
    //   map( res => res as ImagenesModel[]) ,
    //   catchError((err) => {
    //     console.error("Error  " , err.error);
    //             return err.error;
    //   })
    // );

  }




  getImagenBannerHome()  {

    let tipos_id = 1;
    let enlaces_id = 1;
    let posicion = 1;
    
    let endpoint = '/imagenes/filtpos' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: enlaces_id,
      tipos_id: tipos_id,
      posicion: posicion 
      
    }
  
    let im = new ImagenesModel();
    im.rutapc = "assets/images/sinimagen.png";
    im.rutapc = "assets/images/banner-home.jpg";
    im.rutamovil = "assets/images/banner-home.jpg";
    im.tipo_id = tipos_id;

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

  
  

  

  



}

