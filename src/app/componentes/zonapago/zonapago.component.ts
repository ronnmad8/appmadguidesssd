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
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
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
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResultadoModel } from 'src/app/models/Resultado.model';
import { LoginModel } from 'src/app/models/Login.model';
import { UserModel } from 'src/app/models/User.model';
import { PlatformService } from 'src/app/services/platform.service';
import { ProviderService } from 'src/app/services/provider.service';
import { TextoCashModel } from 'src/app/models/TextoCash.model';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { CompanionsModel } from 'src/app/models/Companions.model';
import { CompanionsPedidoModel } from 'src/app/models/CompanionsPedido.model';
import { ContractModel } from 'src/app/models/Contract.model';

import { MicuentaService } from 'src/app/services/micuenta.service';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { ReservationModel } from 'src/app/models/Reservations.model';
import { PaymentService } from 'src/app/services/payment.service';
import { de, tr } from 'date-fns/locale';

@Component({
  selector: 'app-zonapago',
  templateUrl: './zonapago.component.html',
})
export class ZonapagoComponent implements OnInit {
  modal: NgbModalRef;
  modalOptions: NgbModalOptions;
  @Input() visitaId: number = 0;
  @Input() messageCashData: TextoCashModel = new TextoCashModel();
  @Input() textconts: TextContentsModel = new TextContentsModel();
  @Output() solopaso1: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('imagenlista') imagenlista: any;
  @ViewChild('detallevisita') detallevisita: any;
  @ViewChild('finaldetalle') finaldetalle: any;
  @ViewChild('detallecale') detallecale: any;
  @ViewChild('fdetallecale') fdetallecale: any;
  loading: boolean = false;
  
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
  politicasnovalid: boolean = false;
  nomnovalid: boolean = false;
  emailnovalid: boolean = false;
  telfnovalid: boolean = false;
  pasoactivo: number = 1;
  totalcarrito: number = 0;
  visitaSel: VisitasResultadoModel = new VisitasResultadoModel();
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
  aceptacionpoliticas: boolean = false;
  formafa: FormGroup;
  companions: [] = [];
  companionsComplet: boolean = false;
  maxold: number = 1000;
  maxoldchildren: number = 13;
  registrado: boolean = false;
  formtarjeta: FormGroup;
  btactivadotarjeta: boolean = false;
  tarjeta_nombre: string = "";
  tarjeta_numeracion: string = "";
  tarjeta_caducidad: string = "";
  tarjeta_cvv: string = "";

