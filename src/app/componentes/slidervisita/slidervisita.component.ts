import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  Renderer2,
  AfterViewInit,
  DebugElement,
} from '@angular/core';

import { BuscadorService } from '../../services/buscador.service';
import { VisitaService } from '../../services/visita.service';
import { ProviderService } from '../../services/provider.service';
import { ListasService } from '../../services/listas.service';
import { GlobalService } from '../../services/global.service';
import { CarritoService } from '../../services/carrito.service';
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
import { CartModel } from 'src/app/models/Cart.model';
import { TimesModel } from 'src/app/models/Times.model';
import { CapitalizePipeComponent } from 'src/app/pipes/capitalize.component';
import { PlatformService } from 'src/app/services/platform.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from 'src/app/models/Reservations.model';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { IMinimatch } from 'minimatch';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextDataModel } from 'src/app/models/TextData.model';
import { debug } from 'console';
import { TimesSelModel } from 'src/app/models/TimesSel.model';
import { DiaModel } from 'src/app/models/Dia.model';
import { HourModel } from 'src/app/models/Hour.model';
import { FranjasModel } from 'src/app/models/Franjas.model';
import { DisponibilityModel } from 'src/app/models/Disponibility.model';
import { ar, de } from 'date-fns/locale';
import * as e from 'express';
import { GuialanguagesModel } from 'src/app/models/Guialanguages.model';

@Component({
  selector: 'app-slidervisita',
  templateUrl: './slidervisita.component.html',
})
export class SlidervisitaComponent implements OnInit, AfterViewInit  {

  @Input() textconts: TextContentsModel = new TextContentsModel();

