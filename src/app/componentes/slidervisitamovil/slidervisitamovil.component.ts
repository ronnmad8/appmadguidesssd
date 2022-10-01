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
import { ListasService } from '../../services/listas.service';
import { Options } from '@angular-slider/ngx-slider';
import { EventsrespModel } from 'src/app/models/Eventsresp.model';
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

@Component({
  selector: 'app-slidervisitamovil',
  templateUrl: './slidervisitamovil.component.html',
})
export class SlidervisitamovilComponent implements OnInit {
  @Input() visitaId: number = 0;
  @ViewChild('imagenlista') imagenlista: any;
  @ViewChild('detallevisita') detallevisita: any;
  @ViewChild('finaldetalle') finaldetalle: any;
  @ViewChild('detallecale') detallecale: any;
  @ViewChild('fdetallecale') fdetallecale: any;

  visita: VisitasModel = new VisitasModel();
  tipos: string[] = [];
  listaImagenesVisita: ImagenesModel[] = [];
  listaImagenesVisitaLat: ImagenesModel[] = [];
  isrespon: boolean = false;

  public config: SwiperConfigInterface = {
    autoplay: false,
    effect: 'slide',
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    slideToClickedSlide: false,
    speed: 300,
    mousewheel: false,
    scrollbar: false,
    watchSlidesProgress: false,
    navigation: true,
    keyboard: true,
    pagination: false,
    centeredSlides: true,
    loop: true,
    loopedSlides: 0,
    initialSlide: 0,
    loopFillGroupWithBlank: true,
    roundLengths: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    spaceBetween: 1,
  };

