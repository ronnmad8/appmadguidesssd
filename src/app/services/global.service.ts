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
import { HourModel } from '../models/Hour.model';


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
  weekDays: any;
  months: any;
  monthsIso: any;
  listahoras: any[];
  idiomasIsos: any[];
  listaidlangs: any[] = [];
  textalerts: any[] = [];
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
      { id: 6, iso: 'pt', iso_code: 'pt_PT', name : 'portugués' },
      { id: 7, iso: 'el', iso_code: 'el_EL', name : 'griego' },
      { id: 8, iso: 'pl', iso_code: 'pl_PL', name :  'polaco'}
    ];

    this.listatiposidentificacion = [
      { id: 1, name: 'DNI' },
      { id: 2, name: 'CIF' },
      { id: 3, name: 'Pasaporte' }
    ];

    this.week = [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      'Domingo'
    ];

    this.weekDays = {
      es: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      fr: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      de: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
      it: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
      pt: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
      el: ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'],
      pl: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela']
    };

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

    this.monthsIso = {
      es: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ],
      en: [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      fr: [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ],
      de: [
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
      ],
      it: [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 
        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
      ],
      pt: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      el: [
        'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 
        'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'
      ],
      pl: [
        'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 
        'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
      ]
    };

    this.listahoras = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23
    
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

    this.textalerts = [
      { tipo: "inicio_sesion", value_es: 'Inicio de sesión correctamente', value_en: 'Login correctly' },
      { tipo: "no_registrado", value_es: 'Inicio de sesión correctamente', value_en: 'Login correctly' },

    ];

  }

  getAlerta(tipo: string){
    let lang = this.getLanguage();
    this.textalerts.forEach(i => {
      if(i.tipo == tipo){
        switch(lang){
          case "es":
            return i.value_es;
            break;
          case "en":
            return i.value_en;
            break;
          default:
            return "";
            break;
        }
      }
    });
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


  getIdLang(iso: string = "es") {
    let idlg = 1;
    if (iso != undefined) {
      if(this.listaidlangs.length == 0){
        this.getListas();
      }
      this.listaidlangs.forEach(resp=>{
        if (resp.iso == iso) {
          idlg= resp.id;
        }
      }) 
    }
    return idlg;
  }


  getLanguageId(){
    let langiso = this.getLanguage();
    if(langiso != null){
        return  this.getIdLang(langiso);
    }
    else return 1;
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
    if(idioma == null){
       idioma = this.idiomasIsos.find((x) => x.key == "es");
    }
    return idioma.value;
  }

  getbyMes(nummes: number) {
    let iso = this.getLanguage();
    let mes = this.monthsIso[iso][nummes];
    return mes;
  }

  getbyDia(dia: number) {
    let iso = this.getLanguage();
    let diasemana = this.weekDays[iso][dia];
    return diasemana;
  }

  getWeekIso() {
    let iso = this.getLanguage();
    let semana = this.weekDays[iso];
    return semana;
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
      if(resp){
        this.listaTextDataModel = resp as TextDataModel[] ?? [] ;
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


  getPrecio(duracionmin: number, preciohora: number){
    return Math.round(preciohora * ( duracionmin /60 ));
  }


  getPrecioByVisit(visit: VisitasResultadoModel){
    return Math.round(visit.preciohoramin * ( visit.duracionmin /60 ));
  }


}
