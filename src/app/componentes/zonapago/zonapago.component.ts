import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { BuscadorService } from '../../services/buscador.service';
import { GlobalService } from '../../services/global.service';
import { VisitaService } from '../../services/visita.service';
import { ListasService } from '../../services/listas.service';
import { CarritoService } from '../../services/carrito.service';
import { Options } from "@angular-slider/ngx-slider";
import { SwiperModule, SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';
import { Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import * as moment from 'moment';
import { LanguagesModel } from 'src/app/models/Languages.model';
import { trigger, animate, transition, style } from '@angular/animations';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VisitasPedidoModel } from 'src/app/models/VisitasPedido.model';

@Component({
  selector: 'app-zonapago',
  templateUrl: './zonapago.component.html'
  
})


export class ZonapagoComponent implements OnInit {

  modal: NgbModalRef;
  modalOptions: NgbModalOptions;
  @Input() visitaId: number = 0;
  @Output() solopaso1: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('imagenlista') imagenlista: any;
  @ViewChild('detallevisita') detallevisita: any;
  @ViewChild('finaldetalle') finaldetalle: any;
  @ViewChild('detallecale') detallecale: any;
  @ViewChild('fdetallecale') fdetallecale: any;

  visita: VisitasPedidoModel = new VisitasPedidoModel();
  tipos: string[] = [];
  listaPedido: VisitasModel[] = [];
  isrespon: boolean = false;

  week: string[] = [];
  months: string[] = [];
  listahoras: any[] = [];
  
  listaidiomas: any[] = [
    { key : "1", value : "español"},
    { key : "2", value : "english"},
    { key : "3", value : "français"},

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
  sumaSel: number = 0;
  maximopersonas: number = 0;
  horainfo: string = "";
  caleinfo: string = "";
  idiominfo: string = "";
  
  precioadultos: number = 0;
  precioninos: number = 0;
  preciomenores: number = 0;

  precioadultototal: number = 0;
  precioninostotal: number = 0;
  preciomenorestotal: number = 0;

  sumatotal: number = 0;

  calenovalid: boolean = false;
  horanovalid: boolean = false;
  idiomanovalid: boolean = false;
  persnovalid: boolean = false;
  pestaactiv: number = 1;
  vermas: boolean = false;
  descripcion: string = "";
  descripcioncorta: string = "";
  precios: string = "";
  detalles: string = "";
  idomasdisponibles: string = "";
  cancelaciones: string = "";
  puntodeencuentro: string = "";
  googlemapsvisita: string = "https://goo.gl/maps/stMedKZoKh7f1qGC9";
  verredes: boolean = false;


  //////////
  pasoactivo: number = 3;
  totalcarrito: number = 0;
  visitaSel: VisitasModel = new VisitasModel();
  recordarmealregistrar: boolean = false;
  btpagarapagado: boolean = false;

  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private visitaService: VisitaService,
    private listasService: ListasService,
    private carritoService: CarritoService,
    private renderer: Renderer2,
    private modalService: NgbModal,
    private globalService: GlobalService,
  ) { 
    this.wowService.init(); 

    


  }

  ngOnInit(): void {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: true,
      size: 'xs'
    }
    this.vcale = true;
    this.getPedido();
    this.isresponsive();
    let hoy = moment();
    let estemes = hoy.format("MM");
    let esteyear = hoy.format("YYYY");
    this.getDaysFromDate(estemes, esteyear);
    this.precioadultos = 50;
    this.precioninos = 40;
    this.preciomenores = 0;
    this.maximopersonas = 40;

    this.week = this.globalService.week;
    this.months = this.globalService.week;
    this.listahoras = this.globalService.listahoras;
  }

  @HostListener("window:scroll")
  onWindowScroll() {
    let posactual = window.pageYOffset ;
    let posdetallevisita = (this.detallevisita.nativeElement.offsetTop) - 120;
    let posfinaldetalle = this.finaldetalle.nativeElement.offsetTop;
    
    if(posactual <= posdetallevisita){
      this.pegaj = 1;
    }
    else if (posactual > posdetallevisita) {
      this.pegaj = 2;
      let hdetallecale = this.detallecale.nativeElement.offsetHeight;
      let dif = posfinaldetalle - hdetallecale;
      if(posactual >= dif  ){
        this.pegaj = 3;
      }
    } 
  
  }

  isresponsive(){
    let scree = window.innerWidth;
    if(scree < 1198){
      this.isrespon = true;
    }
  }


  getPedido(){

    this.listaPedido = this.carritoService.getPedido(); 
    
  }


  verHora(){
    this.vhora = !this.vhora;
    this.vcale = false;
    this.vpers = false;
    this.vidiom = false;
  }
  verIdioma(){
    this.vhora = false;
    this.vcale = false;
    this.vpers = false;
    this.vidiom = !this.vidiom;
  }
  verPersona(){
    this.vhora = false;
    this.vcale = false;
    this.vpers = !this.vpers;
    this.vidiom = false;
  }
  verCale(){
    this.vhora = false;
    this.vcale = !this.vcale;
    this.vpers = false;
    this.vidiom = false;
  }

  caleinfosel(v: string){
    this.caleinfo = v;
    if(this.horaSel != null){
      this.horanovalid = false;
    }
  }
  horainfosel(v: string){
    this.horainfo = v;
    if(this.horaSel != null){
      this.horanovalid = false;
    }
  }
  idiomainfosel(v: string){
    this.idiominfo = v;
    if(this.idiomaSel != null){
      this.idiomanovalid = false;
    }
    
  }
  

  restaradulto(){
    this.adultoSel-- ;
    this.precioadultototal = this.adultoSel * this.precioadultos;
    this.sumatotal = this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
  }
  sumaradulto(){
    this.adultoSel++ ;
    this.precioadultototal = this.adultoSel * this.precioadultos;
    this.sumatotal = this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
    this.persnovalid = false;
  }
  restarninos(){
    this.ninosSel-- ;
    this.precioninostotal = this.ninosSel * this.precioninos;
    this.sumatotal = this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
  }
  sumarninos(){
    this.ninosSel++ ;
    this.precioninostotal = this.ninosSel * this.precioninos;
    this.sumatotal = this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
    this.persnovalid = false;
  }
  restarmenores(){
    this.menoresSel-- ;
    this.preciomenorestotal = this.menoresSel * this.preciomenores;
    this.sumatotal = this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
  }
  sumarmenores(){
    this.menoresSel++ ;
    this.preciomenorestotal = this.menoresSel * this.preciomenores;
    this.sumatotal = this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
    this.persnovalid = false;
  }
  
  cambiarprivada(priv:any){
    this.privada = priv.checked;
    if(this.privada){
      this.adultoSel = this.maximopersonas;
      this.ninosSel = 0;
      this.menoresSel = 0;
      this.precioadultototal = this.maximopersonas * this.precioadultos;
      this.precioninostotal = 0;
      this.preciomenorestotal = 0;
      this.sumatotal = this.precioadultototal;
      this.persnovalid = false;
    }
    else{
      this.adultoSel = 0;
      this.precioadultototal = 0;
      this.sumatotal = 0;
    }
  }


  getDaysFromDate(month: any, year: any) {
    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;
    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);
    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
    this.mSelect = this.months[this.dateSelect.format("M") - 1];
    this.ySelect = this.dateSelect.format("YYYY");
  }

  changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day: any) {
    this.daySel = day;
    
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;
    this.vcale = false;
    this.caleinfo = objectDate.format("DD/MM/YYYY");
    this.calenovalid = false;
  }


  reservarvisita(){

    //validar
    let valido = true;
    if(this.caleinfo == ""){
      valido = false;
      this.calenovalid = true;
    }
    if(this.horainfo == ""){
      valido = false;
      this.horanovalid = true;
    }
    if(this.idiominfo == ""){
      valido = false;
      this.idiomanovalid = true;
    }
    if(this.adultoSel == 0 && this.ninosSel == 0 && this.menoresSel == 0){
      valido = false;
      this.persnovalid = true;
    }

    if(valido){
      alert("valido");
    }
  }

  eliminarvisitapedido(visita: VisitasModel){
    this.listaPedido.forEach((el,index)=>{
      if(el.id == visita.id){
        this.listaPedido.splice(index,1)
        this.totalcarrito -= el.price ;
      }
    })
  }

  
  editarvisitapedido(visita: VisitasModel,  content: any) {

    //this.visitaSel = visita;
    this.daySel = '2022-10-02' // this.visitaSel.time_date;
    // this.horaSel = this.visitaSel.time_init;
    // this.idiomaSel = this.visitaSel.iso;
    // this.adultoSel = this.visitaSel.adultos;
    // this.ninosSel = this.visitaSel.ninos;
    // this.menoresSel = this.visitaSel.menores;
    // this.maximopersonas = this.visitaSel.maximopersonas;
    //this.horainfo = this.visitaSel.time_date;
    //this.caleinfo = this.daySel.format("DD/MM/YYYY");
    //this.idiominfo = this.listaidiomas.find(x => x.value == visita.time_init).name;
    //this.sumaSel = visita.suma;
    this.modal = this.modalService.open(content, this.modalOptions);
  }

  openmodal(cont: any){
    this.modalService.open(cont, this.modalOptions);
  }

  cerrarcalemodal(){
    this.resetear();
    this.modal.dismiss();
  }


  resetear(){
    this.daySel = null;
    this.horaSel = 0;
    this.idiomaSel = 0;
    this.adultoSel = 0;
    this.ninosSel = 0;
    this.menoresSel = 0;
    this.maximopersonas = 0;
    this.sumaSel = 0;
    this.horainfo = "";
    this.caleinfo = "";
    this.idiominfo = "";
    this.sumatotal = 0;
  }

  continuar(){
    if(this.pasoactivo == 1){
      this.pasoactivo = 2;
      this.solopaso1.emit(false);
    }
    else if(this.pasoactivo == 2){
      this.pasoactivo = 3;
      this.solopaso1.emit(false);
    }
    else{
      this.pasoactivo = 1;
      this.solopaso1.emit(true);
    }
  }

  modificarCarrito(){
    this.pasoactivo = 1;
    this.solopaso1.emit(true);
  }

  abrirRegistrar(vmodal: any){

    this.openmodal(vmodal);
  }

  recordarmemicuentaalregistrar(){
    this.recordarmealregistrar = !this.recordarmealregistrar;
    if(this.recordarmealregistrar){
      localStorage.setItem('recordar', 'true');
    }
    else{
      localStorage.removeItem('recordar');
    }
  }



}


