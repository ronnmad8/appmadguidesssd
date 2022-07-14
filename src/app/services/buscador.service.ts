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
        //   this.router.navigateByUrl("/Buscadorcliente");
        // }
        return err.error;
      })
    );

  }


  getVisitasBuscador()  {
    
    let endpoint = '/visitas/Buscador' ;
    this.url = this.apiurl + endpoint;

    /////////pruebas
    let visitas: VisitasModel[] = [];
    let visitaTest: VisitasModel = new VisitasModel();
    visitaTest.url = "assets/images/imagenVisita.jpg";
    visitaTest.url_movil = "assets/images/imagenVisita.jpg";
    visitaTest.price = 23;
    visitaTest.duration = 2;
    visitaTest.title = "Visita a Madrid";
    visitaTest.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    
    visitaTest.idiomas = ["Español", "Inglés, Italiano", "Portugués","Alemán"] ;
    
    visitas.push(visitaTest);
    visitas.push(visitaTest);
    visitas.push(visitaTest);
    visitas.push(visitaTest);
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



  
  


  

  

  



}

