import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
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
import { VisitaAssetsModel } from 'src/app/models/VisitaAssets.model';
import { CartModel } from 'src/app/models/Cart.model';
import { TimesModel } from 'src/app/models/Times.model';
import { CapitalizePipeComponent } from 'src/app/pipes/capitalize.component';
import { PlatformService } from 'src/app/services/platform.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { ImagenesVisitaModel } from 'src/app/models/ImagenesVisita.model';

@Component({
  selector: 'app-slidervisita',
  templateUrl: './slidervisita.component.html',
})
export class SlidervisitaComponent implements OnInit{
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
  listaImagenesVisita: ImagenesVisitaModel[] = [];
  listaImagenesVisitaLat: ImagenesVisitaModel[] = [];

  //times select
  timesSel: TimesModel = new TimesModel();

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
  vendidas: number = 0;
  disponibles: number = 0;
  sumapersonas: number = 0;
  precioadultos: number = 0;
  precioninos: number = 0;
  preciomenores: number = 0;
  precioadultototal: number = 0;
  precioninostotal: number = 0;
  preciomenorestotal: number = 0;
  preciototal: number = 0;
  privada: boolean = false;
  precioadultosst: string = '0';
  precioninosst: string = '0';
  preciomenoresst: string = '0';
  precioadultototalst: string = '0';
  precioninostotalst: string = '0';
  preciomenorestotalst: string = '0';
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
  messages: VisitaAssetsModel = new VisitaAssetsModel();
  idiomasdisponibles: string = '';


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
    private providerService: ProviderService,
    private listasService: ListasService,
    private globalService: GlobalService,
    private carritoService: CarritoService,
    private renderer: Renderer2,
    private platformService: PlatformService,
    private alertasService: AlertasService
    
  ) {
    this.wowService.init();
    this.sWindow = this.platformService.sWindow
  }

  ngOnInit(): void {
   
    this.listenProvider();
    this.week = this.globalService.week;
    this.months = this.globalService.months;
    this.redes = this.globalService.redes;
    this.listahoras = this.globalService.listahoras;

    this.vcale = true;
    this.isrespon = this.platformService.isrespon;
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
      
      if (provVisita.visit_uuid != null) {
        this.getVisitaResultado(provVisita);

        let hoy = moment();
        let estemes = hoy.format('MM');
        let esteyear = hoy.format('YYYY');
        this.getDaysFromDate(estemes, esteyear);
        this.getCherryDay();
      }
    });

    this.providerService.getThrowMessagesVisita.subscribe((resp) => {
      var provVisitaMessage = resp as VisitaAssetsModel;
      if (provVisitaMessage != null) {
        this.getMesageResultado(provVisitaMessage);
      }
    });
  }


  getMesageResultado(provVisitaMessage: VisitaAssetsModel) {
    this.messages = provVisitaMessage;
    console.log("resultado ",this.messages);
  }

  getVisitaResultado(visita: VisitasResultadoModel) {
    this.visitaresultado = visita;
    console.log(
      '----VISITA RESULTADO',
      this.visitaresultado
    );
    this.listaImagenesVisita = []
    this.listaImagenesVisitaLat = [];
    this.getImagenesVisita();


    //info
    this.descripcion = visita.visit_lang_description;
    this.descripcioncorta = this.descripcion.substring(0, 200);

    if (this.timesSel != null) {
      this.timesSel = visita.visit_time[0];
    }
    
    this.maximopersonas = this.timesSel.available;
    this.vendidas = this.timesSel.buy;
    this.disponibles = this.maximopersonas - this.vendidas;
   
    this.getCalculoPrecio();

    ///get idiomas
    this.listasService.getIdiomas().subscribe((resp) => {
      this.listaidiomas = resp as LanguagesModel[];
      this.listaidiomasvisita = [];
      this.visitaresultado.iso_disponible.forEach((idiomaiso, index) => {
        let idiom: LanguagesModel = this.listaidiomas.find((x) => x.iso == idiomaiso) ?? new LanguagesModel();
        idiom.id = index;
        this.listaidiomasvisita.push(idiom);
        let idiomasum = idiom.name.toLowerCase();
        this.idiomasdisponibles += (  idiomasum ) + ', ';
      })

    });
    
    this.idiomaSel = this.visitaresultado.visit_time[0].iso ;

    this.listahoras.forEach((hora) => {
      let initsp = this.timesSel.init.split(':');
      let res = initsp[0] + ':' + initsp[1];
      if (hora.value == res) {
        this.listahorasvisita.push(hora);
      }
      
    });
  
    //buscar si hay mas horas mismo dia
    this.visitaresultado.visit_time.forEach((v) => {
      if (v.date == this.timesSel.date && v.init != this.timesSel.init) {
        let initsp = v.init.split(':');
        let res = initsp[0] + ':' + initsp[1];
        this.listahorasvisita.push({ value: res, viewValue: res });
      }
    });
    
  }


  getImageFirst(visita: VisitasResultadoModel) {
    var imagen1: ImagenesModel = new ImagenesModel();
    imagen1.id = 1;
    imagen1.title = visita.visit_image_title;
    imagen1.description = visita.visit_image_description;
    imagen1.alt = '';
    imagen1.iso = visita.visit_image_iso;
    imagen1.uuid = visita.visit_image_uuid;
    imagen1.url = visita.visit_image_url;
    imagen1.url_movil = visita.visit_image_url_movil;
    imagen1.url_galleria = visita.visit_image_url_gallery;
    imagen1.name = visita.visit_image_name;
    return imagen1;
  }


  getCalculoPrecio() {
    
    this.precioadultos = this.timesSel.list_price.price;
    this.precioninos = this.timesSel.list_price.second;
    this.preciomenores = 0;
    this.precioadultosst = this.globalService.getFormatNumber(
      (Number(this.precioadultos) * 100) / 100
    ); //correccion cuando esten los precios por edades
    this.precioninosst = this.globalService.getFormatNumber(
      (Number(this.precioninos) * 100) / 100
    ); //correccion cuando esten los precios por edades
    this.preciomenoresst = this.preciomenores.toString();
  }


  getIndexSel() {
    let imm = this.imagenlista.swiperSlides?.nativeElement.childNodes;
    if(imm != null){
      imm.forEach((el: any) => {
        if (el.classList?.contains('swiper-slide-active')) {
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
    this.horaSel = this.listahoras.filter((x) => x.value == v)[0].key;
    if (this.horaSel != null) {
      this.horanovalid = false;
    }
    if (this.timesSel.init != this.horaSel) {
      this.timesSel =
        this.visitaresultado.visit_time.find((x) => x.init == this.horaSel) ??
        this.timesSel;
      this.getCalculoPrecio();
    }
    this.setSecuencial();
  }

  idiomainfosel(v: string) {
    this.idiomaSel = this.listaidiomas.filter((x) => x.iso == v)[0].name;
    this.idiominfo = this.idiomaSel;
    if (this.idiomaSel != null) {
      this.idiomanovalid = false;
    }
    this.setSecuencial();
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

  restarmenores() {
    this.menoresSel--;
    this.sumapersonas--;
    this.setPreciototal();
  }
  sumarmenores() {
    if (this.sumapersonas < this.maximopersonas) {
      this.menoresSel++;
      this.sumapersonas++;
      this.setPreciototal();
      this.persnovalid = false;
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
    this.preciomenorestotal =
      (this.menoresSel * (this.preciomenores * 100)) / 100;
    this.preciomenorestotalst = this.globalService.getFormatNumber(
      this.preciomenorestotal
    );
    this.preciototal =
      (this.precioadultototal * 100 +
        this.precioninostotal * 100 +
        this.preciomenorestotal * 100) /
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
      this.menoresSel = 0;
      this.precioadultototal =
        (this.maximopersonas * (this.precioadultos * 100)) / 100;
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
      url = "https://twitter.com/intent/tweet?url=https://madguides.es/"+this.router.url+"&text="+this.visitaresultado.category_lang_title;
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
    ///dias de la visita
    let diasvisita: TimesModel[] = [];
    this.visitaresultado.visit_time.forEach((dia: TimesModel) => {
      diasvisita.push(dia);
    });

    ///marcar dias de la visita y seleccionado de ese mes
    arrayDays.forEach((day: any) => {
      let esafecha = day.year + '-' + day.month + '-' + day.value;
      day.visitday = false;

      if (diasvisita.find((x) => x.date == esafecha)) {
        day.visitday = true;
        if (esafecha == this.timesSel.date) {
          day.selected = true;
        }
      }
    });
    
  }


  getCherryDay(){
    if (this.timesSel != null) {
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

      let coi = this.visitaresultado.visit_time.find(
        (x) => x.date == day.year + '-' + day.month + '-' + day.value
      );
      if (coi != null) {
        this.timesSel = coi;
        this.getCalculoPrecio();
      }
      this.getDaysFromDate(
        this.dateSelect.format('MM'),
        this.dateSelect.format('YYYY')
      );
    }
    this.setSecuencial();
  }

  getImagenesVisita() {
    this.visitaService.getVisitaImagenes(this.visitaresultado.visit_uuid).subscribe((resp)=>{
      this.visitaresultado.visit_image = resp as ImagenesVisitaModel[];
      this.listaImagenesVisita = this.visitaresultado.visit_image;
      this.listaImagenesVisitaLat = this.visitaresultado.visit_image;
      this.listaImagenesVisitaLat[0].sel = true;
      
    })
    
  }



  setSecuencial() {
    
    this.secuencial = 0;
    if (this.daySel == null) {
      this.secuencial = 1;
    } else if (this.horaSel == 0) {
      this.secuencial = 2;
    } else if (this.idiomaSel == "") {
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
      let carrito: CartModel = new CartModel();
      carrito = this.carritoService.getCart();
      this.visitaresultado.adultos = this.adultoSel;
      this.visitaresultado.ninos = this.ninosSel;
      this.visitaresultado.menores = this.menoresSel;
      this.visitaresultado.precio = this.preciototal;
      this.visitaresultado.fecha = this.dateValue;
      this.visitaresultado.hora = this.horainfo;
      this.visitaresultado.horario_uuid = this.timesSel.uuid ;
      this.visitaresultado.idioma = this.idiominfo;
      if (carrito.visitasPedido == null) {
        carrito.visitasPedido = [];
      }
      carrito.visitasPedido.push(this.visitaresultado);
      carrito.total = Number(this.globalService.getFormatNumber(carrito.total + this.preciototal));
      carrito.totalfinal = Number(this.globalService.getFormatNumber(carrito.total * (1 + carrito.taxamt)));
      this.carritoService.saveCart(carrito);
      ///actualizar carrito menu
      this.providerService.setThrowCarritoupdate(carrito);
      this.alertasService.alertaPeq("Producto agregado al carrito");
      this.router.navigate(['/buscador']);
    }
  }
}