  @ViewChild('imagenlista') imagenlista: any;
  @ViewChild('detallevisita') detallevisita: any;
  @ViewChild('finaldetalle') finaldetalle: any;
  @ViewChild('detallecale') detallecale: any;
  @ViewChild('fdetallecale') fdetallecale: any;
  sWindow: any;

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
      890: {
        slidesPerView: 1.55,
      },
      590: {
        slidesPerView: 1.25,
      },
      490: {
        slidesPerView: 1,
      },
    },
  };

  listaidiomas: LanguagesModel[] = [];
  listaidiomasvisita: LanguagesModel[] = [];

  isrespon: boolean = false;
  //imagenes

  //times select !!! revisar TODO
  timesSel: TimesSelModel;
  newReserva: ReservationModel;
  //calendario
  monthSelect: any[];
  dateSelect: any;
  dateValue: any;
  mSelect: any;
  ySelect: any;
  week: string[] = [];
  months: string[] = [];
  horas: any[] = [];
  listahoras: HourModel[] = [];
  listahorasvisita: HourModel[] = [];
  //acordeon ocultar
  vcale: boolean = false;
  vhora: boolean = false;
  vidiom: boolean = false;
  vpers: boolean = false;
  pegaj: number = 1;
  //seleccionados
  daySel: any;
  horaSel: any = 0;
  idiomaSel: number = 0;
  adultoSel: number = 0;
  ninosSel: number = 0;
  //info acordeon
  horainfo: string = '';
  caleinfo: string = '';
  idiominfo: string = '';
  maximopersonas: number = 0;
  vendidas: number = 0;
  disponibles: number = 0;
  sumapersonas: number = 0;
  precioadultos: number = 0;
  precioninos: number = 0;
  precioadultototal: number = 0;
  precioninostotal: number = 0;
  preciototal: number = 0;
  privada: boolean = false;
  precioadultosst: string = '0';
  precioninosst: string = '0';
  precioadultototalst: string = '0';
  precioninostotalst: string = '0';
  preciototalst: string = '0';
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
  //redes
  verredes: boolean = false;
  redes: any[] = [];
  idiomasdisponibles: string = '';


  verZonePrecios: boolean = false;
  verZoneDetalle: boolean = false;
  verZoneCancelaciones: boolean = false;
  verZonePuntodeencuentro: boolean = false;
  verPanel: boolean = false;
  secuencial: number = 1;
  defaultvisitime: number = 0;
  preciovisita: number = 0;

  private resizeTimeout: any;
  private previousWidth: number = window.innerWidth;

  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private visitaService: VisitaService,
    private providerService: ProviderService,
    private listasService: ListasService,
    private globalService: GlobalService,
    private carritoService: CarritoService,
    private renderer: Renderer2,
    private platformService: PlatformService,
    private alertasService: AlertasService,
    private http: HttpClient

  ) {
    this.wowService.init();
    this.sWindow = this.platformService.sWindow
  }


  ngOnInit(): void {

    this.newReserva = new ReservationModel();
    this.timesSel = new TimesSelModel();

    this.week =  this.globalService.getWeekIso(); // this.globalService.week;
    this.months = this.globalService.months;
    this.redes = this.globalService.redes;
    this.vcale = true;
    this.isrespon = this.platformService.isrespon;
    this.listahorasvisita = [];
    

  }


  ngAfterViewInit(): void {
    this.listenProvider();

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
        const currentWidth = window.innerWidth;
        if (currentWidth > this.previousWidth) {
            if (currentWidth - this.previousWidth > 100) {
                window.location.reload();
            }
        }
        else if (currentWidth < this.previousWidth) {
            if (this.previousWidth - currentWidth > 100) {
                window.location.reload();
            }
        }
        this.previousWidth = currentWidth;
    }, 10);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    let posactual = this.sWindow.pageYOffset;
    if(!this.isrespon){

      let posdetallevisita = this.detallevisita.nativeElement.offsetTop - 120;
      let posfinaldetalle = this.finaldetalle.nativeElement.offsetTop;

      if (posactual <= posdetallevisita) {
        this.pegaj = 1;
        this.fdetallecale.nativeElement.style.top = 'auto';
      } else if (posactual > posdetallevisita) {
        this.pegaj = 2;

        let hdetallecale = this.detallecale.nativeElement.offsetHeight;
        let dif = posfinaldetalle - hdetallecale;

        this.fdetallecale.nativeElement.style.top = 90+'px';
        if (posactual >= dif) {
          this.pegaj = 3;
          this.fdetallecale.nativeElement.style.top = (dif - posdetallevisita - 40) +'px';
        }
      }
    }
  }


  listenProvider() {
    this.providerService.getThrowVisita.subscribe((resp) => {
      var provVisita = resp as VisitasResultadoModel;

      if (provVisita.duracionmin == null) {
        provVisita.duracionmin = this.defaultvisitime;
      }
      this.getNewReserva(provVisita);
      let hoy = moment();

      let estemes = hoy.format('MM');
      let esteyear = hoy.format('YYYY');
      this.getDaysFromDate(estemes, esteyear).then((res) => {
          if(!res){
            this.dateSelect.add(1, 'months');
            estemes = this.dateSelect.format('MM');
            esteyear = this.dateSelect.format('YYYY');
            this.getDaysFromDate(estemes, esteyear);
          }
      });


    });

  }

  getNewReserva(visita: VisitasResultadoModel) {
    ///creacion de reserva model
    this.newReserva.visit = visita;
    let imgfirst = this.getImageFirst(this.newReserva.visit);
    if(imgfirst != null){
      imgfirst.sel = true;
    }

    //info
    this.descripcion = this.newReserva.visit.descripcion;
    this.descripcioncorta = this.descripcion.substring(0, 200);
    this.maximopersonas = this.newReserva.visit.nummax ?? 0;
    this.vendidas = 0; /// calcular vendidas para esa fecha/hora y visita
    this.listaidiomas = this.listasService.getIdiomas();
    this.listaidiomasvisita = [];
    this.idiomaSel = 0 ;
    this.disponibles = this.maximopersonas - this.vendidas;
    
    this.newReserva.visit.visitlanguages.forEach((idiomaiso, index) => {
      let idiom: LanguagesModel = this.listaidiomas.find((x) => x.id == idiomaiso.language_id ) ?? new LanguagesModel();
      this.newReserva.nombreidioma = this.visitaService.getNombreidioma(idiom.id);
    })
    
    this.getCalculoPrecio();
    this.preciovisita = this.globalService.getPrecioByVisit(this.newReserva.visit);
    
    this.idiomasdisponibles = "";

    let listaidiomasdefault = this.listasService.getIdiomas();
    listaidiomasdefault.forEach(idiomdef => {
      let idiomasumdef = idiomdef.name.toLowerCase();
      this.idiomasdisponibles += ( idiomasumdef ) + ', ';
    });

  }

  getImageFirst(visita: VisitasResultadoModel) {
    return visita.mediafiles[0];
  }

  getPrecio(duracionmin: number, preciohora: number){
    return this.globalService.getPrecio(duracionmin, preciohora);
  }

  getCalculoPrecio() {
    let precio = this.globalService.getPrecioByVisit(this.newReserva.visit) ;
    this.precioadultos = precio;
    this.precioninos = precio;
    this.precioadultosst = this.globalService.getFormatNumber(
      (Number(this.precioadultos) * 100) / 100
    );
    this.precioninosst = this.globalService.getFormatNumber(
      (Number(this.precioninos) * 100) / 100
    );
  }


  getIndexSel() {
    let imm = this.imagenlista?.swiperSlides?.nativeElement.childNodes;
    if(imm != null){
      imm.forEach((el: any) => {
        if (el.classList?.contains('swiper-slide-active')) {
          this.visitaresultado?.mediafiles?.forEach((lt: any) => {
            lt.sel = false;
            let idd = el.id.replace('im-', '');
            if (lt.id == idd) {
              lt.sel = true;
            }
          });
        }
      });
    }
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

  horainfosel(v: string) {
    this.horainfo = v;
    this.horaSel = this.listahoras.filter((x) => x.hora == v)[0];
    if (this.horaSel != null) {
      this.horanovalid = false;
    }
    if (this.timesSel.hour != this.horaSel) {
      this.getCalculoPrecio();
    }
    this.setSecuencial();
    this.setInfoVendidas();

  }

  idiomainfosel(v: number) {
    this.idiomaSel = this.listaidiomas.filter((x) => x.id == v)[0].id;
    this.idiominfo = this.listaidiomas.filter((x) => x.id == v)[0].name;
    if (this.idiomaSel != null) {
      this.idiomanovalid = false;
    }
    this.setSecuencial();
    this.setInfoVendidas();
  }

  setInfoVendidas(){
    let fecha = this.daySel.year+"-"+ this.daySel.month+"-"+this.daySel.value;
    if(this.horaSel != 0 && this.idiomaSel != 0){
      this.setVendidas( fecha , this.horaSel.id, this.idiomaSel);
    }
  }

  restaradulto() {
    this.adultoSel--;
    this.sumapersonas--;
    this.setPreciototal();
  }

  sumaradulto() {
    if (this.sumapersonas < this.disponibles) {
      this.adultoSel++;
      this.sumapersonas++;
      this.setPreciototal();
      this.persnovalid = false;
    }
    else{
      this.alertasService.alertaInfo("Madguides", "no puede seleccionar más de las disponibles")
    }
  }

  restarninos() {
    this.ninosSel--;
    this.sumapersonas--;
    this.setPreciototal();
  }

  sumarninos() {
    if (this.sumapersonas < this.disponibles) {
      this.ninosSel++;
      this.sumapersonas++;
      this.setPreciototal();
      this.persnovalid = false;
    }
    else{
      this.alertasService.alertaInfo("Madguides", "no puede seleccionar más de las disponibles")
    }
  }

  setPreciototal() {
    this.precioadultototal =
      (this.adultoSel * (this.precioadultos * 100)) / 100;
    this.precioadultototalst = this.globalService.getFormatNumber(
      this.precioadultototal
    );
    this.precioninostotal = (this.ninosSel * (this.precioninos * 100)) / 100;
    this.precioninostotalst = this.globalService.getFormatNumber(
      this.precioninostotal
    );

    this.preciototal =
      (this.precioadultototal * 100 +
        this.precioninostotal * 100 ) /
      100;
    this.preciototalst = this.globalService.getFormatNumber(this.preciototal);
    this.setSecuencial();
  }

  cambiarprivada(priv: any) {
    this.privada = priv.checked;
    if (this.privada) {
      this.adultoSel = this.maximopersonas;
      this.sumapersonas = this.maximopersonas;
      this.ninosSel = 0;
      this.precioadultototal =
        (this.maximopersonas * (this.precioadultos * 100)) / 100;
      this.precioninostotal = 0;
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

  compartir(visita: VisitasResultadoModel, red: string) {

    let url = "";
    if(red == 'facebook'){
      url = "https://www.facebook.com/sharer/sharer.php?u=https://madguides.es/"+this.router.url;
    }
    else if(red == 'twitter'){
      url = "https://twitter.com/intent/tweet?url=https://madguides.es/"+this.router.url+"&text="+this.visitaresultado.categorias[0].name;
    }
    else if(red == 'instagram'){
      url = "https://www.instagram.com/?url=https://madguides.es/"+this.router.url;
    }

    if(url != ""){
      this.sWindow.open(url, '_blank');
    }
  }

  abrirvermas() {
    this.vermas = !this.vermas;
  }

  async getDaysFromDate(month: any, year: any) {
 
    const diasmesdisponibilities = await this.visitaService.getDisponibilitiesVisita(this.newReserva.visit.id, month, year).toPromise() as number[];
    const startDate = moment.utc(`${year}/${month}/01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;
    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);
    let arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      const dayNumber = parseInt(a, 10) + 1;
      const dayObject = moment(`${year}-${month}-${dayNumber}`);
      return {
        name: dayObject.format('dddd'),
        value: dayObject.format('DD'),
        indexWeek: dayObject.isoWeekday(),
        month: dayObject.format('MM'),
        year: dayObject.format('YYYY'),
      };
    });

    let diasvisita: string[] = [];
    let hoy = new Date();
    hoy.setDate(hoy.getDate() + 3);
    //let diasSemana: number[] = [1,2,3,4,5,6,7];
    const convertirDiaSemana = (day: number) => {
      return day === 0 ? 7 : day;  // Si es domingo (0), cambiarlo a 7; el resto queda igual
    };

    this.newReserva.visit.visithours.forEach((visithour: any) => {
      let diascomoesediasemana: Date[] = [];
      for (let i = 0; i < 365; i++) {
        let dia = new Date(hoy);
        dia.setDate(hoy.getDate() + i);
        let diaSemanaActual = convertirDiaSemana(dia.getDay());
        if (diaSemanaActual == parseInt(visithour.diasemana)) {
          diascomoesediasemana.push(dia);
        }
      }
      diascomoesediasemana.forEach((diacomoesediasemana: any) => {
        diasvisita.push(diacomoesediasemana.toISOString().split('T')[0]);
      });
    });
    
    this.monthSelect = arrayDays;
    this.mSelect = this.globalService.getbyMes(this.dateSelect.format('M') - 1);  //  this.months[this.dateSelect.format('M') - 1];
    this.ySelect = this.dateSelect.format('YYYY');
    if (this.daySel != null) {
      arrayDays.forEach((day: any) => {
        day.selected = false;
        if (
          day.month == this.daySel.month &&
          day.value == this.daySel.value &&
          day.year == this.daySel.year
        ) {
          day.selected = true;
        }
      });
    }
    else if(diasvisita != null) {
      this.timesSel.date = diasvisita[0];
    }
    
    ///marcar dias de la visita y seleccionado de ese mes
    /// tener en cuenta si el primer dia posible ya esta en mes siguiente de pasar a mes siguiente
    let result: boolean = false
    arrayDays.forEach((day: any) => {
      let esafecha = day.year + '-' + day.month + '-' + day.value;
      day.visitday = false;

      diasvisita.forEach( (dvt)=>{
        if(dvt == esafecha && this.mSelect != "Mayo" ){
          if(diasmesdisponibilities != null){
              if(diasmesdisponibilities.includes(parseInt(day.value))){
                day.visitday = true;
              }
          }
          else{
            day.visitday = true;
          }
          if(day.visitday){
            result = true;
          }
        }
      })
    });
    
    return result;
  }


  getCherryDay(){
    if (  this.timesSel.date != null && this.timesSel.date != "") {
      let yea = this.timesSel.date.split('-')[0];
      let mon = this.timesSel.date.split('-')[1];
      let da = this.timesSel.date.split('-')[2];
      const dayObject = moment(`${yea}-${mon}-${da}`);
      let day: any = {
        name: dayObject.format('dddd'),
        value: da,
        indexWeek: dayObject.isoWeekday(),
        month: dayObject.format('MM'),
        year: dayObject.format('YYYY'),
      };
      day.visitday = true;
      this.daySel = day;
      this.getDaysFromDate(this.daySel.month , this.daySel.year);
      this.clickDay(day)
      this.vcale = true;
    }
    else{
      console.log("getCherry no timesel", this.timesSel);
    }
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
    if (day.visitday) {
      this.daySel = day;
      const monthYear = this.dateSelect.format('YYYY-MM');
      const parse = `${monthYear}-${day.value}`;
      const objectDate = moment(parse);
      this.dateValue = objectDate;
      this.vcale = false;
      this.caleinfo =  this.globalService.getFechaleg(objectDate.format('DD/MM/YYYY'));
      this.calenovalid = false;

      this.getDaysFromDate(
        this.dateSelect.format('MM'),
        this.dateSelect.format('YYYY')
      );
    }
    this.setSecuencial();
    this.setListaHoras();
    this.adultoSel = 0;
    this.ninosSel = 0;
    this.timesSel.date = this.daySel.year+"-"+ this.daySel.month+"-"+this.daySel.value;
  }


  setSecuencial() {
    this.secuencial = 0;
    if (this.daySel == null) {
      this.secuencial = 1;
    } else if (this.horaSel == 0) {
      this.secuencial = 2;
    } else if (this.idiomaSel == 0) {
      this.secuencial = 3;
    } else if (this.adultoSel == 0 && this.ninosSel == 0 ) {
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
    if (this.adultoSel == 0 && this.ninosSel == 0 ) {
      valido = false;
      this.persnovalid = true;
    }

    if (valido) {
      let carrito: CartModel = new CartModel();
      carrito = this.carritoService.getCart();

      this.newReserva.adults = this.adultoSel;
      this.newReserva.children = this.ninosSel;
      this.newReserva.total = this.preciototal;
      this.newReserva.fecha = this.timesSel.date ;
      this.newReserva.language_id = this.idiomaSel;
      this.newReserva.visit_hours_id = this.horaSel.id ;

      if (carrito.reservas == null) {
        carrito.reservas = [];
      }
      carrito.reservas.push(this.newReserva );
      carrito.total = Number(this.globalService.getFormatNumber(carrito.total + this.preciototal));
      carrito.totalfinal = Number(this.globalService.getFormatNumber(carrito.total * (1 + 0.21)));
      this.carritoService.saveCart(carrito);
      ///actualizar carrito menu
      this.providerService.setThrowCarritoupdate(carrito);
      this.alertasService.alertaPeq("Producto agregado al carrito");
      this.newReserva = new ReservationModel();
      this.router.navigate(['/buscador']);
    }
  }


  async setListaHoras(){
  
    const convertirDiaSemana = (day: number) => {
      return day === 0 ? 7 : day;  // Si es domingo (0), cambiarlo a 7; el resto queda igual
    };
    if(this.daySel != null){
      if(this.listahoras.length == 0){
        const resp = await this.listasService.getHoras().toPromise();
        if(resp != null){
          this.listahoras = resp as HourModel[];
        }
      }
      this.listahorasvisita = [];
      let listahorasvisitafiltrada: TimesSelModel[] = [];
      let year = parseInt(this.daySel.year);
      let month = parseInt(this.daySel.month) - 1; // Restamos 1 porque los meses en JS empiezan desde 0 (0 = Enero)
      let day = parseInt(this.daySel.value);
      let tdate = new Date(year, month, day);
      let esediasemana =  convertirDiaSemana(tdate.getDay());
      this.listaidiomasvisita = [];
      this.idiomaSel = 0;
      this.idiominfo = "";
      this.horaSel = 0;
      this.horainfo = "";
      const disponibilitiesdia = await this.visitaService.getDisponibilitiesdiasemana(esediasemana).toPromise() as DisponibilityModel[];
      const languagesdia = await this.visitaService.getLanguagesdiasemana(esediasemana).toPromise() as GuialanguagesModel[];

      disponibilitiesdia.forEach((disponib) => {
          this.newReserva.visit.visithours.forEach((visithour) => {
              if (parseInt(visithour.hours_id) >= disponib.init_hours_id && parseInt(visithour.hours_id) <= disponib.end_hours_id) {
                  if(listahorasvisitafiltrada.findIndex(x => x.hours_id == visithour.hours_id && x.diasemana == visithour.diasemana) == -1){
                      listahorasvisitafiltrada.push(visithour) ;
                  }
              }
          });
      });
     
      languagesdia.forEach((gl) => {
          this.newReserva.visit.visitlanguages.forEach((idiomaiso, index) => {
              let idiom: LanguagesModel = this.listaidiomas.find((x) => x.id == idiomaiso.language_id ) ?? new LanguagesModel();

              if(this.listaidiomasvisita.findIndex(x => x.id == idiom.id) == -1){
                  this.listaidiomasvisita.push(idiom);
              }
              
          });
      });

      this.listahorasvisita = [];
      this.listahoras?.forEach((hora) => {
        listahorasvisitafiltrada.forEach((v) => {
          if(esediasemana == v.diasemana){
            if (hora.hora == v.hour && this.listahorasvisita.findIndex(x => x.id == parseInt(v.hours_id)) == -1 ) {
              this.listahorasvisita.push(hora);
            }
          }
        });
      });

    }
  }

  async setVendidas(fecha: string, horaid: number, languageid: number){
      let visitid = this.newReserva.visit.id;
      let vendidas = await this.visitaService.getVendidas( visitid, fecha, horaid, languageid).toPromise() as number;
      if(vendidas != null){
        this.vendidas = vendidas;
        this.disponibles = this.maximopersonas - this.vendidas;
      }
  }

}
