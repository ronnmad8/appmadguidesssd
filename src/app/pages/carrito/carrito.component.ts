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
import { TextosModel } from 'src/app/models/Textos.model';
import { VisitasModel } from 'src/app/models/Visitas.model';

import { SlidervisitasinteresarComponent } from 'src/app/componentes/slidervisitasinteresar/slidervisitasinteresar.component';
import { ZonapagoComponent } from 'src/app/componentes/zonapago/zonapago.component';
import { CartModel } from 'src/app/models/Cart.model';
import { ProviderService } from 'src/app/services/provider.service';
import { TextoCashModel } from 'src/app/models/TextoCash.model';
import { VisitaAssetsModel } from 'src/app/models/VisitaAssets.model';
import { HomeService } from 'src/app/services/home.service';
import { HeadfooterService } from 'src/app/services/headfooter.service';
import { TextoLoginModel } from 'src/app/models/TextoLogin.model';
import { TextoPerfilModel } from 'src/app/models/TextoPerfil.model';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html'

})


export class CarritoComponent implements OnInit{

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
  @Output() zonapago: EventEmitter<any> = new EventEmitter();
  @Input() solopaso1  : boolean = false;
  
  messageCash: TextoCashModel;
  messageVisita: VisitaAssetsModel;
  messageLogin: TextoLoginModel;
  messagePerfil: TextoPerfilModel;
  pedido : CartModel = new CartModel();
  carritoId: number = 0;

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
    this.getMessagesCash();
    this.getMessagesVisita();
    this.getMessagesLogin();
    this.getMessagesPerfil();
    this.getPedido();

  }

  getMessagesCash(){
    this.carritoService.getMessagesCash().subscribe( (resp) => {
      this.messageCash = resp as TextoCashModel;
    } );
  }

  getMessagesVisita(){
    this.visitaService.getMessagesVisita().subscribe( (resp) => {
      this.messageVisita = resp as VisitaAssetsModel;
      
    } );
  }

  getMessagesLogin(){
    this.headfooterService.getMessagesLogin().subscribe( (resp) => {
      this.messageLogin = resp as TextoLoginModel;
    } );
  }

  getMessagesPerfil(){
    this.headfooterService.getMessagesPerfil().subscribe( (resp) => {
      this.messagePerfil = resp as TextoPerfilModel;
    } );
  }


  getPedido() {
    this.pedido = this.carritoService.getCart();
  }

  setsolopaso1(evt: any) {
    this.solopaso1 = evt.value;
  }

  
}

    

