import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TextosModel } from '../models/textos.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TipotextosModel } from '../models/tipotextos.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TextosService {
  userToken: string;
  idUsuario: string;
  url: string;
  apiurl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
  }


  
  modificarTexto( textos: TextosModel ) {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/textos/modificar' ;
    this.url = this.apiurl + endpoint;

    const productoData = {
      id: textos.id,
      texto: textos.texto,
      observaciones:  textos.observaciones

    };

    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    return this.http.post( `${this.url}`, productoData, {headers} )
    .pipe(
      map( res => res as TextosModel) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
    
  }



  getListaTextos() {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/textos';
    this.url = this.apiurl + endpoint ;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers }  )
    .pipe(
      map( res => res as TextosModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }


  getTextosFilt(idenlace :number, idtipotexto :number)  {
    
    let endpoint = '/textos/filt' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      tipotextos_id: idtipotexto
      
    };
    
    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as TextosModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }

  getTextosFiltnom(idenlace :number, idtipotexto :number)  {
    
    let endpoint = '/textos/filtnom' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      tipotextos_id: idtipotexto
      
    };
  
    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as TextosModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }


  getTextosFiltpos(idenlace :number, idtipotexto :number, posicion: number)  {
    
    let endpoint = '/textos/filtpos' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      tipotextos_id: idtipotexto,
      posicion: posicion
      
    };
    
    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as TextosModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }


  getTextosFiltAdmin(idenlace :number, idtipotexto: number, fechaini: string, fechafin: string)  {

    this.userToken = this.auth.leerToken();
    let endpoint = '/textos/filtadmin' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      id: idenlace,
      id2: idtipotexto,
      fechaini: fechaini,
      fechafin: fechafin
      
    };
    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    
    return this.http.post( `${this.url}`, filtData, { headers } )
    .pipe(
      map( res => res as TextosModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }


  getFiltrosfechaini(){
    //fecha fin de filtro hoy
    let fechaf = new Date(Date.now());
    let yef = fechaf.getFullYear();
    let mof = (fechaf.getMonth() + 1).toString();
    mof = mof.length == 1 ? "0" + mof : mof;
    let daf = fechaf.getDate().toString();
    daf = daf.length == 1 ? "0" + daf : daf;
    //fecha hace 3 meses
    let fechai = new Date(Date.now());
    fechai.setDate(fechaf.getDate() - 90);
    let yei = fechai.getFullYear();
    let moi = (fechai.getMonth()).toString();
    moi = moi.length == 1 ? "0" + moi : moi;
    let dai = fechai.getDate().toString();
    dai = dai.length == 1 ? "0" + dai : dai;

    let textofechainifiltrosel = yei + "-" + moi + "-" + dai;
    let textofechafinfiltrosel = yef + "-" + mof + "-" + daf;
    let arrayfechas = [ textofechafinfiltrosel, textofechainifiltrosel ]
    debugger
    return arrayfechas;
  }

  

  



}

