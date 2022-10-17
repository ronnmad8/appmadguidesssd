import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';

import { UsuarioModel } from 'src/app/models/Usuario.model';
import { ClientesModel } from 'src/app/models/Clientes.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { Meta, Title } from '@angular/platform-browser';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { VisitasModel } from 'src/app/models/Visitas.model';

import { SlidervisitasinteresarComponent } from 'src/app/componentes/slidervisitasinteresar/slidervisitasinteresar.component';
import { ZonapagoComponent } from 'src/app/componentes/zonapago/zonapago.component';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html'

})


export class CarritoComponent implements OnInit{

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
  @Output() zonapago: EventEmitter<any> = new EventEmitter();
  @Input() solopaso1  : boolean = false;
  
  listaPedido :VisitasModel[] = [];
  carritoId: number = 0;

  constructor(
      private router: Router,
      private imagenesService: ImagenesService,
      private textosService: TextosService,
      private alertasService: AlertasService,
      private carritoService: CarritoService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private activatedRoute: ActivatedRoute,
      private meta: Meta,
      private title: Title

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
    this.menuPublic.emit(0);
    this.getPedido();

  }

  getPedido() {
    this.listaPedido = this.carritoService.getPedido();
  }

  setsolopaso1(evt: any) {
    this.solopaso1 = evt.value;
  }

  
}

    

