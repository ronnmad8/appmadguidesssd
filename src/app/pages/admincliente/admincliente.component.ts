import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params  } from '@angular/router';
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
import { CartModel } from 'src/app/models/Cart.model';
import { ZonamicuentaComponent } from 'src/app/componentes/zonamicuenta/zonamicuenta.component';
import { UserModel } from 'src/app/models/User.model';



@Component({
  selector: 'app-admincliente',
  templateUrl: './admincliente.component.html',

})


export class AdminclienteComponent implements OnInit, AfterViewInit {

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
  @Output() zonanopago: EventEmitter<any> = new EventEmitter();
  @ViewChild(ZonamicuentaComponent) zm: ZonamicuentaComponent;
  
  pedido :CartModel = new CartModel();
  usuario: UserModel = new UserModel();
  pedidos: CartModel[] = [];

  constructor(
      private acro: ActivatedRoute,
      private router: Router,
      private imagenesService: ImagenesService,
      private textosService: TextosService,
      private alertasService: AlertasService,
      private carritoService: CarritoService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private meta: Meta,
      private title: Title

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
    this.loginadmin();
    this.getPedidos();
  }


  ngAfterViewInit() {
    this.acro.params.subscribe(
      (params: Params) => {

        let section = params.section;
        if(section != null && section == "reservas"){
          this.zm.getReservas();
          this.zm.vermisreservas();
        }
        else if(section != null && section == "micuenta"){
          this.zm.patchUser();
          this.zm.vermicuenta();
        }
    });
  }


  loginadmin() {
    
    let user = localStorage.getItem('user');
    if(user != null){
      this.usuario = JSON.parse(user) as UserModel;
      this.usuario.roles.length > 0 ? this.usuario.rol = this.usuario.roles[0].name  : this.usuario.rol = " ";
    }
  }

  
  guardarcambios(user: UserModel)  {
    this.auth.updateUser(user).subscribe((resp) => {
      this.usuario = resp as UserModel;
      this.usuario.roles.length > 0 ? this.usuario.rol = this.usuario.roles[0].name  : this.usuario.rol = " ";
      this.zm.vermicuenta();
      this.zm.patchUser();
      this.alertasService.alertaInfo('Madguides','Datos cambiados correctamente');
    });
  }


  getPedidos() {
    let pedidosguardados = this.carritoService.getPedidosguardados();
    
    pedidosguardados.forEach((pedido) => {
      if(pedido.cliente.uuid == this.usuario.uuid){
        this.pedidos.push(pedido);
      }
    });
  }



  
}

    

