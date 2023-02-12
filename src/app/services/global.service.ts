import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VisitasModel } from '../models/Visitas.model';
import { TimesModel } from '../models/Times.model';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { PlatformService } from './platform.service';
import { TextoPerfilModel } from '../models/TextoPerfil.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  textoPerfil: TextoPerfilModel = new TextoPerfilModel();



  userToken: string = '';
  idUsuario: string = '';
  url: string = '';
  apiurl: string;

  listatiposidentificacion: any[];
  week: any;
  months: any;
  listahoras: any[];
  idiomasIsos: any[];
  redes: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private platformService: PlatformService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
    this.getListas();
    
  }

  getListas() {
    this.listatiposidentificacion = [
      { id: 1, name: 'DNI' },
      { id: 2, name: 'CIF' },
      { id: 3, name: 'Pasaporte' },
    ];

    this.week = [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      'Domingo',
    ];

    this.months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    this.listahoras = [
      { key: '0', value: '00:00' },
      { key: '1', value: '01:00' },
      { key: '2', value: '02:00' },
      { key: '3', value: '03:00' },
      { key: '4', value: '04:00' },
      { key: '5', value: '05:00' },
      { key: '6', value: '06:00' },
      { key: '7', value: '07:00' },
      { key: '8', value: '08:00' },
      { key: '9', value: '09:00' },
      { key: '10', value: '10:00' },
      { key: '11', value: '11:00' },
      { key: '12', value: '12:00' },
      { key: '13', value: '13:00' },
      { key: '14', value: '14:00' },
      { key: '15', value: '15:00' },
      { key: '16', value: '16:00' },
      { key: '17', value: '17:00' },
      { key: '18', value: '18:00' },
      { key: '19', value: '19:00' },
      { key: '20', value: '20:00' },
      { key: '21', value: '21:00' },
      { key: '22', value: '22:00' },
      { key: '23', value: '23:00' },
    ];

    this.idiomasIsos = [
      { key: 'es', value: 'español', value_en: 'Spanish' },
      { key: 'en', value: 'ingles', value_en: 'English' },
      { key: 'fr', value: 'frances', value_en: 'French' },
      { key: 'de', value: 'aleman', value_en: 'German' },
      { key: 'it', value: 'italiano', value_en: 'Italian' },
      { key: 'pl', value: 'polaco', value_en: 'Polish' },
      { key: 'gr', value: 'griego', value_en: 'Greek' },
      { key: 'pt', value: 'portugues', value_en: 'Portuguese' },
    ];

    this.redes = [
      { name: 'facebook', logo: 'assets/images/i-facebookN.svg' },
      { name: 'twitter', logo: 'assets/images/i-twitterN.svg' },
      { name: 'instagram', logo: 'assets/images/i-instagramN.svg' },
    ];
  }

  getLanguage() {
    let clang: string = this.getCurrentLang() ?? 'es';
    if (localStorage.getItem('currentLanguage')) {
      clang = localStorage.getItem('currentLanguage') ?? 'es';
    }
    return clang;
  }

  getCurrentLang() {
    if (navigator.languages != undefined) {
      return navigator.languages[0];
    }
    return navigator.language;
  }

  getFormatNumber(n: number) {
    if (n != 0 && !Number.isNaN(n)) {
      let num = n.toFixed(2);
      let numsp = num.split('.');
      if (numsp[1].length == 1) {
        numsp[1] = numsp[1] + '0';
      }
      if (numsp[1].length > 2) {
        numsp[1] = numsp[1].substring(0, 2);
      }
      return numsp[0] + '.' + numsp[1];
    } else {
      return '0';
    }
  }

  // getImagenesFilt(idenlace: number, idtipo: number) {
  //   let endpoint = '/imagenes/filt';
  //   this.url = this.apiurl + endpoint;
  //   const filtData = {
  //     enlaces_id: idenlace,
  //     tipos_id: idtipo,
  //   };
  //   return this.http.post(`${this.url}`, filtData).pipe(
  //     map((res) => res as ImagenesModel[]),
  //     catchError((err) => {
  //       console.error('Error  ', err.error);
  //       // if(err.includes("Unauthorized")){
  //       //   this.router.navigateByUrl("/homecliente");
  //       // }
  //       return err.error;
  //     })
  //   );
  // }

  getIdiomabyIso(iso: string) {
    let idioma = this.idiomasIsos.find((x) => x.key == iso);
    return idioma.value;
  }

  getbyMes(nummes: number) {
    let mes = this.months[nummes];
    return mes;
  }

  getbyDia(dia: number) {
    let diasemana = this.week[dia];
    return diasemana;
  }

  getFechaleg(fecha: string) {
    let fechasp = fecha.split('/');
    let fechadate = new Date(fechasp[2] + '-' + fechasp[1] + '-' + fechasp[0]);
    let fechaleg =
      this.getbyDia(fechadate.getDay()) +
      ' ' +
      fechadate.getDate() +
      ' ' +
      this.getbyMes(fechadate.getMonth()) +
      ' ' +
      fechadate.getFullYear();
    return fechaleg;
  }

  mapperVisitas(visita: VisitasResultadoModel) {
    let vi = new TimesModel();
    vi.min = visita.visit_time_min;
    vi.max = visita.visit_time_max;
    vi.uuid = visita.visit_time_uuid;
    vi.init = visita.visit_time_init;
    vi.end = visita.visit_time_end;
    vi.date = visita.visit_time_date;
    

    vi.iso = visita.visit_time_iso;
    vi.duration = visita.visit_time_duration;

    if (visita.duration != null) {
      vi.duration = visita.duration;
    }
  

    visita.visit_time = [];
    visita.visit_time.push(vi);
    return visita;
  }

  getlistatiposidentificacion() {
    return this.listatiposidentificacion;
  }

  esmovil() {
    var ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      ua
    );
  }

  mandarwhatsapp() {
    let num = '+34';
    let url =
      'https://web.whatsapp.com/send?text=' +
      encodeURIComponent('Deseo información ') +
      '&phone=' +
      encodeURIComponent(num);
    if (this.esmovil()) {
      url =
        'https://api.whatsapp.com/send?text=' +
        encodeURIComponent('Deseo información ') +
        '&phone=' +
        encodeURIComponent(num);
    }
    this.platformService.sWindow.open(url);
  }



  ///get Texto mi cuenta
  getTextoPerfil() {
      let endpoint = '/assets/perfil?' ;
      this.url = this.apiurl + endpoint;
      return this.http.get( `${this.url}` )
      .pipe(
        map( 
          (resp) =>{
          return resp;
        }),
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
  }
  
 




}
