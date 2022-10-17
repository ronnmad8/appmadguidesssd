import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { BuscadorService } from '../../services/buscador.service';
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
  selector: 'app-zonacompra',
  templateUrl: './zonacompra.component.html'
  
})


export class ZonacompraComponent implements OnInit {

  modal: NgbModalRef;
  modalOptions: NgbModalOptions;
  @Input() visitaId: number = 0;
  @ViewChild('imagenlista') imagenlista: any;

  carritoId: number = 0;
  pedido: VisitasPedidoModel = new VisitasPedidoModel();
  tipos: string[] = [];
  listaPedido: VisitasModel[] = [];
  isrespon: boolean = false;

  sumatotal: number = 0;

  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private visitaService: VisitaService,
    private listasService: ListasService,
    private carritoService: CarritoService,
    private renderer: Renderer2,
    private modalService: NgbModal,
  ) { 
    this.wowService.init(); 
  }

  ngOnInit(): void {
    
   
    this.getCompra();
    this.isresponsive();


  }

  @HostListener("window:scroll")
  onWindowScroll() {
    let posactual = window.pageYOffset ;


  
  }

  isresponsive(){
    let scree = window.innerWidth;
    if(scree < 1198){
      this.isrespon = true;
    }
  }


  getCompra(){

    this.pedido = this.carritoService.getCompraRealizada(this.carritoId); 
    
  }

  verMisReservas(){
    this.router.navigate(['/misreservas']);
  }



 

  openmodal(cont: any){
    this.modalService.open(cont, this.modalOptions);
  }







}


