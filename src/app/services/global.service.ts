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

  ////////////
  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];
  
  months: any = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  listahoras: any[] = [
    { key : "0", value : "00:00"},
    { key : "1", value : "01:00"},
    { key : "2", value : "02:00"},
    { key : "3", value : "03:00"},
    { key : "4", value : "04:00"},
    { key : "5", value : "05:00"},
    { key : "6", value : "06:00"},
    { key : "7", value : "07:00"},
    { key : "8", value : "08:00"},
    { key : "9", value : "09:00"},
    { key : "10", value : "10:00"},
    { key : "11", value : "11:00"},
    { key : "12", value : "12:00"},
    { key : "13", value : "13:00"},
    { key : "14", value : "14:00"},
    { key : "15", value : "15:00"},
    { key : "16", value : "16:00"},
    { key : "17", value : "17:00"},
    { key : "18", value : "18:00"},
    { key : "19", value : "19:00"},
    { key : "20", value : "20:00"},
    { key : "21", value : "21:00"},
    { key : "22", value : "22:00"},
    { key : "23", value : "23:00"},

  ];

  

  redes: any = [
    { name : "facebook", logo : "assets/images/i-facebookN.svg"},
    { name : "twitter", logo : "assets/images/i-twitterN.svg"},
    { name : "instagram", logo : "assets/images/i-instagramN.svg"},
  ];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
  }

 


  getFormatNumber(n: number) {
    if(n != 0){
      let num = n.toFixed(2);
      let numsp = num.split(".");
      if(numsp[1].length == 1){
        numsp[1] = numsp[1] + "0";
      }
      if(numsp[1].length > 2){
        numsp[1] = numsp[1].substring(0,2);
      }
      return numsp[0] + "." + numsp[1];
    }
    else{
      return "0";
    }  
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







  

  

  



}

