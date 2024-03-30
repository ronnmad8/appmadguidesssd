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
import { TextorecomendadasModel } from '../models/Textorecomendadas.model';
import { ImagenesVisitaModel } from '../models/ImagenesVisita.model';


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
    this.apiurl = environment.apiurlold;
    this.clang = this.globalService.getLanguage();
    this.userToken = this.auth.leerToken();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  getVisita(uuid: string) {

    let endpoint = '/visit?uuid=' + uuid;
    this.url = this.apiurl + endpoint;
    return this.http.get(`${this.url}` ).pipe(
      map((res) => {
        let visitas: VisitasResultadoModel[] = res as VisitasResultadoModel[];
        let visita = visitas[0];
        if (visita.visit_time_uuid != null && visita.visit_time == null) {
          visita = this.globalService.mapperVisitas(visita);
        }
        return visita;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }

  getVisitaTitle(title: string) {

    let endpoint = '/visit?title=' + title;
    this.url = this.apiurl + endpoint;
    return this.http.get(`${this.url}` ).pipe(
      map((res) => {
        return res as VisitasResultadoModel[];
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }


  getVisitaImagenes(uuid: string){
    let endpoint = '/visit?uuid=' + uuid + '&images=true';
    this.url = this.apiurl + endpoint;
    return this.http.get(`${this.url}` ).pipe(
      map((res) => {
        let visitas: VisitasResultadoModel[] = res as VisitasResultadoModel[];
        let visita = visitas[0];
        var imagenes: ImagenesVisitaModel[] = [];
        if(visita.visit_image != null ){
          imagenes = visita.visit_image;
        }
        return imagenes;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }


  getImagenesvisita() {
    
    var imagenes: ImagenesModel[] = [];

    var imagen2: ImagenesModel = new ImagenesModel();
    imagen2.id = 2;
    imagen2.title = 'titulo';
    imagen2.description = 'descripcion';
    imagen2.alt = 'alt';
    imagen2.iso = 'es';
    imagen2.uuid = 'dqdqdqdqd';
    imagen2.url = '../../assets/images/imagen-footer.jpg';
    imagen2.url_movil = '../../assets/images/imagen-footer.jpg';
    imagen2.url_galleria = '../../assets/images/imagen-footer.jpg';
    imagen2.name = 'imagen2';

    var imagen3: ImagenesModel = new ImagenesModel();
    imagen3.id = 3;
    imagen3.title = 'titulo';
    imagen3.description = 'descripcion';
    imagen3.alt = 'alt';
    imagen3.iso = 'es';
    imagen3.uuid = 'dqdqdqdqd';
    imagen3.url = '../../assets/images/imagen-footer.jpg';
    imagen3.url_movil = '../../assets/images/imagen-footer.jpg';
    imagen3.url_galleria = '../../assets/images/imagen-footer.jpg';
    imagen3.name = 'imagen3';

    var imagen4: ImagenesModel = new ImagenesModel();
    imagen4.id = 4;
    imagen4.title = 'titulo';
    imagen4.description = 'descripcion';
    imagen4.alt = 'alt';
    imagen4.iso = 'es';
    imagen4.uuid = 'dqdqdqdqd';
    imagen4.url = '../../assets/images/imagen-footer.jpg';
    imagen4.url_movil = '../../assets/images/imagen-footer.jpg';
    imagen4.url_galleria = '../../assets/images/imagen-footer.jpg';
    imagen4.name = 'imagen4';

    var imagen5: ImagenesModel = new ImagenesModel();
    imagen5.id = 5;
    imagen5.title = 'titulo';
    imagen5.description = 'descripcion';
    imagen5.alt = 'alt';
    imagen5.iso = 'es';
    imagen5.uuid = 'dqdqdqdqd';
    imagen5.url = '../../assets/images/imagen-footer.jpg';
    imagen5.url_movil = '../../assets/images/imagen-footer.jpg';
    imagen5.url_galleria = '../../assets/images/imagen-footer.jpg';
    imagen5.name = 'imagen5';

    //imagenes.push(imagen1);
    imagenes.push(imagen2);
    imagenes.push(imagen3);
    imagenes.push(imagen4);
    imagenes.push(imagen5);

    return imagenes;
  }

  getRelacionadas(category_uuid: string) {

    let endpoint =
      '/visit?order=order-random&per_page=4&category_uuid=' + category_uuid;
    this.url = this.apiurl + endpoint;
    return this.http.get(`${this.url}` ).pipe(
      map((resp) => {
        var resultado: ResultadoModel =
          resp as ResultadoModel;
        var visitas: VisitasResultadoModel[] = resultado.data;
          visitas.forEach((visita) => {
            if (visita.visit_time_uuid != null && visita.visit_time == null) {
              visita = this.globalService.mapperVisitas(visita)
            }
          });

        return visitas;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }


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

  getCategoryTitle(title: string) {

    let endpoint = '/visit?per_page=1&title=' + title;
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

  getMessagesVisita() {

    let endpoint = '/assets/visit';
    this.url = this.apiurl + endpoint;

    return this.http.get(`${this.url}`).pipe(
      map((resp) => {
        var messageData: VisitaAssetsModel = resp as VisitaAssetsModel;
        return messageData;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }








}
