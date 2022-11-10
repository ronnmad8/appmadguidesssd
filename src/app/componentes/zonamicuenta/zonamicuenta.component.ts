import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { trigger, animate, transition, style } from '@angular/animations';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '../../services/global.service';
import { MicuentaService } from '../../services/micuenta.service';
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from 'src/app/models/User.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartModel } from 'src/app/models/Cart.model';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { LoginModel } from 'src/app/models/Login.model';
import { PlatformService } from 'src/app/services/platform.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-zonamicuenta',
  templateUrl: './zonamicuenta.component.html'
  
})


export class ZonamicuentaComponent implements OnInit {

  @Output() updateDatos = new EventEmitter();
  @Input() usuario: UserModel = new UserModel();
  @Input() pedidos: CartModel[] = [];
  sWindow: any ;

  listatiposidentificacion: any[] = [];
  listaresultados: [] = [];
  loading: boolean = false;
  isrespon: boolean = false;
  scrollPosition: number = 0;
  forma: FormGroup;
  btactivo: boolean = false;
  verreservas: boolean = false;
  vercuenta: boolean = true;
  reservas: VisitasResultadoModel[] = [];
  loginok: boolean = false;

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private micuentaService: MicuentaService,
    private alertasService: AlertasService,
    private auth: AuthService,
    private fb: FormBuilder,
    private platformService: PlatformService,
    private providerService: ProviderService
  ) {
    this.crearFormulario();
    this.cambiosFormulario();
    this.sWindow = this.platformService.sWindow;
  }

  ngOnInit(): void {
    this.isrespon = this.platformService.isrespon;
    this.listatiposidentificacion = this.globalService.getlistatiposidentificacion();
    this.providerService.setThrowPageadmin(true);
    this.listenProvider();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollPosition = this.sWindow.pageYOffset;
  }

  listenProvider(){
    this.providerService.getThrowIsresize.subscribe((resp)=>{
      this.isrespon = resp
    });
  }


  crearFormulario() {
    this.forma = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: [''],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(2)]],
      prefijo: [''],
      namefacturacion: ['', [Validators.required, Validators.minLength(2)]],
      surnamefacturacion: [''],
      tipoidentificacion: [''],
      numeroidentificacion: ['', [Validators.required, Validators.minLength(2)]],
      direccion : ['', [Validators.required, Validators.minLength(2)]],
      codigopostal: ['', [Validators.required, Validators.minLength(2)]],
      ciudad: [''],
      pais: [''],
      particular: [true],
      empresa: [false],
    });
  }

  cambiosFormulario() {
    this.forma.valueChanges.subscribe((value) => {
      this.usuario.name = this.forma.get('nombre')?.value;
      this.usuario.surname = this.forma.get('apellidos')?.value;
      this.usuario.email = this.forma.get('email')?.value;
      this.usuario.prefijo = this.forma.get('prefijo')?.value;
      this.usuario.telefono = this.forma.get('telefono')?.value;
      this.usuario.namefacturacion = this.forma.get('nombrefacturacion')?.value;
      this.usuario.surnamefacturacion = this.forma.get('apellidosfacturacion')?.value;
      this.usuario.tipoidentificacion = this.forma.get('tipoidentificacion')?.value;
      this.usuario.numeroidentificacion = this.forma.get('numeroidentificacion')?.value;
      this.usuario.direccion = this.forma.get('direccion')?.value;
      this.usuario.codigopostal = this.forma.get('codigopostal')?.value;
      this.usuario.ciudad = this.forma.get('ciudad')?.value;
      this.usuario.pais = this.forma.get('pais')?.value;
      this.usuario.particular = this.forma.get('particular')?.value;
      this.usuario.empresa = this.forma.get('empresa')?.value;

      if (this.forma.status != 'INVALID' ) {
        this.btactivo = true;
      }
    });
  }


  patchUser() {
    
    this.forma.patchValue({
      name: this.usuario.name,
      surname: this.usuario.surname,
      email: this.usuario.email,
      telefono: this.usuario.telefono,
      prefijo: this.usuario.prefijo,
      namefacturacion: this.usuario.namefacturacion,
      surnamefacturacion: this.usuario.surnamefacturacion,
      tipoidentificacion: this.usuario.tipoidentificacion,
      numeroidentificacion: this.usuario.numeroidentificacion,
      direccion : this.usuario.direccion,
      codigopostal: this.usuario.codigopostal,
      ciudad: this.usuario.ciudad,
      pais: this.usuario.pais,
      particular: this.usuario.particular,
      empresa: this.usuario.empresa

    });
  }

  getReservas() {
    this.pedidos.forEach((pedido) => {
       if(pedido.visitasPedido.length > 0){
          this.reservas.push(...pedido.visitasPedido);
       }
    });
  }


  modificarDatos() {
    this.listaresultados = [];
    this.updateDatos.emit(this.usuario);
  }
  
  

  vermisreservas(){
    this.verreservas = true;
    this.vercuenta = false;
  }
  vermicuenta(){
    this.vercuenta = true;
    this.verreservas = false;
  }

  selecparticular(){
    this.forma.get('particular')?.setValue(true);
    this.forma.get('empresa')?.setValue(false);
  }
  
  selecempresa(){
     this.forma.get('empresa')?.setValue(true);
     this.forma.get('particular')?.setValue(false);
  }


  




}


