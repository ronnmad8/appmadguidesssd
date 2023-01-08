import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  Renderer2,
  Output,
  EventEmitter,
  Directive,
} from '@angular/core';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { BuscadorService } from '../../services/buscador.service';
import { GlobalService } from '../../services/global.service';
import { VisitaService } from '../../services/visita.service';
import { ListasService } from '../../services/listas.service';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { AlertasService } from '../../services/alertas.service';
import { Options } from '@angular-slider/ngx-slider';
import {
  SwiperModule,
  SwiperComponent,
  SwiperConfigInterface,
  SwiperDirective,
  SwiperPaginationInterface,
  SwiperScrollbarInterface,
} from 'ngx-swiper-wrapper';
import { Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import * as moment from 'moment';
import { LanguagesModel } from 'src/app/models/Languages.model';
import { trigger, animate, transition, style } from '@angular/animations';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

import { CartModel } from 'src/app/models/Cart.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultadoModel } from 'src/app/models/Resultado.model';
import { LoginModel } from 'src/app/models/Login.model';
import { UserModel } from 'src/app/models/User.model';
import { PlatformService } from 'src/app/services/platform.service';
import { ProviderService } from 'src/app/services/provider.service';
import { TextoCashModel } from 'src/app/models/TextoCash.model';
import { VisitaAssetsModel } from 'src/app/models/VisitaAssets.model';
import { TextoLoginModel } from 'src/app/models/TextoLogin.model';
import { TextoPerfilModel } from 'src/app/models/TextoPerfil.model';
import { UsuarioModel } from 'src/app/models/Usuario.model';

@Component({
  selector: 'app-zonapago',
  templateUrl: './zonapago.component.html',
})
export class ZonapagoComponent implements OnInit {
  modal: NgbModalRef;
  modalOptions: NgbModalOptions;
  @Input() visitaId: number = 0;
  @Input() messageCashData: TextoCashModel = new TextoCashModel();
  @Input() messageVisitaData: VisitaAssetsModel = new VisitaAssetsModel();
  @Input() messageLoginData: TextoLoginModel = new TextoLoginModel();
  @Input() messagePerfilData: TextoPerfilModel = new TextoPerfilModel();
  @Output() solopaso1: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('imagenlista') imagenlista: any;
  @ViewChild('detallevisita') detallevisita: any;
  @ViewChild('finaldetalle') finaldetalle: any;
  @ViewChild('detallecale') detallecale: any;
  @ViewChild('fdetallecale') fdetallecale: any;
  sWindow: any;

  usuarioform: UserModel = new UserModel();
  visita: VisitasResultadoModel = new VisitasResultadoModel();
  tipos: string[] = [];
  pedido: CartModel = new CartModel();
  isrespon: boolean = false;

  week: string[] = [];
  months: string[] = [];
  listahoras: any[] = [];

  listaidiomas: any[] = [];
  monthSelect: any[];
  dateSelect: any;
  dateValue: any;
  mSelect: any;
  ySelect: any;
  privada: boolean = false;
  vcale: boolean = false;
  vhora: boolean = false;
  vidiom: boolean = false;
  vpers: boolean = false;
  pegaj: number = 1;
  //sels
  daySel: any;
  horaSel: any = 0;
  idiomaSel: any = 0;
  adultoSel: number = 0;
  ninosSel: number = 0;
  menoresSel: number = 0;
  sumaSel: number = 0;
  maximopersonas: number = 0;
  horainfo: string = '';
  caleinfo: string = '';
  idiominfo: string = '';

  precioadultos: number = 0;
  precioninos: number = 0;
  preciomenores: number = 0;

  precioadultototal: number = 0;
  precioninostotal: number = 0;
  preciomenorestotal: number = 0;

  sumatotal: number = 0;
  preciototal: string = '0';

  calenovalid: boolean = false;
  horanovalid: boolean = false;
  idiomanovalid: boolean = false;
  persnovalid: boolean = false;
  pestaactiv: number = 1;
  vermas: boolean = false;
  descripcion: string = '';
  descripcioncorta: string = '';
  precios: string = '';
  detalles: string = '';
  idomasdisponibles: string = '';
  cancelaciones: string = '';
  puntodeencuentro: string = '';
  googlemapsvisita: string = 'https://goo.gl/maps/';
  verredes: boolean = false;

  aceptopoliticas: boolean = false;
  politicasnovalid: boolean = false;
  nomnovalid: boolean = false;
  emailnovalid: boolean = false;
  telfnovalid: boolean = false;

  //////////
  pasoactivo: number = 1;
  totalcarrito: number = 0;
  visitaSel: VisitasModel = new VisitasModel();
  recordarmealregistrar: boolean = false;
  forma: FormGroup;
  formlogin: FormGroup;
  formregister: FormGroup;
  btactivado: boolean = false;
  btactivadoreg: boolean = false;
  pedidosguardados: any;
  usuario: UserModel = new UserModel();
  loginok: boolean = false;
  recordarme: boolean = false;
  tipopassword: string = 'password';
  verpass: boolean = false;
  listatiposidentificacion: any[] = [];
  aceptacionlogin: boolean = false;

  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private visitaService: VisitaService,
    private listasService: ListasService,
    private carritoService: CarritoService,
    private renderer: Renderer2,
    private modalService: NgbModal,
    private globalService: GlobalService,
    private auth: AuthService,
    private alertasService: AlertasService,
    private fb: FormBuilder,
    private fbl: FormBuilder,
    private fbr: FormBuilder,
    private providerService: ProviderService,
    private platformService: PlatformService
  ) {
    this.wowService.init();

    this.crearFormularioLogin();
    this.cambiosFormularioLogin();
    this.crearFormularioRegistro();
    this.cambiosFormularioRegistro();
    this.sWindow = this.platformService.sWindow;
  }

  ngOnInit(): void {
    this.loginok = !this.auth.noAuth();
    if (this.loginok) {
      this.usuario = this.auth.getUser();
    }

    this.isrespon = this.platformService.isrespon;
    this.listatiposidentificacion =
      this.globalService.getlistatiposidentificacion();
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: true,
      size: 'xs',
    };

    this.vcale = true;
    this.getPedido();
    //this.patchPedido();
  }

  ngAfeterViewInit() {
    this.comprobarLogin();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    let posactual = this.sWindow.pageYOffset;
    let posdetallevisita = this.detallevisita.nativeElement.offsetTop - 120;
    let posfinaldetalle = this.finaldetalle.nativeElement.offsetTop;

    if (posactual <= posdetallevisita) {
      this.pegaj = 1;
    } else if (posactual > posdetallevisita) {
      this.pegaj = 2;
      let hdetallecale = this.detallecale.nativeElement.offsetHeight;
      let dif = posfinaldetalle - hdetallecale;
      if (posactual >= dif) {
        this.pegaj = 3;
      }
    }
  }

  comprobarLogin() {
    let login = this.auth.noAuth();
    if (login) {
      this.usuario = this.auth.getUser();
      this.forma.patchValue({
        email: this.usuario.email,
        name: this.usuario.name,
        surname: this.usuario.surname,
        telefono: this.usuario.phone,
        prefijo: this.usuario.prefijo,
        aceptacion: true,
      });
    }
  }

  crearFormularioLogin() {
    this.formlogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  cambiosFormularioLogin() {
    this.formlogin.valueChanges.subscribe((value) => {
      this.usuario.email = this.formlogin.get('email')?.value;
      this.usuario.password = this.formlogin.get('password')?.value;
      this.btactivado = false;
      if (this.formlogin.status != 'INVALID') {
        this.btactivado = true;
      }
    });
  }

  crearFormularioRegistro() {
    this.formregister = this.fbr.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: [''],
      password: ['', [Validators.required, Validators.minLength(1)]],
      prefijo: [''],
      phone: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  cambiosFormularioRegistro() {
    this.formregister.valueChanges.subscribe((value) => {
      this.usuario.email = this.formregister.get('email')?.value;
      this.usuario.password = this.formregister.get('password')?.value;
      this.usuario.name = this.formregister.get('name')?.value;
      this.usuario.surname = this.formregister.get('surname')?.value;
      this.usuario.prefijo = this.formregister.get('prefijo')?.value;
      this.usuario.phone = this.formregister.get('phone')?.value;
      this.btactivadoreg = false;

      if (this.formregister.status != 'INVALID') {
        this.btactivadoreg = true;
      }
    });
  }
  getPedido() {
    this.pedido = this.carritoService.getCart();
    this.preciototal = this.globalService.getFormatNumber(this.pedido.total);
  }

  reservarvisita() {
    if (this.pedido.visitasPedido.length == 0) {
      this.router.navigate(['/buscador']);
    } else {
      ///guardar campos cliente
      if (!this.loginok) {
        this.pedido.cliente.name = this.forma.value.nombre;
        this.pedido.cliente.surname = this.forma.value.surname;
        this.pedido.cliente.email = this.forma.value.email;
        this.pedido.cliente.phone = this.forma.value.telefono;
        this.pedido.cliente.prefijo = this.forma.value.prefijo;
        if (this.forma.status == 'INVALID') {
          this.forma.markAllAsTouched();
          this.cambiosFormularioRegistro();
          this.pasoactivo = 2;
        } else {
          ///registrarusuario
          this.registrarusuario(this.usuario, this.pedido);
        }
      } else if (this.aceptacionlogin) {
        this.pedido.cliente.name = this.usuario.name;
        this.pedido.cliente.surname = this.usuario.surname;
        this.pedido.cliente.email = this.usuario.email;
        this.pedido.cliente.phone = this.usuario.phone;
        this.pedido.cliente.prefijo = this.usuario.prefijo;

        this.registrarpedido(this.pedido);
      } else {
        this.alertasService.alertaKO(
          'Madguides',
          'Debe aceptar las condiciones de uso'
        );
        this.pasoactivo = 2;
      }
    }
  }

  registrarpedido(pedido) {
    this.pedido.codigoreserva = new Date().getTime().toString();
    this.carritoService.saveCart(pedido);
    this.pedidosguardados = this.carritoService.getPedidosguardados();
    this.pedidosguardados.push(pedido);
    this.carritoService.savePedidosguardados(this.pedidosguardados);
    ///vaciar carrito en menu y vista
    this.carritoService.clearCart();
    this.providerService.setThrowCarritoupdate(new CartModel());

    this.router.navigate(['/compra']);
  }

  aceptarlogin(aceptacionlogin: any) {
    this.aceptacionlogin = aceptacionlogin.currentTarget.checked;
  }

  eliminarvisitapedido(visita: VisitasResultadoModel) {
    
    let mensajeconfirmacion = 'Va a eliminar una visita';

    if (this.pedido.visitasPedido.length <= 1) {
      mensajeconfirmacion = 'Va a eliminar la última visita del pedido';
    }

    this.alertasService
      .alertaWarning(mensajeconfirmacion, '¿Seguro que desea eliminar?')
      .then((result) => {
        if (result.value) {
          let pedido = this.carritoService.deleteProductCart(visita.visit_uuid);
          this.pedido.visitasPedido = pedido.visitasPedido;
          this.pedido.total = pedido.total;
          this.providerService.setThrowCarritoupdate(this.pedido);
          this.preciototal = this.globalService.getFormatNumber(pedido.total);
          if (this.pedido.visitasPedido.length == 0) {
            this.router.navigate(['/buscador']);
          }
        }
      });
  }

  abrirLogin(vmodal: any) {
    this.openmodal(vmodal);
  }

  openmodal(cont: any) {
    this.modalService.open(cont, this.modalOptions);
  }

  cerrarcalemodal() {
    this.resetear();
    this.modal.dismiss();
  }

  resetear() {
    this.sumaSel = 0;
    this.horainfo = '';
    this.caleinfo = '';
    this.idiominfo = '';
    this.sumatotal = 0;
  }

  continuar() {
    if (this.pasoactivo == 1) {
      this.pasoactivo = 2;
      this.solopaso1.emit(false);
      this.comprobarLogin();
    } else if (this.pasoactivo == 2) {
      this.pasoactivo = 3;
      this.solopaso1.emit(false);
    } else {
      this.pasoactivo = 1;
      this.solopaso1.emit(true);
    }
  }

  modificarCarrito() {
    this.pasoactivo = 1;
    this.solopaso1.emit(true);
  }

  recordarmemicuentaalregistrar() {
    this.recordarmealregistrar = !this.recordarmealregistrar;
    if (this.recordarmealregistrar) {
      localStorage.setItem('recordar', 'true');
    } else {
      localStorage.removeItem('recordar');
    }
  }

  cambiarpaso(n: number) {
    this.pasoactivo = n;
  }

  iniciarsesion() {
    this.auth.loginUser(this.usuario).subscribe((resp) => {
      let login = resp as LoginModel | any;
      this.usuario = login.user as UserModel;
      this.alertasService.alertaInfo(
        'Madguides',
        'Bienvenido ' + login.user.name + ' Te has logueado correctamente'
      );
      this.loginok = false;
      if (login.status == 'success' && login.token != null) {
        this.loginok = true;
      }
    });
  }

  recordarmemicuenta() {
    this.recordarme = !this.recordarme;
  }

  verpassword(ver: boolean) {
    this.verpass = !this.verpass;
    this.tipopassword = 'password';
    if (this.verpass) {
      this.tipopassword = 'text';
    }
  }

  registrarusuario(usuario: UserModel, pedido: CartModel) {
    this.auth.registrarUser(usuario).subscribe((resp) => {
      let respuesta = resp;
      this.registrarpedido(pedido);
      return respuesta;
    });
  }
}
