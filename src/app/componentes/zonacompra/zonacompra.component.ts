import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { BuscadorService } from '../../services/buscador.service';
import { VisitaService } from '../../services/visita.service';
import { ListasService } from '../../services/listas.service';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { Options } from "@angular-slider/ngx-slider";
import { SwiperModule, SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';
import { Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import * as moment from 'moment';
import { LanguagesModel } from 'src/app/models/Languages.model';
import { trigger, animate, transition, style } from '@angular/animations';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { CartModel } from 'src/app/models/Cart.model';
import { UserModel } from 'src/app/models/User.model';
import { PlatformService } from 'src/app/services/platform.service';


@Component({
  selector: 'app-zonacompra',
  templateUrl: './zonacompra.component.html'
  
})


export class ZonacompraComponent implements OnInit {

  modal: NgbModalRef;
  modalOptions: NgbModalOptions;
  @Input() visitaId: number = 0;
  @ViewChild('imagenlista') imagenlista: any;
  sWindow: any;

  carritoId: number = 0;
  listaPedido: VisitasResultadoModel[] = [];
  isrespon: boolean = false;
  pedidos: CartModel[] = [];
  pedido: CartModel = new CartModel();
  usuario: UserModel = new UserModel();

  sumatotal: number = 0;

  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private visitaService: VisitaService,
    private listasService: ListasService,
    private carritoService: CarritoService,
    private renderer: Renderer2,
    private modalService: NgbModal,
    private auth: AuthService ,
    private platformService: PlatformService
  ) { 
    this.wowService.init(); 
    this.sWindow = this.platformService.sWindow;
  }

  ngOnInit(): void {
    this.isrespon = this.platformService.isrespon;
    this.usuario = this.auth.getUser();
    this.getPedido();

  }

  @HostListener("window:scroll")
  onWindowScroll() {
    let posactual = this.sWindow.pageYOffset ;


  
  }



  verMisReservas(){
    this.router.navigate(['/zonacliente']);
  }


  getPedido() {
    this.pedidos = this.carritoService.getPedidosguardados();
    if(this.pedidos.length > 0){
      this.pedidos = this.pedidos.filter(x => x.cliente.email == this.usuario.email);
      this.pedido = this.pedidos[this.pedidos.length - 1]
      this.listaPedido = this.pedido.visitasPedido;
    }
  }


  openmodal(cont: any){
    this.modalService.open(cont, this.modalOptions);
  }







}


