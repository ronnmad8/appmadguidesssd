import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { BuscadorService } from '../../services/buscador.service';
import { ListasService } from '../../services/listas.service';
import { GlobalService } from '../../services/global.service';
import { Options } from '@angular-slider/ngx-slider';
import { ResultadoModel } from 'src/app/models/Resultado.model';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { DuracionesModel } from 'src/app/models/Duraciones.model';
import { FiltersModel } from 'src/app/models/Filters.model';
import { LanguagesModel } from 'src/app/models/Languages.model';
import { FranjasModel } from 'src/app/models/Franjas.model';
import { TagsModel } from 'src/app/models/Tags.model';
import * as moment from 'moment';
import { CategoriasModel } from 'src/app/models/Categorias.model';
import { OrdenModel } from 'src/app/models/Orden.model';
import { CalendarModel } from 'src/app/models/calendar.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PlatformService } from 'src/app/services/platform.service';
import { TextosearchModel } from 'src/app/models/Textosearch.model';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent implements OnInit {
  @Output() filtrarBusqueda = new EventEmitter();
  @Input() cargado: boolean = false;
  @Input() messageSearchData: TextosearchModel = new TextosearchModel();

  sWindow: any;
  maxvalueprecio = 300;
  listaresultados: VisitasResultadoModel[] = [];
  resultado: ResultadoModel = new ResultadoModel();
  loading: boolean = false;
  monthSelect: any[];
  dateSelect: any;
  dateValue: any;
  mSelect: any;
  ySelect: any;
  dayIniSel: any;
  dayFinSel: any;
  week: string[] = [];
  months: string[] = [];
  verFiltroFechas: boolean = false;
  mesIni: string = '';
  diaIni: number = 0;
  mesFin: string = '';
  diaFin: number = 0;
  fechasSel: any[] = [];
  isrespon: boolean = false;

  valormaximo: number = 0;
  valorfiltroprecio: number = 0;
  vfiltros: boolean = true;
  veridiomas: boolean = false;
  verduracion: boolean = false;
  verfranja: boolean = false;
  vercaracteristicas: boolean = false;
  verprecios: boolean = false;
  selectedVisita: string = '';

  fechaIni: string = '';
  fechaFin: string = '';
  duracionSel: string[] = [];
  languagesSel: string[] = [];
  franjasSel: string[] = [];
  caracteristicasSel: string[] = [];
  categoriasSel: string[] = [];
  ordenarSel: OrdenModel = new OrdenModel();

  precioIni: number = 0;
  precioFin: number = 0;
  optionsPrecio: Options = {
    floor: 0,
    ceil: 0,
  };

  mostraridiomasdisponibles: boolean = false;

  filters: FiltersModel = new FiltersModel();

  ///pasti filtros
  filtPrecios: string = '';
  filtLanguages: string[] = [];
  filtFechas: string = '';
  filtDuracion: string[] = [];
  filtFranja: string[] = [];
  filtCaracteristicas: string[] = [];
  filtCategorias: string[] = [];

  fechasfiltro: string[] = [];
  duracionesfiltro: DuracionesModel[] = [];
  idiomasfiltro: LanguagesModel[] = [];
  franjasfiltro: FranjasModel[] = [];
  caracteristicasfiltro: TagsModel[] = [];
  categoriasfiltro: CategoriasModel[] = [];
  listaordenarfiltro: OrdenModel[] = [];

  page: number = 1;
  scrollPosition: number = 0;
  verordenar: boolean = false;
  ordfixed: boolean = false;
  


  public config: SwiperConfigInterface = {
    autoplay: false,
    effect: 'slide',
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 4,
    slideToClickedSlide: false,
    speed: 1000,
    mousewheel: true,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: false,
    keyboard: true,
    pagination: false,
    centeredSlides: false,
    loop: true,
    loopedSlides: 0,
    initialSlide: 1,
    loopFillGroupWithBlank: true,
    roundLengths: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    spaceBetween: 1,
    breakpoints: {
      1290: {
        slidesPerView: 4
      },
      590: {
        slidesPerView: 3
      },
      490: {
        slidesPerView: 2
      },
      390: {
        slidesPerView: 1
      },

    }

  };

  constructor(
    private router: Router,
    private buscadorService: BuscadorService,
    private globalService: GlobalService,
    private listasService: ListasService,
    private platformService: PlatformService,
    
  ) {
    this.sWindow = this.platformService.sWindow ;
  }

  ngOnInit(): void {
    this.getIdiomasFiltro();
    this.getDuracionesFiltro();
    this.getFranjasFiltro();
    this.getCaracteristicasFiltro();
    this.getCategoriasFiltro();
    this.getPreciosFiltro();
    this.getListaOrdenar();

    this.cambiarvalorfiltroprecio();
    this.iswinresponsive();

    this.getFechasHoy();
    this.verdisponibilidad();
    this.isrespon = this.platformService.isrespon;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    
    this.scrollPosition = this.sWindow.pageYOffset;
    
    if(this.isrespon){
      if (this.scrollPosition > 206) {
        this.ordfixed = true;
      } else {
        this.ordfixed = false;
      }
    }
  }

  iswinresponsive() {
    this.isrespon = this.platformService.isrespon;
    this.vfiltros = true;
    if (this.isrespon) {
      this.vfiltros = false;
    }
  }

  ////////////filtrar start//////////////////////////////

  verdisponibilidad() {
    this.page = 1;
    this.listaresultados = [];
    this.filtrarBusqueda.emit();
  }
  vermasresultados() {
    
    this.page++;
    this.filtrarBusqueda.emit();
    
  }
  getVisitasBuscador(result: ResultadoModel) {
    
    let sWindow = this.platformService.sWindow ;
    sWindow.scrollTo({ top: this.scrollPosition + 10 });
    this.resultado = result as ResultadoModel;
    this.listaresultados = this.listaresultados.concat(this.resultado.data as VisitasResultadoModel[]);
    console.log("resultados ++  ", this.listaresultados );
  }

  ///////////////filtrar end//////////////////////////////

  //////////////////fechas  start

  getHoy() {
    let eldiadehoy = moment();
    return {
      name: eldiadehoy.format('dddd'),
      value: eldiadehoy.format('DD'),
      indexWeek: eldiadehoy.isoWeekday(),
      month: eldiadehoy.format('MM'),
      year: eldiadehoy.format('YYYY'),
    };
  }

  getFechasHoy() {
    this.week = this.globalService.week;
    this.months = this.globalService.months;
    let hoy = moment();
    let estemes = hoy.format('MM');
    let esteyear = hoy.format('YYYY');
    this.getDaysFromDate(estemes, esteyear);
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
    this.mSelect = this.globalService.months[this.dateSelect.format('M') - 1];
    this.ySelect = this.dateSelect.format('YYYY');

    arrayDays.forEach((day: any) => {
      if (
        this.dayIniSel != undefined &&
        day.month == this.dayIniSel.month &&
        day.value == this.dayIniSel.value &&
        day.year == this.dayIniSel.year
      ) {
        day.selected = true;
      }
      if (
        this.dayFinSel != undefined &&
        day.month == this.dayFinSel.month &&
        day.value == this.dayFinSel.value &&
        day.year == this.dayFinSel.year
      ) {
        day.selected = true;
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
  clickDay(day: CalendarModel) {
    const Month = this.dateSelect.format('MM');
    const Year = this.dateSelect.format('YYYY');
    const parse = ` ${Year}-${Month}-${day.value} `;
    const objectDate = moment(parse);
    this.dateValue = objectDate;
    if (this.dayIniSel == null) {
      this.dayIniSel = day;
      day.selected = true;
      this.mesIni = this.months[Month - 1];
      this.diaIni = this.dateValue.format('DD');
      this.fechaIni = this.dateValue.format('YYYY-MM-DD');
    } else if (this.dayIniSel != null) {
      this.dayFinSel = day;
      day.selected = true;
      this.mesFin = this.months[Month - 1];
      this.diaFin = this.dateValue.format('DD');
      this.fechaFin = this.dateValue.format('YYYY-MM-DD');

      if (this.fechaFin != null) {
        this.fechasSel = this.dateRange(this.fechaIni, this.fechaFin);
      }
    }
  }


  dateRange(start: string, end: string) {
    let dates = [];
    let currentDate = moment(start);
    let stopDate = moment(end);
    while (currentDate <= stopDate) {
      dates.push(moment(currentDate).format('YYYY-MM-DD'));
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dates;
  }
  verFechasManana() {
    let hoy = moment();
    let manana = hoy.add(1, 'days');
    let esedia: CalendarModel = new CalendarModel();
    esedia.name = manana.format('dddd');
    esedia.value = Number(manana.format('DD'));
    esedia.indexWeek = manana.isoWeekday();
    esedia.month = manana.format('MM');
    esedia.year = manana.format('YYYY');
    this.clickDay(esedia);
    this.getDaysFromDate(esedia.month, esedia.year);
  }
  verFechasHoy() {
    let hoy = moment();
    let esedia: CalendarModel = new CalendarModel();
    esedia.name = hoy.format('dddd');
    esedia.value = Number(hoy.format('DD'));
    esedia.indexWeek = hoy.isoWeekday();
    esedia.month = hoy.format('MM');
    esedia.year = hoy.format('YYYY');
    this.clickDay(esedia);
    this.getDaysFromDate(esedia.month, esedia.year);
  }
  borrarFechas() {
    this.filters.fechaIni = '';
    this.filters.fechaFin = '';
    this.filters.duracion = [];
    this.filters.franja = [];
    this.fechasSel = [];
    this.dayIniSel = null;
    this.dayFinSel = null;
    this.mesIni = '';
    this.diaIni = 0;
    this.mesFin = '';
    this.diaFin = 0;
    this.filtFechas = '';
    this.getFechasHoy();
  }
  aplicarFechas() {
    this.verFechas();
    if (this.mesIni != '' && this.mesFin != '') {
      this.filtFechas =
        this.mesIni.substring(0, 3) +
        ' ' +
        this.diaIni +
        ' - ' +
        this.mesFin.substring(0, 3) +
        ' ' +
        this.diaFin;
    }
    this.filters.fechaIni = this.fechaIni;
    this.filters.fechaFin = this.fechaFin;
  }

  ///////////////////////fechas end

  ///categorias
  getCategoriasFiltro() {
    this.listasService.getCategorias().subscribe((resp) => {
      let categorias = resp as CategoriasModel[];
      categorias.forEach((categoria) => {
        categoria.childs.forEach((child) => {
          child.parent_value = categoria.value;
          child.parent_title = categoria.title;
          child.parent_description = categoria.description;
          this.categoriasfiltro.push(child);
        });
      });
    });
  }

  ///idiomas

  getIdiomasFiltro() {
    this.listasService.getIdiomas().subscribe((resp) => {
      this.idiomasfiltro = resp as LanguagesModel[];
      this.idiomasfiltro.forEach((idioma) => {
        if(idioma.iso == 'es'){
           idioma.selected = true;
           idioma.disabled = true;
        }
      })
    });
  }

  ///duracion
  getDuracionesFiltro() {
    let d1: DuracionesModel = new DuracionesModel();
    d1.id = 1;
    d1.label = '0 - 3 horas';
    d1.valueMin = 0;
    d1.valueMax = 3;
    let d2: DuracionesModel = new DuracionesModel();
    d2.id = 2;
    d2.label = '3 - 5 horas';
    d2.valueMin = 3;
    d2.valueMax = 5;
    let d3: DuracionesModel = new DuracionesModel();
    d3.id = 3;
    d3.label = '5 - 7 horas';
    d3.valueMin = 5;
    d3.valueMax = 7;
    let d4: DuracionesModel = new DuracionesModel();
    d4.id = 4;
    d4.label = 'Día completo';
    d4.valueMin = 0;
    d4.valueMax = 24;

    this.duracionesfiltro.push(d1);
    this.duracionesfiltro.push(d2);
    this.duracionesfiltro.push(d3);
    this.duracionesfiltro.push(d4);
  }

  ///time franjas
  getFranjasFiltro() {
    let f1: FranjasModel = new FranjasModel();
    f1.id = 1;
    f1.label = '6:00 am - 12:00 am';
    f1.valueMin = 6;
    f1.valueMax = 12;
    let f2: FranjasModel = new FranjasModel();
    f2.id = 2;
    f2.label = '12:00 am - 5:00 pm';
    f2.valueMin = 12;
    f2.valueMax = 17;
    let f3: FranjasModel = new FranjasModel();
    f3.id = 3;
    f3.label = '5:00 pm - 12:00 am';
    f3.valueMin = 17;
    f3.valueMax = 0;

    this.franjasfiltro.push(f1);
    this.franjasfiltro.push(f2);
    this.franjasfiltro.push(f3);
  }

  ///precio
  getPreciosFiltro() {
    this.precioFin = 0;
    this.valormaximo = this.maxvalueprecio;
    this.valorfiltroprecio = this.maxvalueprecio;
    this.precioFin = this.valormaximo;
    this.optionsPrecio = {
      floor: 0,
      ceil: this.valormaximo,
    };
  }

  ///tags
  getCaracteristicasFiltro() {
    this.listasService.getTags().subscribe((resp) => {
      this.caracteristicasfiltro = resp as TagsModel[];
    });
  }

  ///ordenar
  getListaOrdenar() {
    let o1: OrdenModel = new OrdenModel();
    o1.id = 1;
    o1.label = 'Relevancia';
    o1.tipo = 'order-random';
    o1.asc = 'asc';
    let o2: OrdenModel = new OrdenModel();
    o2.id = 2;
    o2.label = 'Precio - Más bajo';
    o2.tipo = 'price';
    o2.asc = 'asc';
    let o3: OrdenModel = new OrdenModel();
    o3.id = 3;
    o3.label = 'Precio - Más alto';
    o3.tipo = 'price';
    o3.asc = 'desc';
    let o4: OrdenModel = new OrdenModel();
    o4.id = 4;
    o4.label = 'Duración - Menor';
    o4.tipo = 'duration';
    o4.asc = 'asc';
    let o5: OrdenModel = new OrdenModel();
    o5.id = 5;
    o5.label = 'Duración - Mayor';
    o5.tipo = 'duration';
    o5.asc = 'desc';

    this.listaordenarfiltro.push(o1);
    this.listaordenarfiltro.push(o2);
    this.listaordenarfiltro.push(o3);
    this.listaordenarfiltro.push(o4);
    this.listaordenarfiltro.push(o5);

    this.filters.ordenar = this.listaordenarfiltro[0].tipo;
    this.filters.orderasc = this.listaordenarfiltro[0].asc;
  }

  ///precio
  cambiarvalorfiltroprecio() {
    this.filtPrecios = this.precioIni + ' - ' + this.precioFin;
    this.filters.precioIni = this.precioIni;
    this.filters.precioFin = this.precioFin;
    this.verdisponibilidad();
  }

  ///ordenar
  cambiarorden(e: any) {
    let val = e.target.value;
    let order: OrdenModel =
      this.listaordenarfiltro.find((x) => x.id == val) ?? new OrdenModel();
    this.filters.ordenar = order.tipo;
    this.filters.orderasc = order.asc;
    this.verdisponibilidad();
  }

  ///acordeon de filtros
  verfiltrosidiomas() {
    this.veridiomas = !this.veridiomas;
  }
  verfiltrosduracion() {
    this.verduracion = !this.verduracion;
  }
  verfiltrosfranja() {
    this.verfranja = !this.verfranja;
  }
  verfiltroscaracteristicas() {
    this.vercaracteristicas = !this.vercaracteristicas;
  }
  verfiltrosprecios() {
    this.verprecios = !this.verprecios;
  }
  verfiltros(value: boolean) {
    this.vfiltros = value;
  }
  verFechas() {
    this.verFiltroFechas = !this.verFiltroFechas;
  }

  onSelect(hero: number) {
    this.selectedVisita = hero.toString();
  }

  deSelect() {
    this.selectedVisita = '';
  }

  verdetalle(uuid: string, title: string ) {
    this.router.navigate(['/visita', title, uuid]);
  }

  verordenarmvl(){
    this.verordenar=!this.verordenar;
  }


  quitarfiltros() {
    this.idiomasfiltro.forEach((x) => (x.selected = false));
    this.duracionesfiltro.forEach((x) => (x.selected = false));
    this.franjasfiltro.forEach((x) => (x.selected = false));
    this.caracteristicasfiltro.forEach((x) => (x.selected = false));
    this.categoriasfiltro.forEach((x) => (x.selected = false));
    this.precioIni = 0;
    this.precioFin = this.maxvalueprecio;
    
    this.filtPrecios = this.precioIni + ' - ' + this.precioFin;
    this.filtCategorias = [];
    this.filtDuracion = [];
    this.filtFranja = [];
    this.filtCaracteristicas = [];
    this.filtLanguages = [];
    this.filtFechas = '';
    this.filters = new FiltersModel();
    this.filters.ordenar = this.listaordenarfiltro[0].tipo;
    this.filters.orderasc = this.listaordenarfiltro[0].asc;
    this.filters.precioIni = 0;
    this.filters.precioFin = this.valormaximo;
    this.filters.fechaIni = '';
    this.filters.fechaFin = '';
    this.filters.duracion = [];
    this.filters.franja = [];
  }

  ordenarbusqueda() {
    this.filters.ordenar = this.listaordenarfiltro[0].tipo;
    this.filters.orderasc = this.listaordenarfiltro[0].asc;
  }

  /// sel idiomas
  checkLanguagesSelected(ev: any) {
    
    let va = ev.target.value;
    this.idiomasfiltro.forEach((item) => {
      item.disabled = false;
      if (item.uuid == va) {
        item.selected = ev.target.checked;
      }
    });

    let sels = this.idiomasfiltro
    .filter((x) => x.selected);
    if(sels.length==1){
      this.idiomasfiltro.forEach((item) => {
        if (item.uuid == sels[0].uuid) {
          item.disabled = true;
        }
      });
    }
    this.filtLanguages = sels
      .map((x) => x.name);
    this.filters.languages = sels
      .map((x) => x.iso);

    this.verdisponibilidad();
  }


  deleteFiltLanguage(ff: string) {
    this.filtLanguages = this.filtLanguages.filter((x) => x != ff);
    this.idiomasfiltro.forEach((item) => {
      if (item.name == ff) {
        item.selected = false;
      }
    });
    this.verdisponibilidad()
  }

  /// sel duraciones
  checkDuracionSelected(ev: any) {
    let idd = ev.target.value;
    this.duracionesfiltro.forEach((item) => {
      if (item.id == idd) {
        item.selected = ev.target.checked;
      }
    });

    let du = this.duracionesfiltro.filter((x) => x.selected);
    this.duracionSel = [];
    this.filtDuracion = [];
    du.forEach((item) => {
      this.duracionSel.push(item.valueMin + ',' + item.valueMax);
      this.filtDuracion.push(item.valueMin + ' - ' + item.valueMax);
    });
    this.filters.duracion = this.duracionSel;
    this.verdisponibilidad()
  }
  deleteFiltDuracion(f: any) {
    this.filtDuracion = this.filtDuracion.filter((x) => x != f);
    this.duracionSel = this.duracionSel.filter((x) => x != f);
    this.duracionesfiltro.forEach((item) => {
      if (item.value == f.value) {
        item.selected = false;
      }
    });
    this.filters.duracion = this.duracionSel;

    this.verdisponibilidad()
  }

  /// sel franjas
  checkFranjaSelected(ev: any) {
    let va = ev.target.value;
    this.franjasfiltro.forEach((item) => {
      if (item.id == va) {
        item.selected = ev.target.checked;
      }
    });
    let fra = this.franjasfiltro.filter((x) => x.selected);
    this.franjasSel = [];
    this.filtFranja = [];
    fra.forEach((item) => {
      this.franjasSel.push(item.valueMin + ',' + item.valueMax);
      this.filtFranja.push(item.label);
    });
    this.filters.franja = this.franjasSel;
    this.verdisponibilidad()
  }
  deleteFiltFranja(ff: string) {
    this.filtFranja = this.filtFranja.filter((x) => x != ff);
    this.franjasSel = this.franjasSel.filter((x) => x != ff);
    this.franjasfiltro.forEach((item) => {
      if (item.label == ff) {
        item.selected = false;
      }
    });
    this.filters.franja = this.franjasSel;
    this.verdisponibilidad()
  }

  /// sel caracteristicas
  checkCaracteristicasSelected(ev: any) {
    let va = ev.target.value;
    this.caracteristicasfiltro.forEach((item) => {
      if (item.value == va) {
        item.selected = ev.target.checked;
      }
    });
    let car = this.caracteristicasfiltro.filter((x) => x.selected);
    this.caracteristicasSel = [];
    this.filtCaracteristicas = [];
    car.forEach((item) => {
      this.caracteristicasSel.push(item.value);
      this.filtCaracteristicas.push(item.title);
    });
    this.filters.caracteristicas = this.caracteristicasSel;
    this.verdisponibilidad()
  }

  
  deleteFiltCaracteristica(fc: string) {
    this.filtCaracteristicas = this.filtCaracteristicas.filter((x) => x != fc);
    this.caracteristicasSel = this.caracteristicasfiltro
      .filter((x) => x.title != fc)
      .map((x) => x.value);
    this.caracteristicasfiltro.forEach((item) => {
      if (item.title == fc) {
        item.selected = false;
      }
    });
    this.filters.caracteristicas = this.caracteristicasSel;
    this.verdisponibilidad()
  }

  /// sel categiorias
  setCategoriaFiltro(ev: any) {
    let va = ev.currentTarget.id.replace('cate-', '');
    this.categoriasfiltro.forEach((item) => {
      if (item.value == va) {
        item.selected = true;
      }
    });
    let ca = this.categoriasfiltro.filter((x) => x.selected);
    this.categoriasSel = [];
    this.filtCategorias = [];
    ca.forEach((item) => {
      this.categoriasSel.push(item.value);
      this.filtCategorias.push(item.title);
    });
    this.filters.categorias = this.categoriasSel;
    this.verdisponibilidad()
  }

  deleteFiltCategoria(fc: string) {
    this.filtCategorias = this.filtCategorias.filter((x) => x != fc);
    this.categoriasSel = this.categoriasfiltro
      .filter((x) => x.title != fc)
      .map((x) => x.value);
    this.categoriasfiltro.forEach((item) => {
      if (item.title == fc) {
        item.selected = false;
      }
    });
    this.filters.categorias = this.categoriasSel;
    this.verdisponibilidad()
  }


}
