import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';

import { ZonapagoComponent } from 'src/app/componentes/zonapago/zonapago.component';
import { ZonamicuentaComponent } from 'src/app/componentes/zonamicuenta/zonamicuenta.component';
import { Meta, Title } from '@angular/platform-browser';

///models
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { ClientesModel } from 'src/app/models/Clientes.model';
import { CarritoService } from '../../services/carrito.service';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { CartModel } from 'src/app/models/Cart.model';
import { UserModel } from 'src/app/models/User.model';
///services
import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';
 
import { AlertasService } from '../../services/alertas.service';
import { HeadfooterService } from 'src/app/services/headfooter.service';
import { PlatformService } from 'src/app/services/platform.service';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { TextDataModel } from 'src/app/models/TextData.model';


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
  isrespon: boolean = false;
  vercuenta: boolean = false;
  verreservas: boolean = false;

  textconts: TextContentsModel = new TextContentsModel();
  listatextcontsdata: TextDataModel[] = [];

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
    this.title.setTitle( "▷ Administracion cliente");
    this.meta.updateTag({ name: 'description', content: 'madguides carritos guiadas en Madrid' });
    this.meta.updateTag({ name: 'author', content: 'madguides carritos guiadas en Madrid' });
    this.meta.updateTag({ name: 'keywords', content: 'Madguides carritos guiadas en Madrid' });

  }
  
  
  ngOnInit() {

    this.isrespon = this.platformService.isrespon;
    this.zonanopago.emit();
    this.loginadmin();

    this.getTexts();
    
  }


  ngAfterViewInit() {

    if( this.auth.noAuth() ){
      this.router.navigate(['/home']);
    }
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

  loginadmin() {
    let user = localStorage.getItem('user');
    
    if(user != null){
      this.usuario = JSON.parse(user) as UserModel;
      //this.usuario.roles.length > 0 ? this.usuario.rol = this.usuario.roles[0].name  : this.usuario.rol = " ";
    }
  }


  onActivate(reference: any) {
    if(reference != undefined ){
        if(reference.zonareservas != undefined  ){
          this.verreservas = true;
          this.vercuenta = false;
        }
        else if(reference.zonamicuenta != undefined  )  {
          this.verreservas = false;
          this.vercuenta = true;
        } 
    }
  }



  
}

    