  mensaje1 = "Debe registrarse para continuar";
  mensaje2 = "Debe aceptar las condiciones de uso";
  mensaje3 = "Debe aceptar políticas de privacidad";
  mensaje4 = "Debe validar mail de registro para poder continuar";


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
    private micuentaService: MicuentaService,
    private fb: FormBuilder,
    private fbl: FormBuilder,
    private fbr: FormBuilder,
    private fbfa: FormBuilder,
    private providerService: ProviderService,
    private platformService: PlatformService,
    private paymentService: PaymentService
  ) {
    this.wowService.init();

    this.crearFormularioLogin();
    this.cambiosFormularioLogin();
    this.crearFormularioRegistro();
    this.cambiosFormularioRegistro();
    this.sWindow = this.platformService.sWindow;

    this.crearFormulariofa();
    this.cambiosFormulariofa();

    this.crearFormularioTarjeta();
    this.cambiosFormularioTarjeta();

  }

  ngOnInit(): void {
    this.comprobarLogin();

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
    this.crearCompanions();

  }

  ngAfeterViewInit() {
    this.comprobarLogin();

    console.log("traza ",this.textconts)
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    let posactual = this.sWindow.pageYOffset;
    let posdetallevisita = this.detallevisita.nativeElement?.offsetTop - 120;
    let posfinaldetalle = this.finaldetalle.nativeElement?.offsetTop;

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
    this.loginok = !this.auth.noAuth();

    if (this.loginok) {
      this.registrado = true;
      this.usuario = this.auth.getUser();
      if(this.usuario == null ){
         this.getMe();
      }
      else{
        this.setClientePedido(this.usuario);
      }

    }
    else{
      //this.alertasService.alertaKO("Madguides", this.mensaje1);
    }
  }


  setClientePedido(usuario: UserModel){
    this.pedido.cliente.name = usuario.name;
    this.pedido.cliente.surname = usuario.surname;
    this.pedido.cliente.email = usuario.email;
    this.pedido.cliente.prefijo = usuario.prefijo;
    this.pedido.cliente.telefono = usuario.telefono;
    this.pedido.cliente.particular = usuario.particular;
    this.pedido.cliente.address = usuario.address;
    this.pedido.cliente.number = usuario.number;
    this.pedido.cliente.postalcode = usuario.postalcode;
    this.pedido.cliente.state = usuario.state;
    this.pedido.cliente.country = usuario.country;
    this.pedido.cliente.city = usuario.city;
  }

  crearCompanions(){
    
    this.limpiarcompsE();
    this.pedido.reservas.forEach(el => {
      ///el primer adulto es el propio usuario
      if(el.adults > 1){
        for (let index = 0; index < el.adults - 1; index++) {
          let co = new CompanionsModel();
          this.addcompsE("","",0,el.visit.uuid, el.visit_hours_id, index, el.visit.titulo, this.maxold ); 
        }
      }
      if(el.children > 0){
        for (let index = 0; index < el.children ; index++) {
          let co = new CompanionsModel();
          this.addcompsE("","",0,el.visit.uuid, el.visit_hours_id, index, el.visit.titulo, this.maxoldchildren); 
        }
      }
    });
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
      password: ['', [Validators.required, Validators.minLength(1)]],
      //surname: [''],
      //prefijo: [''],
      //address: [''],
      //phone: ['', [Validators.required, Validators.minLength(2)]],
      //street: [''],
      //number: [''],
      //country: [''],
      //state: [''],
      //city: [''],
      //postalcode: [''],
      
    });
  }

  cambiosFormularioRegistro() {
    this.formregister.valueChanges.subscribe((value) => {
      this.usuario.email = this.formregister.get('email')?.value;
      this.usuario.password = this.formregister.get('password')?.value;
      this.usuario.name = this.formregister.get('name')?.value;
      //this.usuario.surname = this.formregister.get('surname')?.value;
      //this.usuario.prefijo = this.formregister.get('prefijo')?.value;
      //this.usuario.telefono = this.formregister.get('phone')?.value;
      //this.usuario.address = this.formregister.get('address')?.value;
      //this.usuario.number = this.formregister.get('number')?.value;
      //this.usuario.postalcode = this.formregister.get('postalcode')?.value;
      //this.usuario.country = this.formregister.get('country')?.value;
      //this.usuario.state = this.formregister.get('state')?.value;
      //this.usuario.city = this.formregister.get('city')?.value;
      
      this.btactivadoreg = false;
      
      console.log(this.formregister.controls)
      console.log(this.formregister.status)

      if (this.formregister.status != 'INVALID') {
        this.btactivadoreg = true;
      }
    });
  }

  crearFormularioTarjeta() {
    this.formtarjeta = this.fb.group({
      nombre: ['', [Validators.required]],
      numeracion: ['', [Validators.required,  Validators.pattern(/^\d{16}$/) ]],
      caducidad: ['', [Validators.required, this.validarCaducidad ]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/) ]],
    });

  }

  cambiosFormularioTarjeta() {
    this.formtarjeta.valueChanges.subscribe((value) => {
      this.tarjeta_numeracion = this.formtarjeta.get('numeracion')?.value;
      this.tarjeta_nombre = this.formtarjeta.get('nombre')?.value;
      this.tarjeta_caducidad = this.formtarjeta.get('caducidad')?.value;
      this.tarjeta_cvv = this.formtarjeta.get('cvv')?.value;
      this.btactivadotarjeta = false;
      if (this.formtarjeta.status != 'INVALID') {
        this.btactivadotarjeta = true;
      }
    });
  }

  validarCaducidad(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!/^\d{2}\/\d{2}$/.test(value)) {
      return { invalidCaducidad: true };
    }
    const [month, year] = value.split('/').map((val: string) => parseInt(val, 10));
    const currentYear = new Date().getFullYear() % 100; // Tomamos los últimos dos dígitos del año actual
    const currentMonth = new Date().getMonth() + 1; // Meses en JS empiezan desde 0

    if (month < 1 || month > 12) {
      return { invalidMonth: true };
    }
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { expiredCard: true };
    }
    return null;
  }


  getPedido() {
    this.pedido = this.carritoService.getCart();
    this.preciototal = this.globalService.getFormatNumber(this.pedido.total);
  }

  getMe(){
    this.auth.getMe().subscribe((resp:any) => {
      this.usuario = resp;
      this.setClientePedido(this.usuario);
    })
  }

  reservarvisita() {
    if (this.pedido.reservas.length == 0) {
      this.router.navigate(['/buscador']);
    }
    else {
      ///guardar campos cliente
      if (!this.loginok) {
        if(this.formregister != null){
          this.pedido.cliente.name = this.formregister.value.name;
          this.pedido.cliente.email = this.formregister.value.email;
          //this.pedido.cliente.surname = this.formregister.value.surname;
          //this.pedido.cliente.prefijo = this.formregister.value.prefijo;
          //this.pedido.cliente.telefono = this.formregister.value.telefono;
          //this.pedido.cliente.state = this.formregister.value.state;
          //this.pedido.cliente.country = this.formregister.value.country;
          //this.pedido.cliente.city = this.formregister.value.city;
          //this.pedido.cliente.number = this.formregister.value.number;
          //this.pedido.cliente.address = this.formregister.value.address;
          
          if (this.formregister.status == 'INVALID') {
            this.formregister.markAllAsTouched();
            this.cambiosFormularioRegistro();
            this.pasoactivo = 2;
          }
          else {
            this.registrarusuario();
          }
        }
        else{
          this.pasoactivo = 2;
        }

      }
      else if (this.aceptacionpoliticas ) {
        this.setClientePedido(this.usuario);
        
        this.pedido.reservas.forEach(el => {
          el.users = [];
          this.companions.forEach(comp => {
            if(el.visit.uuid == comp["visit.uuid"] ){
              el.users.push(comp);
            }
          });
        })

       this.registrarpedido(this.pedido); 
      }
      // else if(!this.companionsComplet) {
      //   this.alertasService.alertaKO(
      //     'Madguides',
      //     'Debe registrar datos de acompañantes'
      //   );
      //   this.pasoactivo = 2;
      // } 
      else {
        this.alertasService.alertaKO(
          'Madguides',
          this.mensaje2
        );
        this.pasoactivo = 2;
      }
    }
  }

  registrarpedido(cart: CartModel) {
    //this.pedido.codigoreserva = new Date().getTime().toString();
    this.carritoService.saveCart(cart);
    this.pedidosguardados = this.carritoService.getPedidosguardados();
    this.pedidosguardados.push(cart);

    let token = localStorage.getItem('token');
    let contract: ContractModel = new ContractModel();
    this.loading = true;
      
    this.carritoService.savePedido(cart).subscribe(resp=>{
      if(resp != null){
        this.btactivadotarjeta = false;
        console.log("carrito registrado ==> ", resp )
        let pedidoregistrado = resp[0] as CartModel;
        if(pedidoregistrado.id != null){
          this.carritoService.clearCart();
          this.providerService.setThrowCarritoupdate(new CartModel());
          this.loading = false;
          this.router.navigate(['/compra/'+pedidoregistrado.id]);
        }
        else{
          this.alertasService.alertaKO("No registrado","intente registrar pedido de nuevo");
        }
      }
    })

  }

  aceptarpoliticas(acept: any) {
    this.aceptacionpoliticas = acept.currentTarget.checked;
  }

  eliminarvisitapedido(reserva: ReservationModel) {
          
    let pedido = this.carritoService.deleteProductCart(reserva.id);
    this.pedido.reservas = pedido.reservas;
    this.pedido.total = pedido.total;
    this.providerService.setThrowCarritoupdate(this.pedido);
    this.preciototal = this.globalService.getFormatNumber(pedido.total);
          
    if (this.pedido.reservas.length == 0) {
        this.router.navigate(['/buscador']);
    }

  }

  abrirLogin(vmodal: any) {
    this.openmodal(vmodal);
  }

  openmodal(cont: any) {
    this.modalService.open(cont, this.modalOptions);
  }

  cerrarcalemodal() {
    this.resetear();
    if(this.modal != null){
      this.modal.dismiss();
    }
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
      this.comprobarLogin();
      this.pasoactivo = 2;
      this.solopaso1.emit(false);
    } 
    else if (this.pasoactivo == 2) {
      this.loginok = !this.auth.noAuth();
      if(this.loginok && this.aceptacionpoliticas){
        this.pasoactivo = 3;
        this.solopaso1.emit(false);
      }
      else if(!this.loginok){
        // this.alertasService.alertaKO(
        //   'Madguides',
        //   this.mensaje1
        // );
      }
      else if(!this.aceptacionpoliticas){
        // this.alertasService.alertaKO(
        //   'Madguides',
        //   this.mensaje3
        // );
      }

      //ontest rellenar campos de prueba ///////////////////////////////////
      this.formtarjeta.patchValue({
          nombre: 'Nombre de Prueba',
          numeracion: '2342342342343456',
          caducidad: '12/25',
          cvv: '123'
          });
          this.formtarjeta.markAllAsTouched();
          this.cambiosFormularioTarjeta();
      //ontest rellenar campos de prueba ///////////////////////////////////
    } 
    else {
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
    
    if (n == 1) {
      this.pasoactivo = n;
    } 
    else if (n == 2) {
      this.comprobarLogin();
      this.pasoactivo = n;
    }
    else if (n == 3) {
      this.loginok = !this.auth.noAuth();
      if(this.loginok && this.aceptacionpoliticas){
        this.pasoactivo = n;
      }
      else if(!this.loginok) {
        // this.alertasService.alertaKO(
        //   'Madguides',
        //   this.mensaje1
        // );
      }
      else if(!this.aceptacionpoliticas){
        // this.alertasService.alertaKO(
        //   'Madguides',
        //   this.mensaje3
        // );
      }
    }
    else {
      this.pasoactivo = 1;
      this.solopaso1.emit(true);
    }
  }


  iniciarsesion() {
    this.loginok = false;
    this.auth.loginUser(this.usuario).subscribe((resp) => {
      let login = resp as LoginModel | any;
      this.auth.getMe().subscribe(res=> {
        this.usuario = res as UserModel;
        this.loginok = true;
        this.modalService.dismissAll();
      });
    });
  }


  iniciarsesiondirecto(usuario) {
    this.loginok = false;
    this.auth.loginUser(usuario).subscribe((resp) => {
      let login = resp as LoginModel | any;
      this.auth.getMe().subscribe(res=> {
        this.usuario = res as UserModel;
        this.loginok = true;
        this.continuar();
      });
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
 
  crearFormulariofa() {
    this.formafa = this.fbfa.group({
      companions: this.fbfa.array([], Validators.required)
    });
  }

  addcompsE(name, surname, old ,id, vid, ord, title, maxold) {
    this.compsE.push(
      this.fb.group({
        name: new FormControl(name, Validators.required),
        surname: new FormControl(surname, Validators.required),
        old: new FormControl(old, Validators.required),
        uuid: new FormControl(id, Validators.required),
        visit_time_uuid: new FormControl(vid, Validators.required),
        visit_title: new FormControl(title),
        orden: new FormControl(ord),
        maxold: new FormControl(maxold),
      })
    );
    
  }

  cambiosFormulariofa() {
    ///// statuChanges
    this.formafa.valueChanges.subscribe( value => {
      this.companions = this.formafa.get('companions').value ;
      this.companionsComplet = false;
  
      if ( this.formafa.status != "INVALID") {
        if (  this.companions.length > 0 ) {
        this.companionsComplet = true ;
        }
      }

    });
  }

  get compsE(): FormArray {
    return this.formafa.get('companions') as FormArray;
  }

  limpiarcompsE() {
    while ( this.compsE.length !== 0) {
      this.compsE.removeAt(0);
    }
    this.compsE.reset(); 
  }

  deleteCompsE(index) {
    this.compsE.removeAt(index);
  }

  registrarusuario(){
    if(this.usuario != null){
      this.auth.registrarUser( this.usuario ).subscribe( (resp) => {
        if(resp != null && resp){
          this.iniciarsesiondirecto(this.usuario);
          this.formregister.reset(); 
        }
      })
    }
  }


  irapoliticasprivacidad(){
      window.open('/politicasprivacidad', '_blank');
  }

  
  pagarvisita(){
    let amount = parseFloat(this.preciototal) ;
    console.log("amount ", amount);
    this.paymentService.initPayment(amount).subscribe(resp => {
      if(resp != null){
        console.log("resp_init_payment ", resp);
        this.paymentService.sendRedsysPayment(resp.parameters, resp.signature)
      }
    });
  }

  



}
