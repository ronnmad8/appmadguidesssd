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
import { VisitaAssetsModel } from 'src/app/models/VisitaAssets.model';
import { TextoquienessomosModel } from 'src/app/models/Textoquienessomos.model';
import { PlatformService } from 'src/app/services/platform.service';



@Component({
  selector: 'app-laempresa',
  templateUrl: './laempresa.component.html'
  
})


export class LaempresaComponent implements OnInit {

  @Input () imagenempresaData: ImagenesModel = new ImagenesModel();
  @Input () messageLaempresaData: TextoquienessomosModel = new  TextoquienessomosModel();
  sWindow: any;

  modal: NgbModalRef;
  modalOptions: NgbModalOptions;
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
    private auth: AuthService ,
    private platformService: PlatformService
  ) { 
    this.wowService.init(); 
    this.sWindow = this.platformService.sWindow ;
  }


  ngOnInit(): void {
    this.isrespon = this.platformService.isrespon;
  }


  @HostListener("window:scroll")
  onWindowScroll() {
    let posactual = this.sWindow.pageYOffset ;
  
  }









}


