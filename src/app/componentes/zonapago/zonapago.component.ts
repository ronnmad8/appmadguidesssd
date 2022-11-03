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

@Component({
  selector: 'app-zonapago',
  templateUrl: './zonapago.component.html',
})



export class ZonapagoComponent implements OnInit {
  modal: NgbModalRef;
  modalOptions: NgbModalOptions;
  @Input() visitaId: number = 0;
  @Output() solopaso1: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('imagenlista') imagenlista: any;
  @ViewChild('detallevisita') detallevisita: any;
  @ViewChild('finaldetalle') finaldetalle: any;
  @ViewChild('detallecale') detallecale: any;
  @ViewChild('fdetallecale') fdetallecale: any;



  usuarioform: UserModel = new UserModel();
  visita: VisitasResultadoModel = new VisitasResultadoModel();
  tipos: string[] = [];
  pedido: CartModel = new CartModel();
  isrespon: boolean = false;

  week: string[] = [];
  months: string[] = [];
  listahoras: any[] = [];

  listaidiomas: any[] = []
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
  verusuario: boolean = true;
  verregistrar: boolean = false;
  recordarme: boolean = false;
  tipopassword: string = "password";
  verpass: boolean = false;
  listatiposidentificacion: any[] = [];

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
    private fbr: FormBuilder
  ) {
    this.wowService.init();
    
    this.crearFormulario();    
    //this.cambiosFormulario();
    this.crearFormularioLogin();    
    this.cambiosFormularioLogin();
    this.crearFormularioRegistro();    
    this.cambiosFormularioRegistro();
    
  }

  ngOnInit(): void {
    this.listatiposidentificacion = this.globalService.getlistatiposidentificacion();
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: true,
      size: 'xs',
    };

    
    this.vcale = true;
    this.getPedido();
    this.patchPedido();
    this.isresponsive();
    let hoy = moment();
    let estemes = hoy.format('MM');
    let esteyear = hoy.format('YYYY');
    this.getDaysFromDate(estemes, esteyear);
    this.precioadultos = 0;
    this.precioninos = 0;
    this.preciomenores = 0;
    this.maximopersonas = 0;

    this.week = this.globalService.week;
    this.months = this.globalService.week;
    this.listahoras = this.globalService.listahoras;
  }

  ngAfeterViewInit() {
    this.comprobarLogin();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    let posactual = window.pageYOffset;
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

  isresponsive() {
    let scree = window.innerWidth;
    if (scree < 1198) {
      this.isrespon = true;
    }
  }

  patchPedido() {
    this.formlogin.patchValue({
      name: this.pedido.cliente.name,
      surname: this.pedido.cliente,
      email: this.pedido.cliente.email,
      telefono: this.pedido.cliente.telefono,
      prefijo: this.pedido.cliente.prefijo,
    });
  }

  
  comprobarLogin(){
    let login = this.auth.noAuth();
    if(login){
      this.usuario = this.auth.getUser();
      this.forma.patchValue({
        email: this.usuario.email,
        name: this.usuario.name,
        surname: this.usuario.surname,
        telefono: this.usuario.telefono,
        prefijo: this.usuario.prefijo,
        aceptacion: true
      });
      
      
    }
  }


  crearFormulario() {
    this.forma = this.fb.group(
      {
        email: [ '',[Validators.required, Validators.email]],
        name: [ '',[Validators.required,Validators.minLength(2)]],
        surname: [ '',[Validators.required]],
        prefijo: [ '' ],
        telefono: [ '',[Validators.required,Validators.minLength(2)]],
        aceptacion: [ '',[Validators.requiredTrue]],
      }
    );
  }

  cambiosFormulario() {
    this.formlogin.valueChanges.subscribe((value) => {
      this.usuarioform.email = this.formlogin.get('email')?.value;
      this.usuarioform.name = this.formlogin.get('name')?.value;
      this.usuarioform.surname = this.formlogin.get('surname')?.value;
      this.usuarioform.prefijo = this.formlogin.get('prefijo')?.value;
      this.usuarioform.telefono = this.formlogin.get('telefono')?.value;
      this.btactivado = false;
      if (this.formlogin.status != "INVALID") {
        this.btactivado = true;
      }
    });
  }

  crearFormularioLogin() {
    this.formlogin = this.fb.group(
      {
        email: [ '',[Validators.required, Validators.email]],
        password: [ '',[Validators.required,Validators.minLength(6)]],
      }
    );
  }

  cambiosFormularioLogin() {
    this.formlogin.valueChanges.subscribe((value) => {
      this.usuario.email = this.formlogin.get('email')?.value;
      this.usuario.password = this.formlogin.get('password')?.value;
      this.btactivado = false;
      if (this.formlogin.status != "INVALID") {
        this.btactivado = true;
      }
    });
  }

  crearFormularioRegistro() {
    this.formregister = this.fbr.group(
      {
        email: [ '',[Validators.required, Validators.email]],
        name: [ '',[Validators.required,Validators.minLength(2)]],
        surname: [ '' ],
        password: [ '',[Validators.required,Validators.minLength(6)]],
        prefijo: [ '' ],
        telefono: [ '',[Validators.required,Validators.minLength(2)]],
        namefacturacion: ['',[Validators.required]],
        surnamefacturacion: [''],
        tipoidentificacion: [''],
        numeroidentificacion: ['',[Validators.required]],
        direccion: ['',[Validators.required]],
        codigopostal: [''],
        ciudad: [''],
        pais: [''],
        particular: [true],
        empresa: [false],
      }
    );
  }

  cambiosFormularioRegistro() {
    this.formregister.valueChanges.subscribe((value) => {

      this.usuario.email = this.formregister.get('email')?.value;
      this.usuario.password = this.formregister.get('password')?.value;
      this.usuario.name = this.formregister.get('name')?.value;
      this.usuario.surname = this.formregister.get('surname')?.value;
      this.usuario.prefijo = this.formregister.get('prefijo')?.value;
      this.usuario.telefono = this.formregister.get('telefono')?.value;
      this.usuario.namefacturacion = this.formregister.get('namefacturacion')?.value;
      this.usuario.namefacturacion = this.formregister.get('surnamefacturacion')?.value;
      this.usuario.tipoidentificacion = this.formregister.get('tipoidentificacion')?.value;
      this.usuario.numeroidentificacion = this.formregister.get('numeroidentificacion')?.value;
      this.usuario.direccion = this.formregister.get('direccion')?.value;
      this.usuario.codigopostal = this.formregister.get('codigopostal')?.value;
      this.usuario.ciudad = this.formregister.get('ciudad')?.value;
      this.usuario.pais = this.formregister.get('pais')?.value;
      //this.usuario.particular = this.formregister.get('particular')?.value;
      //this.usuario.empresa = this.formregister.get('empresa')?.value;

      this.btactivadoreg = false;

      if (this.formregister.status != "INVALID") {
        this.btactivadoreg = true;

      }
    });
  }
  getPedido() {
    this.pedido = this.carritoService.getCart();
    this.preciototal = this.globalService.getFormatNumber(this.pedido.total);
  }

  verHora() {
    this.vhora = !this.vhora;
    this.vcale = false;
    this.vpers = false;
    this.vidiom = false;
  }
  verIdioma() {
    this.vhora = false;
    this.vcale = false;
    this.vpers = false;
    this.vidiom = !this.vidiom;
  }
  verPersona() {
    this.vhora = false;
    this.vcale = false;
    this.vpers = !this.vpers;
    this.vidiom = false;
  }
  verCale() {
    this.vhora = false;
    this.vcale = !this.vcale;
    this.vpers = false;
    this.vidiom = false;
  }

  caleinfosel(v: string) {
    this.caleinfo = v;
    if (this.horaSel != null) {
      this.horanovalid = false;
    }
  }
  horainfosel(v: string) {
    this.horainfo = v;
    if (this.horaSel != null) {
      this.horanovalid = false;
    }
  }
  idiomainfosel(v: string) {
    this.idiominfo = v;
    if (this.idiomaSel != null) {
      this.idiomanovalid = false;
    }
  }

  restaradulto() {
    this.adultoSel--;
    this.precioadultototal = this.adultoSel * this.precioadultos;
    this.sumatotal =
      this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
  }
  sumaradulto() {
    this.adultoSel++;
    this.precioadultototal = this.adultoSel * this.precioadultos;
    this.sumatotal =
      this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
    this.persnovalid = false;
  }
  restarninos() {
    this.ninosSel--;
    this.precioninostotal = this.ninosSel * this.precioninos;
    this.sumatotal =
      this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
  }
  sumarninos() {
    this.ninosSel++;
    this.precioninostotal = this.ninosSel * this.precioninos;
    this.sumatotal =
      this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
    this.persnovalid = false;
  }
  restarmenores() {
    this.menoresSel--;
    this.preciomenorestotal = this.menoresSel * this.preciomenores;
    this.sumatotal =
      this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
  }
  sumarmenores() {
    this.menoresSel++;
    this.preciomenorestotal = this.menoresSel * this.preciomenores;
    this.sumatotal =
      this.precioadultototal + this.precioninostotal + this.preciomenorestotal;
    this.persnovalid = false;
  }

  cambiarprivada(priv: any) {
    this.privada = priv.checked;
    if (this.privada) {
      this.adultoSel = this.maximopersonas;
      this.ninosSel = 0;
      this.menoresSel = 0;
      this.precioadultototal = this.maximopersonas * this.precioadultos;
      this.precioninostotal = 0;
      this.preciomenorestotal = 0;
      this.sumatotal = this.precioadultototal;
      this.persnovalid = false;
    } else {
      this.adultoSel = 0;
      this.precioadultototal = 0;
      this.sumatotal = 0;
    }
  }

  getDaysFromDate(month: any, year: any) {
    const startDate = moment.utc(`${year}/${month}/01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;
    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);
    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday(),
      };
    });

    this.monthSelect = arrayDays;
    this.mSelect = this.months[this.dateSelect.format('M') - 1];
    this.ySelect = this.dateSelect.format('YYYY');
  }

  changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY'));
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY'));
    }
  }

  clickDay(day: any) {
    this.daySel = day;

    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse);
    this.dateValue = objectDate;
    this.vcale = false;
    this.caleinfo = objectDate.format('DD/MM/YYYY');
    this.calenovalid = false;
  }

  reservarvisita() {
    ///guardar campos cliente
    this.pedido.cliente.name = this.forma.value.nombre;
    this.pedido.cliente.surname = this.forma.value.surname;
    this.pedido.cliente.email = this.forma.value.email;
    this.pedido.cliente.telefono = this.forma.value.telefono;
    this.pedido.cliente.prefijo = this.forma.value.prefijo;
    this.pedido.codigoreserva = new Date().getTime().toString();
  
    this.carritoService.saveCart(this.pedido);

    if (this.forma.status == 'INVALID' && this.pasoactivo != 2) {
      this.forma.markAllAsTouched();
      this.cambiosFormulario();
      this.pasoactivo = 2;
      this.comprobarLogin();
    } else {
          
          this.pedidosguardados = this.carritoService.getPedidosguardados();
          this.pedidosguardados.push(this.pedido);
          this.carritoService.savePedidosguardados(this.pedidosguardados);
          this.router.navigate(['/compra']);
    }
  }

  eliminarvisitapedido(visita: VisitasResultadoModel) {
    this.pedido = this.carritoService.deleteProductCart(visita.visit_uuid);
  }

  editarvisitapedido(visita: VisitasResultadoModel, content: any) {
    //this.visitaSel = visita;
    this.daySel = '2022-10-02'; // this.visitaSel.time_date;
    // this.horaSel = this.visitaSel.time_init;
    // this.idiomaSel = this.visitaSel.iso;
    // this.adultoSel = this.visitaSel.adultos;
    // this.ninosSel = this.visitaSel.ninos;
    // this.menoresSel = this.visitaSel.menores;
    // this.maximopersonas = this.visitaSel.maximopersonas;
    //this.horainfo = this.visitaSel.time_date;
    //this.caleinfo = this.daySel.format("DD/MM/YYYY");
    //this.idiominfo = this.listaidiomas.find(x => x.value == visita.time_init).name;
    //this.sumaSel = visita.suma;
    this.modal = this.modalService.open(content, this.modalOptions);
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

  abrirRegistrar(vmodal: any) {
    this.openmodal(vmodal);
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

  iniciarsesion(){
    this.auth.loginUser(this.usuario ).subscribe( (resp) => {

    let login = resp as LoginModel;
    this.usuario = login.user as UserModel;
    this.alertasService.alertaInfo("Madguides", "Bienvenido " + login.user.name+" Te has logueado correctamente");
    this.loginok = false;
        if(login.status == "success" && login.token != null ){
          this.loginok = true;
        
        }
    });
  }

  vermodalregistrar(){
    this.verregistrar = true;
    this.verusuario = false;
  }

  vermodalusuario(){
    this.verusuario = true;
    this.verregistrar = false;
  }

  recordarmemicuenta(){
    this.recordarme = !this.recordarme;
  }

  verpassword(ver: boolean){
    this.verpass = !this.verpass;
    this.tipopassword = "password";
    if(this.verpass){
      this.tipopassword = "text";
    }
  }
  
  registrar(){
    this.auth.registrarUser( this.usuario ).subscribe( (resp) => {
          let respuesta = resp ;
          console.log("REIGISTRO HECHO --- ",respuesta);
    });
  }

  selecparticular(){
    this.formregister.get('particular')?.setValue(true);
    this.formregister.get('empresa')?.setValue(false);
  }
  
  selecempresa(){
     this.formregister.get('empresa')?.setValue(true);
     this.formregister.get('particular')?.setValue(false);
  }

}
