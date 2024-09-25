import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';

import { UsuarioModel } from 'src/app/models/Usuario.model';
import { ClientesModel } from 'src/app/models/Clientes.model';
 
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { CarritoService } from '../../services/carrito.service';
import { Meta, Title } from '@angular/platform-browser';
import { ImagenesModel } from 'src/app/models/Imagenes.model';

import { ZonapagoComponent } from 'src/app/componentes/zonapago/zonapago.component';
import { CartModel } from 'src/app/models/Cart.model';
import { ProviderService } from 'src/app/services/provider.service';
import { ReservationModel } from 'src/app/models/Reservations.model';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { TextDataModel } from 'src/app/models/TextData.model';
import { GlobalService } from 'src/app/services/global.service';



@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html'

})


export class CompraComponent implements OnInit{

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
  @Output() zonanopago: EventEmitter<any> = new EventEmitter();

  
  reservaspedido : ReservationModel[] ;
  pedidoId: number = 0;


  constructor(
      private router: Router,
      private acro : ActivatedRoute,
      private alertasService: AlertasService,
      private carritoService: CarritoService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private activatedRoute: ActivatedRoute,
      private meta: Meta,
      private title: Title,
      private providerService: ProviderService,
      private globalService: GlobalService,
  )
  {
    // this.title.setTitle( "▷ Madguides");
    // this.meta.updateTag({ name: 'description', content: 'madguides carritos guiadas en Madrid' });
    // this.meta.updateTag({ name: 'author', content: 'madguides carritos guiadas en Madrid' });
    // this.meta.updateTag({ name: 'keywords', content: '▷ Madguides ✅ carritos guiadas en Madrid' });

    this.menuPublic.emit(0);
    this.zonanopago.emit();
  }
  

  ngOnInit() {
    this.providerService.setThrowHiddModales(false);
    this.providerService.setThrowFooterpol(false);
    
  

  }

  ngAfterViewInit() {
    
    this.acro.params.subscribe(
      (params: Params) => {
        if(params.id != null){
          this.pedidoId = params.id;
          this.getPedido();
        }
      });
  }

  getPedido() {
    if(this.pedidoId != 0){
      this.carritoService.getPedidoCompra(this.pedidoId).subscribe(resp =>{
        
        this.reservaspedido = resp as ReservationModel[];
      })
    }
  }

  




  
}

    