  ////////////
  week: any = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];
  months: any = [
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
  listahoras: any = [
    { key: '1', value: '08:00' },
    { key: '2', value: '09:00' },
    { key: '3', value: '10:00' },
    { key: '4', value: '11:00' },
    { key: '5', value: '12:00' },
    { key: '6', value: '13:00' },
    { key: '7', value: '14:00' },
  ];

  listaidiomas: any[] = [
    { key: '1', value: 'español' },
    { key: '2', value: 'english' },
    { key: '3', value: 'français' },
  ];
  redes: any = [
    { name: 'facebook', logo: 'assets/images/i-facebookN.svg' },
    { name: 'twitter', logo: 'assets/images/i-twitterN.svg' },
    { name: 'instagram', logo: 'assets/images/i-instagramN.svg' },
  ];
  monthSelect: any[];
  dateSelect: any;
  dateValue: any;
  mSelect: any;
  ySelect: any;
  privada: boolean = false;
  vcale: boolean = false;
  vhora: boolean = false;
  vidiom: boolean = false;
  vpers: boolean = false;
  pegaj: number = 1;
  //sels
  daySel: any;
  horaSel: any = 0;
  idiomaSel: any = 0;
  adultoSel: number = 0;
  ninosSel: number = 0;
  menoresSel: number = 0;
  maximopersonas: number = 0;
  horainfo: string = '';
  caleinfo: string = '';
  idiominfo: string = '';

  precioadultos: number = 0;
  precioninos: number = 0;
  preciomenores: number = 0;

  precioadultototal: number = 0;
  precioninostotal: number = 0;
  preciomenorestotal: number = 0;
  preciototal: number = 0;

  calenovalid: boolean = false;
  horanovalid: boolean = false;
  idiomanovalid: boolean = false;
  persnovalid: boolean = false;
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
  verredes: boolean = false;

  verZonePrecios: boolean = false;
  verZoneDetalle: boolean = false;
  verZoneCancelaciones: boolean = false;
  verZonePuntodeencuentro: boolean = false;
  verPanel: boolean = false;
  secuencial: number = 1;
  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private visitaService: VisitaService,
    private listasService: ListasService,
    private renderer: Renderer2
  ) {
    this.wowService.init();
  }

  ngOnInit(): void {
    this.vcale = true;
    this.getVisita();
    this.isresponsive();
    let hoy = moment();
    let estemes = hoy.format('MM');
    let esteyear = hoy.format('YYYY');

    this.getDaysFromDate(estemes, esteyear);

    this.precioadultos = 50;
    this.precioninos = 40;
    this.preciomenores = 0;
    this.maximopersonas = 40;

    this.descripcion =
      'Aunque la frase no tiene sentido, tiene una larga historia. Durante varios siglos, los tipógrafos han utilizado esta frase para mostrar las características más distintivas de sus fuentes. Se utiliza porque las letras que contiene y el espaciado entre caracteres de esas combinaciones revelan de la mejor forma posible el espesor, el diseño y otras características importantes del tipo de letra. Un ejemplar de 1994 de la revista Before & After asocia Lorem ipsum  a una versión latina revuelta de un pasaje de de Finibus Bonorum et Malorum, un tratado sobre la teoría de la ética escrito por Cicerón en el año 45 A.C. El pasaje se ha extraído del texto que dice Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit  que se traduciría como No hay nadie que ame el dolor mismo, que lo busque y lo quiera tener, simplemente porque es el dolor.';
    this.descripcioncorta = this.descripcion.substring(0, 200);
    this.detalles =
      'sentido, tiene una larga historia. Durante vari sentido, tiene una larg sentido, tiene una larga historia. Durante vari sentido, tiene una larga historia. Durante vari';
    this.idomasdisponibles = 'Tour disponibles en español, english, français';
    this.cancelaciones =
      'Cancelacion gratuita. Si no vas a poder asistir al tour. por favor cancela la reserva, sino el guía te estará esperando';
    this.puntodeencuentro =
      'Nos encontraremos delante del museo en la calle de Ruiz de Alarcón, 23, 28014 Madrid frente a la estatua de Velázquez  ';
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

  getVisita() {
    this.visita = this.visitaService.getVisita(1);
    this.listaImagenesVisita = this.visitaService.getImagenesvisita(1);
    this.listaImagenesVisitaLat = this.listaImagenesVisita;
    this.listaImagenesVisitaLat[0].sel = true;
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
    if (this.daySel != null) {
      this.calenovalid = false;
    }
  }
  horainfosel(v: any) {
    let checke = v.target.checked;
    if (checke) {
      this.horainfo = this.listahoras.find(
        (el: any) => el.key == v.target.value
      ).value;
      this.horaSel = v.target.value;
      if (this.horaSel != null) {
        this.horanovalid = false;
      }
      this.setSecuencial();
    }
  }
  idiomainfosel(v: any) {
    let checke = v.target.checked;
    if (checke) {
      this.idiominfo = this.listaidiomas.find(
        (el: any) => el.key == v.target.value
      ).value;
      this.idiomaSel = v.target.value;
      if (this.idiomaSel != null) {
        this.idiomanovalid = false;
      }
      this.setSecuencial();
    }
  }

  restaradulto() {
    this.adultoSel--;
    this.precioadultototal = this.adultoSel * this.precioadultos;
    this.preciototal =
      this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
    this.setSecuencial();
  }
  sumaradulto() {
    this.adultoSel++;
    this.precioadultototal = this.adultoSel * this.precioadultos;
    this.preciototal =
      this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
    this.persnovalid = false;
    this.setSecuencial();
  }
  restarninos() {
    this.ninosSel--;
    this.precioninostotal = this.ninosSel * this.precioninos;
    this.preciototal =
      this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
    this.setSecuencial();
  }
  sumarninos() {
    this.ninosSel++;
    this.precioninostotal = this.ninosSel * this.precioninos;
    this.preciototal =
      this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
    this.persnovalid = false;
    this.setSecuencial();
  }
  restarmenores() {
    this.menoresSel--;
    this.preciomenorestotal = this.menoresSel * this.preciomenores;
    this.preciototal =
      this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
    this.setSecuencial();
  }
  sumarmenores() {
    this.menoresSel++;
    this.preciomenorestotal = this.menoresSel * this.preciomenores;
    this.preciototal =
      this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
    this.persnovalid = false;
    this.setSecuencial();
  }

  cambiarprivada(priv: any) {
    this.privada = priv.checked;
    if (this.privada) {
      this.adultoSel = this.maximopersonas;
      this.ninosSel = 0;
      this.menoresSel = 0;
      this.precioadultototal = this.maximopersonas * this.precioadultos;
      this.precioninostotal = 0;
      this.preciomenorestotal = 0;
      this.preciototal = this.precioadultototal;
      this.persnovalid = false;
    } else {
      this.adultoSel = 0;
      this.precioadultototal = 0;
      this.preciototal = 0;
    }
    this.setSecuencial();
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

  compartir(visita: VisitasModel, red: string) {
    //comnpartir
    alert('compartir en ' + red);
  }

  abrirvermas() {
    this.vermas = !this.vermas;
  }

  abrirVerZonePrecios() {
    this.verZonePrecios = !this.verZonePrecios;
  }

  abrirVerZoneDetalle() {
    this.verZoneDetalle = !this.verZoneDetalle;
  }

  abrirVerZoneCancelaciones() {
    this.verZoneCancelaciones = !this.verZoneCancelaciones;
  }

  abrirVerZonePuntodeencuentro() {
    this.verZonePuntodeencuentro = !this.verZonePuntodeencuentro;
  }

  abrirVerPanel() {
    this.verPanel = true;
  }

  cerrarVerPanel() {
    this.verPanel = false;
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
      };
    });

    this.monthSelect = arrayDays;
    this.mSelect = this.months[this.dateSelect.format('M') - 1];
    this.ySelect = this.dateSelect.format('YYYY');
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
    this.setSecuencial();
  }

  setSecuencial() {
    this.secuencial = 0;
    if (this.daySel == null) {
      this.secuencial = 1;
    } else if (this.horaSel == 0) {
      this.secuencial = 2;
    } else if (this.idiomaSel == 0) {
      this.secuencial = 3;
    } else if (this.adultoSel == 0 && this.ninosSel == 0 && this.menoresSel == 0) {
      this.secuencial = 4;
    }
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
      alert('valido');
    }
  }
}
