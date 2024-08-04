import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';

import { UsuarioModel } from 'src/app/models/Usuario.model';
import { ClientesModel } from 'src/app/models/Clientes.model';
 
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { VisitaService } from '../../services/visita.service';
import { Meta, Title } from '@angular/platform-browser';
import { ImagenesModel } from 'src/app/models/Imagenes.model';

import { SlidervisitasinteresarComponent } from 'src/app/componentes/slidervisitasinteresar/slidervisitasinteresar.component';
import { ZonapagoComponent } from 'src/app/componentes/zonapago/zonapago.component';
import { CartModel } from 'src/app/models/Cart.model';
import { ProviderService } from 'src/app/services/provider.service';
import { TextoCashModel } from 'src/app/models/TextoCash.model';
import { HomeService } from 'src/app/services/home.service';
import { HeadfooterService } from 'src/app/services/headfooter.service';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { TextDataModel } from 'src/app/models/TextData.model';
import { GlobalService } from 'src/app/services/global.service';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html'

})


export class CarritoComponent implements OnInit{

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
  @Output() zonapago: EventEmitter<any> = new EventEmitter();
  @Input() solopaso1  : boolean = false;
  
  messageCash: TextoCashModel;
  pedido : CartModel = new CartModel();
  carritoId: number = 0;

  textconts: TextContentsModel = new TextContentsModel();
  listatextcontsdata: TextDataModel[] = [];

  constructor(
      private router: Router,
        
      private alertasService: AlertasService,
      private carritoService: CarritoService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private activatedRoute: ActivatedRoute,
      private meta: Meta,
      private title: Title,
      private providerService: ProviderService,
      private visitaService: VisitaService,
      private homeService: HomeService,
      private headfooterService: HeadfooterService,
      private globalService: GlobalService,
  )
  {
    // this.title.setTitle( "▷ Madguides");
    // this.meta.updateTag({ name: 'description', content: 'madguides carritos guiadas en Madrid' });
    // this.meta.updateTag({ name: 'author', content: 'madguides carritos guiadas en Madrid' });
    // this.meta.updateTag({ name: 'keywords', content: '▷ Madguides ✅ carritos guiadas en Madrid' });

    this.carritoId = 1;
    this.zonapago.emit();

  }
  

  ngOnInit() {
    this.providerService.setThrowHiddModales(true);
    this.providerService.setThrowFooterpol(false);

    this.getPedido();
    this.getTexts();
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




  getPedido() {
    this.pedido = this.carritoService.getCart();
  }

  setsolopaso1(evt: any) {
    this.solopaso1 = evt.value;
  }

  
}

    

