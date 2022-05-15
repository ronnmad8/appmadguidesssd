import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TextosModel } from '../models/Textos.model';


@Injectable({
  providedIn: 'root'
})
export class TextosService {
  userToken: string = "";
  idUsuario: string = "";
  url: string = "";
  apiurl: string = "";

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
      texto: textos.texto

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
    
    let endpoint = '/textos/filtnom' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      tipotextos_id: idtipotexto
      
    };

    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec mauris sit amet velit facilisi"+
    "facilisis at et ligula. Donec luctus, lacus id tincidunt vulputate, tortor nulla facilisis ipsum, iaculis "+
    "ullamcorper velit eros eu turpis. Pellentesque id odio urna. Fusce suscipit ligula mauris, et consequat elit hendrerit nec. "+
    "Donec aliquet nec risus quis lobortis. Donec tincidunt leo nisi, ac scelerisque erat commodo at. Phasellus quis purus non "+
    "nibh mollis tempor eu ut lectus. Sed vel nisl eget mi luctus rhoncus id eu tortor. Vestibulum ante ipsum primis in faucibus orci "+
    "luctus et ultrices posuere cubilia curae; Nam congue diam eget molestie commodo. Morbi faucibus consequat risus, quis lacinia turpis ";
    "imperdiet ut. Nulla bibendum lectus vel velit luctus venenatis.  ";
  
    // return this.http.post( `${this.url}`, filtData )
    // .pipe(
    //   map( res => res as TextosModel[]) ,
    //   catchError((err) => {
    //     console.error("Error  " , err.error);
    //             return err.error;
    //   })
    // );

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

