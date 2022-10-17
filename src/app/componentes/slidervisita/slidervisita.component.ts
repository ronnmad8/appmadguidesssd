import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { BuscadorService } from '../../services/buscador.service';
import { VisitaService } from '../../services/visita.service';
import { ProviderService } from '../../services/provider.service';
import { ListasService } from '../../services/listas.service';
import { GlobalService } from '../../services/global.service';
import { Options } from '@angular-slider/ngx-slider';
import {
  SwiperModule,
  SwiperComponent,
  SwiperConfigInterface,
  SwiperDirective,
  SwiperPaginationInterface,
  SwiperScrollbarInterface,
} from 'ngx-swiper-wrapper';
import { Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import * as moment from 'moment';
import { LanguagesModel } from 'src/app/models/Languages.model';
import { trigger, animate, transition, style } from '@angular/animations';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { VisitaAssetsModel } from 'src/app/models/VisitaAssets.model';

@Component({
  selector: 'app-slidervisita',
  templateUrl: './slidervisita.component.html',
})
export class SlidervisitaComponent implements OnInit {

  @ViewChild('imagenlista') imagenlista: any;
  @ViewChild('detallevisita') detallevisita: any;
  @ViewChild('finaldetalle') finaldetalle: any;
  @ViewChild('detallecale') detallecale: any;
  @ViewChild('fdetallecale') fdetallecale: any;

  visitaresultado: VisitasResultadoModel = new VisitasResultadoModel();

  public config: SwiperConfigInterface = {
    autoplay: false,
    effect: 'slide',
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    slideToClickedSlide: false,
    speed: 1000,
    mousewheel: false,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    pagination: false,
    centeredSlides: false,
    loop: true,
    loopedSlides: 0,
    initialSlide: 0,
    loopFillGroupWithBlank: false,
    roundLengths: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    spaceBetween: 1,
    breakpoints: {
      1290: {
        slidesPerView: 1,
      },
      590: {
        slidesPerView: 1.05,
      },
      490: {
        slidesPerView: 1.15,
      },
    },
  };

  listaidiomas: LanguagesModel[] = [];
  listaidiomasvisita: LanguagesModel[] = [];
  
  isrespon: boolean = false;
  //imagenes
  listaImagenesVisita: ImagenesModel[] = [];
  listaImagenesVisitaLat: ImagenesModel[] = [];
  
  //calendario
  monthSelect: any[];
  dateSelect: any;
  dateValue: any;
  mSelect: any;
  ySelect: any;
  week: string[] = [];
  months: string[] = [];
  horas: any[] = [];
  listahoras: any[] = [];
  listahorasvisita: any[] = [];
  //acordeon ocultar
  vcale: boolean = false;
  vhora: boolean = false;
  vidiom: boolean = false;
  vpers: boolean = false;
  pegaj: number = 1;
  //seleccionados
  daySel: any;
  horaSel: any = 0;
  idiomaSel: any = 0;
  adultoSel: number = 0;
  ninosSel: number = 0;
  menoresSel: number = 0;
  //info acordeon
  horainfo: string = '';
  caleinfo: string = '';
  idiominfo: string = '';
  maximopersonas: number = 0;
  sumapersonas: number = 0;
  precioadultos: number = 0;
  precioninos: number = 0;
  preciomenores: number = 0;
  precioadultototal: number = 0;
  precioninostotal: number = 0;
  preciomenorestotal: number = 0;
  preciototal: number = 0;
  privada: boolean = false;
  precioadultosst: string = "0";
  precioninosst: string = "0";
  preciomenoresst: string = "0";
  precioadultototalst: string = "0";
  precioninostotalst: string = "0";
  preciomenorestotalst: string = "0";
  preciototalst: string = "0";
  //validar
  calenovalid: boolean = false;
  horanovalid: boolean = false;
  idiomanovalid: boolean = false;
  persnovalid: boolean = false;
  //pestañas
  pestaactiv: number = 1;
  vermas: boolean = false;
  descripcion: string = '';
  descripcioncorta: string = '';
  precios: string = '';
  detalles: string = '';
  idomasdisponibles: string = '';
  cancelaciones: string = '';
  puntodeencuentro: string = '';
  googlemapsvisita: string = 'https://goo.gl/maps/stMedKZoKh7f1qGC9';
  //redes
  verredes: boolean = false;
  redes: any[] = [];
  messages: VisitaAssetsModel = new VisitaAssetsModel();
  idiomasdisponibles: string = '';

  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private visitaService: VisitaService,
    private providerService: ProviderService,
    private listasService: ListasService,
    private globalService: GlobalService,
    private renderer: Renderer2
  ) {
    this.wowService.init();
  }

  ngOnInit(): void {
    this.listenProvider();
    this.week = this.globalService.week;
    this.months = this.globalService.months;
    this.redes = this.globalService.redes;
    this.listahoras = this.globalService.listahoras;
 
    //español por defecto siempre
    let espa = new LanguagesModel();
    espa.id = 1;
    espa.name = 'Español';
    espa.current_iso = 'es';
    espa.iso = 'es';
    this.listaidiomasvisita.push(espa);

    this.vcale = true;
    this.isresponsive();
    let hoy = moment();
    let estemes = hoy.format('MM');
    let esteyear = hoy.format('YYYY');
    this.getDaysFromDate(estemes, esteyear);
    this.getIdiomas();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    let posactual = window.pageYOffset;
    let posdetallevisita = this.detallevisita.nativeElement.offsetTop - 120;
    let posfinaldetalle = this.finaldetalle.nativeElement.offsetTop;

    if (posactual <= posdetallevisita) {
      this.pegaj = 1;
    } else if (posactual > posdetallevisita) {
      this.pegaj = 2;
      let hdetallecale = this.detallecale.nativeElement.offsetHeight;
      let dif = posfinaldetalle - hdetallecale;
      if (posactual >= dif) {
        this.pegaj = 3;
      }
    }
  }

  isresponsive() {
    let scree = window.innerWidth;
    if (scree < 1198) {
      this.isrespon = true;
    }
  }

  listenProvider(){
    this.providerService.getThrowVisita.subscribe((resp)=>{
      var provVisita = resp as VisitasResultadoModel;
      if(provVisita.visit_uuid != null){
        this.getVisitaResultado(provVisita);
      }
    });

    this.providerService.getThrowMessagesVisita.subscribe((resp)=>{
      var provVisitaMessage = resp as VisitaAssetsModel;
      if(provVisitaMessage != null){
        this.getMesageResultado(provVisitaMessage);
      }
    });
  }

  getIdiomas() {
    this.listasService.getIdiomas().subscribe((resp) => {
      this.listaidiomas = resp as LanguagesModel[];
    });
  }

  getMesageResultado(provVisitaMessage: VisitaAssetsModel){
    this.messages = provVisitaMessage;
    console.log("assets++++ ",provVisitaMessage);
  }


  getVisitaResultado(visita: VisitasResultadoModel) {
    this.visitaresultado = visita;
    //imagenes slider
    this.listaImagenesVisita = this.getImagenesVisita();
    this.listaImagenesVisitaLat = this.listaImagenesVisita;
    this.listaImagenesVisitaLat[0].sel = true;

    //info
    this.descripcion = visita.visit_lang_description;
    this.descripcioncorta = this.descripcion.substring(0, 200);
    this.maximopersonas = visita.visit_time_max; //*************************************************visita.visit_max_persons
    this.sumapersonas = 0; ///aqui deberiamos saber disponibles en bbdd!!!!!!!!!!!!!!!!!!
    let preciocalculado: number = Number( (((visita.visit_time_precio ?? 0) * 100)/100) * (((visita.visit_time_duration ?? 0) * 100)/100) ); 
    let preciocalculadost = (this.globalService.getFormatNumber(preciocalculado)); 
    
    this.precioadultos =  preciocalculado;//*********************correccion cuando esten los precios por edades
    this.precioninos = preciocalculado; //*************************correccion cuando esten los precios por edades
    this.preciomenores =  0;

    this.precioadultosst =  preciocalculadost;//correccion cuando esten los precios por edades
    this.precioninosst = preciocalculadost; //correccion cuando esten los precios por edades
    this.preciomenoresst =  "0";
    
    let iso= visita.visit_time_iso;
    this.listaidiomas.forEach((idioma) => {
      if (idioma.iso == iso && this.listaidiomasvisita.map(x=>x.iso).indexOf(iso) == -1) {
        this.listaidiomasvisita.push(idioma);
        this.idiomasdisponibles += idioma.name + ', ';
      }
    });
    
    this.listahoras.forEach((hora) => {
      let initsp = visita.visit_time_init.split(':'); 
      let res = initsp[0] +":"+initsp[1];
      if (hora.value == res ) {
        this.listahorasvisita.push(hora);
      }
    });
    
  }

  getIndexSel() {
    let imm = this.imagenlista.swiperSlides?.nativeElement.childNodes;
    imm.forEach((el: any) => {
      if (el.classList.contains('swiper-slide-active')) {
        this.listaImagenesVisitaLat.forEach((lt: any) => {
          lt.sel = false;
          let idd = el.id.replace('im-', '');
          if (lt.id == idd) {
            lt.sel = true;
          }
        });
      }
    });
  }

  verHora() {
    this.vhora = !this.vhora;
    this.vcale = false;
    this.vpers = false;
    this.vidiom = false;
  }
  verIdioma() {
    this.vhora = false;
    this.vcale = false;
    this.vpers = false;
    this.vidiom = !this.vidiom;
  }
  verPersona() {
    this.vhora = false;
    this.vcale = false;
    this.vpers = !this.vpers;
    this.vidiom = false;
  }
  verCale() {
    this.vhora = false;
    this.vcale = !this.vcale;
    this.vpers = false;
    this.vidiom = false;
  }

  caleinfosel(v: string) {
    this.caleinfo = v;
    if (this.horaSel != null) {
      this.horanovalid = false;
    }
  }
  horainfosel(v: string) {
    this.horainfo = v;
    if (this.horaSel != null) {
      this.horanovalid = false;
    }
  }
  idiomainfosel(v: string) {
    this.idiominfo = v;
    if (this.idiomaSel != null) {
      this.idiomanovalid = false;
    }
  }

  restaradulto() {
    this.adultoSel--;
    this.sumapersonas--;
    this.setPreciototal();
  }
  sumaradulto() {
    if(this.sumapersonas < this.maximopersonas){
      this.adultoSel++;
      this.sumapersonas++;
      this.setPreciototal();
      this.persnovalid = false;
    }    
  }
  restarninos() {
    this.ninosSel--;
    this.sumapersonas--;
    this.setPreciototal();
  }
  sumarninos() {
    if(this.sumapersonas < this.maximopersonas){
      this.ninosSel++;
      this.sumapersonas++;
      this.setPreciototal();
      this.persnovalid = false;
    }
  }
  restarmenores() {
    this.menoresSel--;
    this.sumapersonas--;
    this.setPreciototal();
  }
  sumarmenores() {
    if(this.sumapersonas < this.maximopersonas){
      this.menoresSel++;
      this.sumapersonas++;
      this.setPreciototal();
      this.persnovalid = false;
    }
  }
  setPreciototal() {
    this.precioadultototal = this.adultoSel * (this.precioadultos * 100) / 100;
    this.precioadultototalst = this.globalService.getFormatNumber(this.precioadultototal) ;
    this.precioninostotal = this.ninosSel * (this.precioninos * 100) / 100;
    this.precioninostotalst = this.globalService.getFormatNumber(this.precioninostotal) ;
    this.preciomenorestotal = this.menoresSel * (this.preciomenores * 100) / 100;
    this.preciomenorestotalst = this.globalService.getFormatNumber(this.preciomenorestotal) ;
    this.preciototal = ((this.precioadultototal* 100) + (this.precioninostotal * 100) + (this.preciomenorestotal * 100)) / 100;
    this.preciototalst = this.globalService.getFormatNumber(this.preciototal) ;
  }

  cambiarprivada(priv: any) {
    this.privada = priv.checked;
    if (this.privada) {
      this.adultoSel = this.maximopersonas;
      this.sumapersonas = this.maximopersonas;
      this.ninosSel = 0;
      this.menoresSel = 0;
      this.precioadultototal = (this.maximopersonas * (this.precioadultos * 100)) / 100;
      this.precioninostotal = 0;
      this.preciomenorestotal = 0;
      this.setPreciototal();
      this.persnovalid = false;
    } else {
      this.adultoSel = 0;
      this.precioadultototal = 0;
      this.preciototal = 0;
      this.setPreciototal();
      this.sumapersonas = 0;
    }
  }

  ScrollToElement(element: Element, numpesta: number) {
    this.pestaactiv = numpesta;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }

  abrirverredes() {
    this.verredes = !this.verredes;
  }

  compartir(visita: VisitasResultadoModel, red: string) {
    //comnpartir
    alert('compartir en ' + red);
  }

  abrirvermas() {
    this.vermas = !this.vermas;
  }

  getDaysFromDate(month: any, year: any) {
    const startDate = moment.utc(`${year}/${month}/01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;
    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);
    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday(),
        month: dayObject.format('MM'),
        year: dayObject.format('YYYY'),
      };
    });

    this.monthSelect = arrayDays;
    this.mSelect = this.months[this.dateSelect.format('M') - 1];
    this.ySelect = this.dateSelect.format('YYYY');

    arrayDays.forEach((day: any) => {
      if (
        day.month == this.daySel.month &&
        day.value == this.daySel.value &&
        day.year == this.daySel.year
      ) {
        day.selected = true;
      }
      else{
        day.selected = false;
      }
    });
  }

  changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY'));
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY'));
    }
  }

  clickDay(day: any) {
    this.daySel = day;
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse);
    this.dateValue = objectDate;
    this.vcale = false;
    this.caleinfo = objectDate.format('DD/MM/YYYY');
    this.calenovalid = false;
    this.getDaysFromDate(this.dateSelect.format('MM'), this.dateSelect.format('YYYY'));
  }

  getImagenesVisita() {
    // this.visitaService.getImagenesvisita().subscribe((resp)=>{
    //   this.visitaSel.imagenes = resp as ImagenesModel;
    // })


    return this.visitaService.getImagenesvisita();
  }

  reservarvisita() {
    //validar
    let valido = true;
    if (this.caleinfo == '') {
      valido = false;
      this.calenovalid = true;
    }
    if (this.horainfo == '') {
      valido = false;
      this.horanovalid = true;
    }
    if (this.idiominfo == '') {
      valido = false;
      this.idiomanovalid = true;
    }
    if (this.adultoSel == 0 && this.ninosSel == 0 && this.menoresSel == 0) {
      valido = false;
      this.persnovalid = true;
    }

    if (valido) {
      alert('reservar');
    }
  }
}
