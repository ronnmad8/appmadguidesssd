import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VisitasModel } from '../models/Visitas.model';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { VisitaAssetsModel } from '../models/VisitaAssets.model';
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
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
    this.clang = this.globalService.getLanguage();
    this.userToken = this.auth.leerToken();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  getVisita(uuid: string) {

    // let endpoint = '/visit?uuid=' + uuid;
    // this.url = this.apiurl + endpoint;
    // return this.http.get(`${this.url}` ).pipe(
    //   map((res) => {
    //     let visitas: VisitasResultadoModel[] = res as VisitasResultadoModel[];
    //     let visita = visitas[0];
    //     if (visita.visit_time_uuid != null && visita.visit_time == null) {
    //       visita = this.globalService.mapperVisitas(visita);
    //     }
    //     return visita;
    //   }),
    //   catchError((err) => {
    //     console.error('Error  ', err.error);
    //     return err.error;
    //   })
    // );
  }



  

  // getRelacionadas(category_uuid: string) {

  //   let endpoint =
  //     '/visit?order=order-random&per_page=4&category_uuid=' + category_uuid;
  //   this.url = this.apiurl + endpoint;
  //   return this.http.get(`${this.url}` ).pipe(
  //     map((resp) => {
  //       var resultado: ResultadoModel =
  //         resp as ResultadoModel;
  //       var visitas: VisitasResultadoModel[] = resultado.data;
  //         visitas.forEach((visita) => {
  //           if (visita.visit_time_uuid != null && visita.visit_time == null) {
  //             visita = this.globalService.mapperVisitas(visita)
  //           }
  //         });

  //       return visitas;
  //     }),
  //     catchError((err) => {
  //       console.error('Error  ', err.error);
  //       return err.error;
  //     })
  //   );
  // }


  getCategoryUuid(uuid: string) {

    let endpoint = '/visit?per_page=1&uuid=' + uuid;
    this.url = this.apiurl + endpoint;

    return this.http.get(`${this.url}`).pipe(
      map((resp) => {
        var visita: VisitasResultadoModel[] = resp as VisitasResultadoModel[];
        return visita[0];
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
        var visitas: VisitasResultadoModel[] = resp["data"];
        if (visitas != undefined){
          return visitas;
        }
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }







}
