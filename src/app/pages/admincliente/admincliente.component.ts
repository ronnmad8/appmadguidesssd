import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';
import { SlidervisitasinteresarComponent } from 'src/app/componentes/slidervisitasinteresar/slidervisitasinteresar.component';
import { ZonapagoComponent } from 'src/app/componentes/zonapago/zonapago.component';
import { ZonamicuentaComponent } from 'src/app/componentes/zonamicuenta/zonamicuenta.component';
import { Meta, Title } from '@angular/platform-browser';

///models
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { ClientesModel } from 'src/app/models/Clientes.model';
import { CarritoService } from '../../services/carrito.service';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { CartModel } from 'src/app/models/Cart.model';
import { UserModel } from 'src/app/models/User.model';
import { TextoPerfilModel } from 'src/app/models/TextoPerfil.model';
///services
import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';
 
import { AlertasService } from '../../services/alertas.service';
import { HeadfooterService } from 'src/app/services/headfooter.service';
import { PlatformService } from 'src/app/services/platform.service';


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
  messagePerfil: TextoPerfilModel = new TextoPerfilModel();
  isrespon: boolean = false;
  vercuenta: boolean = false;
  verreservas: boolean = false;

  constructor(
      private acro: ActivatedRoute,
      private router: Router,
        
      private alertasService: AlertasService,
      private globalService: GlobalService,
      private carritoService: CarritoService,
      private headfooterService: HeadfooterService,
      private wowService: NgwWowService,
      private platformService: PlatformService,
      private auth: AuthService,
      private meta: Meta,
      private title: Title

  )
  {
    // this.title.setTitle( "▷ Madguides");
    // this.meta.updateTag({ name: 'description', content: 'madguides carritos guiadas en Madrid' });
    // this.meta.updateTag({ name: 'author', content: 'madguides carritos guiadas en Madrid' });
    // this.meta.updateTag({ name: 'keywords', content: '▷ Madguides ✅ carritos guiadas en Madrid' });

    this.getMessagesPerfil();
  }
  
  
  ngOnInit() {
    this.isrespon = this.platformService.isrespon;
    this.zonanopago.emit();
    this.loginadmin();
    
    
  }


  ngAfterViewInit() {
    // this.acro.params.subscribe(
    //   (params: Params) => {

    //     let section = params.section;
    //     if(section != null && section == "reservas"){
    //       //this.zm.getReservas();
    //       this.zm.vermisreservas();
    //     }
    //     else if(section != null && section == "micuenta"){
          
    //       this.zm.vermicuenta();
    //       //this.zm.patchUser();
          
    //     }
    // });

  }



  loginadmin() {
    
    let user = localStorage.getItem('user');
    
    if(user != null){
      this.usuario = JSON.parse(user) as UserModel;
      this.usuario.roles.length > 0 ? this.usuario.rol = this.usuario.roles[0].name  : this.usuario.rol = " ";
    }
  }



  getMessagesPerfil() {
    
    this.headfooterService.getMessagesPerfil().subscribe((resp)=>{
      this.messagePerfil = resp as TextoPerfilModel;
      console.log("perfil",this.messagePerfil);

    });
  }





  
}

    

