import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
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
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { GlobalService } from 'src/app/services/global.service';
import { ReservationModel } from 'src/app/models/Reservations.model';
import { TextDataModel } from 'src/app/models/TextData.model';


@Component({
  selector: 'app-zonacompra',
  templateUrl: './zonacompra.component.html'
  
})


export class ZonacompraComponent implements OnInit {

  modal: NgbModalRef;
  modalOptions: NgbModalOptions;
  @Input() reservaspedido: ReservationModel[] = [];
  @ViewChild('imagenlista') imagenlista: any;
  sWindow: any;

  textconts: TextContentsModel = new TextContentsModel();
  listatextcontsdata: TextDataModel[] = [];

  carritoId: number = 0;
  isrespon: boolean = false;
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
    private platformService: PlatformService,
    private globalService: GlobalService,
  ) { 
    this.wowService.init(); 
    this.sWindow = this.platformService.sWindow;
  }

  ngOnInit(): void {
    this.isrespon = this.platformService.isrespon;
    this.usuario = this.auth.getUser();
    this.getTexts();
    
  }

  @HostListener("window:scroll")
  onWindowScroll() {
    let posactual = this.sWindow.pageYOffset ;

  }

  verMisReservas(){
    this.router.navigate(['/zonacliente']);
  }


  openmodal(cont: any){
    this.modalService.open(cont, this.modalOptions);
  }


  getTexts(){
    this.listatextcontsdata = this.globalService.listaTextDataModel
    this.textconts = this.globalService.textcontents;
    if(!this.textconts.dataok){
      this.globalService.getTextcontentsglobal().subscribe((resp)=>{
        if(resp){
          this.listatextcontsdata = resp as TextDataModel[] ?? [] ;
          this.textconts = this.globalService.setTextContentsByLanguage(this.listatextcontsdata , this.globalService.idlang  );
        }
      })
    }
  }


}


