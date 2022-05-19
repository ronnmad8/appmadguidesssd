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
export class HomeService {
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


  



  getVisitashome()  {
    
    let endpoint = '/visitas/home' ;
    this.url = this.apiurl + endpoint;

    /////////pruebas
    let visitas: VisitasModel[] = [];
    let visitaTest: VisitasModel = new VisitasModel();
    visitaTest.urlpc = "assets/images/imagenVisita.jpg";
    visitaTest.urlmovil = "assets/images/imagenVisita.jpg";
    visitaTest.precioPersona = 23;
    visitaTest.duracion = 2;
    visitaTest.valoraciones = 21;
    visitaTest.titulo = "Visita a Madrid";
    visitaTest.texto = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    visitas.push(visitaTest);
    visitas.push(visitaTest);
    visitas.push(visitaTest);
    visitas.push(visitaTest);
    visitas.push(visitaTest);
    visitas.push(visitaTest);

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
    im.rutapc = "assets/images/imagenbannerhome.jpg";
    im.rutamovil = "assets/images/imagenbannerhome.jpg";
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

