import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TimesModel } from '../models/Times.model';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { PlatformService } from './platform.service';
import { TextDataModel } from '../models/TextData.model';
import { TextContentsModel } from '../models/TextContents.model';
import { ProviderService } from './provider.service';
import { ComentariosModel } from '../models/Cometarios.model';
import { LanguagesModel } from '../models/Languages.model';


@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  idlang: number = 1;
  textcontents: TextContentsModel = new TextContentsModel(); 
  listaTextDataModel: TextDataModel[] =  [];


  userToken: string = '';
  idUsuario: string = '';
  url: string = '';
  apiurl: string;

  listatiposidentificacion: any[];
  week: any;
  months: any;
  listahoras: any[];
  idiomasIsos: any[];
  listaidlangs: any[] = [];
  redes: any;


  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private platformService: PlatformService,
    private providerService: ProviderService,
    private router: Router
  ) {

    this.apiurl = environment.apiurl;
    this.setlanguages();
    this.setHoursId()
    this.getListas();

  }




  getListas() {

    this.listaidlangs = [
      { id: 1, iso: 'es', iso_code: 'es_ES', name : 'español' },
      { id: 2, iso: 'en', iso_code: 'en_EN', name : 'inglés' },
      { id: 3, iso: 'fr', iso_code: 'fr_FR', name : 'francés' },
      { id: 4, iso: 'de', iso_code: 'de_DE', name : 'aleman'},
      { id: 5, iso: 'it', iso_code: 'it_IT', name : 'italiano' },
      { id: 6, iso: 'pl', iso_code: 'pl_PL', name : 'polaco' },
      { id: 7, iso: 'el', iso_code: 'el_EL', name : 'griego' },
      { id: 8, iso: 'pt', iso_code: 'pt_PT', name : 'portugués' },
    ];

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


  getIdLang(lang: string = "es") {
    let idlg = 1;
    if (lang != undefined) {
      if(this.listaidlangs.length == 0){
        this.getListas();
      }
      this.listaidlangs.forEach(resp=>{
        if (resp.name == lang) {
          idlg= resp.id;
        }
      }) 
    }
    return idlg;
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
  

  /////////////////carga de textos 
  setTextContents(){
    this.getTextcontentsglobal().subscribe((resp)=>{
      if(resp && resp["data"]){
        this.listaTextDataModel = resp["data"] as TextDataModel[] ?? [] ;
        this.textcontents = this.setTextContentsByLanguage(this.listaTextDataModel , this.idlang );
      }
    })
  }

  setHoursId(){
    // this.getHoursId().subscribe((resp)=>{
    //   if(resp){
    //     this.listahoras = resp as string[] ?? [] ;
    //     console.log("setHoursId()  ", this.textcontents)
    //   }
    // })
  }


  getImageDefault(visitas: VisitasResultadoModel[]) {
    let imagedefault =  'assets/images/sinimagen.png';
    if(visitas != null){
      visitas.forEach(element => {
        element.mediafile = imagedefault;
        if(element.mediafiles.length > 0) { element.mediafile = element.mediafiles[0].url } ;
      });
    }
    return  visitas;
  }

  getLanguages(visitas: VisitasResultadoModel[]) {
    if(visitas != null){
      visitas.forEach(element => {
        if(element.visitlanguages != null){
          element.languages = [];
          element.visitlanguages.forEach( l => {
            let idioma = new LanguagesModel();
            idioma.id = l["language_id"] ?? 0 ;
            let idiomafilter = this.listaidlangs.filter( i=> i.id == idioma.id)[0];
            if(idiomafilter){
              idioma.iso = idiomafilter.iso ?? '' ;
              idioma.name = idiomafilter.name ?? '' ;
              idioma.iso_code = idiomafilter.iso_code ?? '' ;
            }
            element.languages.push(idioma); 
          })
        }
      });
    }
    return  visitas;
  }


  // getLanguagesVisit(visitas: VisitasResultadoModel[], idlang: number) {
  //   debugger
  //   if(visitas != null){
  //     visitas.forEach(element => {
  //       if(element.visitlanguages != null){
  //         element.visitlanguages.forEach( l => {
  //           if(l.language_id === idlang) {
  //             element.titulo = l.name;
  //             element.descripcion = l.description;
  //           }
  //         })
  //       }
  //     });
  //   }
    
  //   return  visitas;
  // }

  
  getTextcomments() {
    this.setlanguages();
    let endpoint = '/textcomments/'+ this.idlang ;
    this.url = this.apiurl + endpoint;
    return this.http.get(`${this.url}` ).pipe(
        map((resp) =>{
            return resp["data"] as ComentariosModel[];
        }),
        catchError((err) => {
          console.error("Error  " , err.error);
          return err.error;
        })
      );
  }



  setTextContentsByLanguage(lista:TextDataModel[],  idlanguage: number = 1) {
    let textcont: TextContentsModel = new TextContentsModel();
    if( lista.length > 0){
      textcont.dataok = true;
      lista.forEach((data: TextDataModel) => {
        if(data.idlang == idlanguage){
          textcont[data.nombre.trim()] = data.contenido.trim() ;
        }
      });
    }
    return textcont;
  }

  setlanguages(){
    let lang = this.getLanguage()
    this.idlang = this.getIdLang(lang);
  }

  getTextcontentsglobal() {
    this.setlanguages();
    let endpoint = '/textcontents/'+this.idlang ;
      this.url = this.apiurl + endpoint;
      return this.http.get(`${this.url}` ).pipe(
        map((resp) =>{
            return resp["data"] as TextDataModel;
        }),
        catchError((err) => {
          console.error("Error  " , err.error);
          return err.error;
        })
      );
  }


  getHoursId() {
    
    let endpoint = '/hoursid' ;
      this.url = this.apiurl + endpoint;
      return this.http.get(`${this.url}` ).pipe(
        map((resp) =>{
            return resp as string;
        }),
        catchError((err) => {
          console.error("Error  " , err.error);
          return err.error;
        })
      );
  }






}
