import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { ListasService } from './listas.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { TimesModel } from '../models/Times.model';
import { ResultadoModel } from '../models/Resultado.model';


@Injectable({
  providedIn: 'root',
})
export class VisitaService {
  userToken: string = '';
  idUsuario: string = '';
  url: string = '';
  apiurl: string;
  clang: string = 'es';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private globalService: GlobalService,
    private listasService: ListasService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
    this.clang = this.globalService.getLanguage();
    this.userToken = this.auth.leerToken();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  getVisita(visitid: string) {
    let idlang = this.globalService.getLanguageId();
    let endpoint = '/visitdetail/'+ visitid+'/'+ idlang;
    this.url = this.apiurl + endpoint;
    return this.http.get(`${this.url}` ).pipe(
      map((res) => {
        if(res["data"]){
          return res["data"] as VisitasResultadoModel;
        }
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }



  

  getVisitasRelacionadas(id: string, idlang: number) {

    let endpoint =  "/visitrelated/"+id+"/"+idlang;
    this.url = this.apiurl + endpoint;
    return this.http.get(`${this.url}` ).pipe(
      map((resp) => {
        return resp["data"] as VisitasResultadoModel[] ;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }


  getDisponibilitiesdiasemana(esediasemana: number ){

    let endpoint =  "/franjasdiasemana/"+ esediasemana;
    this.url = this.apiurl + endpoint;
    return this.http.get(`${this.url}` ).pipe(
      map((resp) => {
        return resp["data"] as VisitasResultadoModel[] ;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }

  getDisponibilitiesVisita(visitaid: number, month: number, year: number) {
    let endpoint =  "/disponibilities/"+ visitaid+"/"+month+"/"+year;
    this.url = this.apiurl + endpoint;
    return this.http.get(`${this.url}` ).pipe(
      map((resp) => {
        return resp as number[] ;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }

  getVendidas(visitaid: number, fecha: string, horaid: number, languageid: number) {
    let endpoint =  "/vendidas/"+ visitaid+"/"+ fecha + "/"+ horaid + "/"+ languageid;
    this.url = this.apiurl + endpoint;
    return this.http.get(`${this.url}` ).pipe(
      map((resp) => {
        return resp as number ;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }

  getVisitasRecomendadas(idlang: number) {
    let endpoint =  "/visitrecommended/"+idlang;
    this.url = this.apiurl + endpoint;
    return this.http.get(`${this.url}` ).pipe(
      map((resp) => {
        return resp["data"] as VisitasResultadoModel[] ;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }



  getFormattedDuration(visita: VisitasResultadoModel): string {
    let roundedDuracion = (visita.duracionmin / 60).toFixed(2);
    let decimalPart = roundedDuracion.slice(-2);
    roundedDuracion=roundedDuracion.replace('.',',');
    return decimalPart === '00' ? roundedDuracion.slice(0, -3) : roundedDuracion;
  }

  getFormattedPricewduration(visita: VisitasResultadoModel): string {
    let price = visita.preciohoramin *  (visita.duracionmin /60)
    let roundedPrice = (price).toFixed(2);
    let decimalPart = roundedPrice.slice(-2);
    roundedPrice=roundedPrice.replace('.',',');
    return decimalPart === '00' ? roundedPrice.slice(0, -3) : roundedPrice;
  }

  getFormattedPrice(visita: VisitasResultadoModel): string {
    let price = visita.precio.toString();
    price=price.replace('.',',');
    return price;
  }

  getFormattedTexto( texto: string, limit: number = 10): string {
    let titulocorto = "";
    if(texto != null && texto.length != null){
       titulocorto = texto.length > limit ? texto.substring(0, (limit-3) )+"..." : texto ;
    }
    return titulocorto;
  }


  getNombreidioma(id: number = 1){
    let nombreidioma = '';
    this.listasService.getIdiomas().forEach( idioma => { 
      if ( idioma.id == id ) {
        nombreidioma = idioma.name;
      }
    })
    return nombreidioma;
  }



}
