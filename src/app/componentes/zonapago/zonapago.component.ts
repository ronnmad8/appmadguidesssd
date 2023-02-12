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
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { CompanionsModel } from 'src/app/models/Companions.model';
import { CompanionsPedidoModel } from 'src/app/models/CompanionsPedido.model';
import { ContractModel } from 'src/app/models/Contract.model';
import { CitiesModel } from 'src/app/models/Cities.model';
import { StatesModel } from 'src/app/models/States.model';
import { CountriesModel } from 'src/app/models/Countries.model';
import { MicuentaService } from 'src/app/services/micuenta.service';

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
  aceptacionpoliticas: boolean = false;

  formafa: FormGroup;
  companions: [] = [];
  companionsComplet: boolean = false;
  maxold: number = 1000;
  maxoldchildren: number = 13;

  listacountries: CountriesModel[] = [];
  listastates: StatesModel[] = [];
  listacities: CitiesModel[] = [];

  registrado: boolean = false;

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
    private platformService: PlatformService
  ) {
    this.wowService.init();

    this.crearFormularioLogin();
    this.cambiosFormularioLogin();
    this.crearFormularioRegistro();
    this.cambiosFormularioRegistro();
    this.sWindow = this.platformService.sWindow;

    this.crearFormulariofa();
    this.cambiosFormulariofa();
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
    this.getCountries();
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
    this.loginok = !this.auth.noAuth();
    if (this.loginok) {
      this.registrado = true;
      this.usuario = this.auth.getUser();

      this.pedido.cliente.name = this.usuario.name;
      this.pedido.cliente.surname = this.usuario.surname;
      this.pedido.cliente.email = this.usuario.email;
      this.pedido.cliente.phone = this.usuario.phone;
      this.pedido.cliente.prefijo = this.usuario.prefijo;

    }
    else{
      this.alertasService.alertaKO("Madguides", this.mensaje1);
    }
  }

  crearCompanions(){
    
    this.limpiarcompsE();
    this.pedido.visitasPedido.forEach(el => {
      ///el primer adulto es el propio usuario
      if(el.adultos > 1){
        for (let index = 0; index < el.adultos - 1; index++) {
          let co = new CompanionsModel();
          this.addcompsE("","",0,el.visit_uuid, el.horario_uuid, index, el.visit_lang_title, this.maxold ); 
        }
      }
      if(el.ninos > 0){
        for (let index = 0; index < el.ninos; index++) {
          let co = new CompanionsModel();
          this.addcompsE("","",0,el.visit_uuid, el.horario_uuid, index, el.visit_lang_title, this.maxoldchildren); 
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
      surname: [''],
      password: ['', [Validators.required, Validators.minLength(1)]],
      prefijo: [''],
      phone: ['', [Validators.required, Validators.minLength(2)]],
      street: ['', [Validators.required, Validators.minLength(2)]],
      number: ['', [Validators.required]],
      country: ['',[Validators.required]],
      state: ['',[Validators.required]],
      city: ['',[Validators.required]],
      
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
      this.usuario.street = this.formregister.get('street')?.value;
      this.usuario.number = this.formregister.get('number')?.value;
      this.usuario.country = this.formregister.get('country')?.value;
      this.usuario.state = this.formregister.get('state')?.value;
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

  getMe(){
    this.auth.getMe().subscribe((resp:any) => {
      this.usuario = resp;
    })
  }

  reservarvisita() {
    if (this.pedido.visitasPedido.length == 0) {
      this.router.navigate(['/buscador']);
    }
    else {
      ///guardar campos cliente
      if (!this.loginok) {
        if(this.formregister != null){
          this.pedido.cliente.name = this.formregister.value.nombre;
          this.pedido.cliente.surname = this.formregister.value.surname;
          this.pedido.cliente.email = this.formregister.value.email;
          this.pedido.cliente.phone = this.formregister.value.telefono;
          this.pedido.cliente.prefijo = this.formregister.value.prefijo;
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
        this.pedido.cliente.name = this.usuario.name;
        this.pedido.cliente.surname = this.usuario.surname;
        this.pedido.cliente.email = this.usuario.email;
        this.pedido.cliente.phone = this.usuario.phone;
        this.pedido.cliente.prefijo = this.usuario.prefijo;
        
        this.pedido.visitasPedido.forEach(el => {
          el.companions = [];
          this.companions.forEach(comp => {
            if(el.visit_time[0].uuid == comp["visit_time_uuid"] ){
              el.companions.push(comp);
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

  registrarpedido(pedido: CartModel) {
    this.pedido.codigoreserva = new Date().getTime().toString();
    this.carritoService.saveCart(pedido);
    this.pedidosguardados = this.carritoService.getPedidosguardados();
    this.pedidosguardados.push(pedido);

    let token = localStorage.getItem('token');
    let horario: ContractModel = new ContractModel();

    pedido.visitasPedido.forEach( el => {
      let usercomp: CompanionsPedidoModel = new CompanionsPedidoModel();
      el.companions.forEach( it => {
        usercomp.name = it.name ;
        usercomp.surname = it.surname ;
        usercomp.old = it.old ;
        usercomp.email = "" ;
        usercomp.sendmail = "false" ;

        horario.users.push(usercomp);
      })

      ///rectificacion sin acompañantes api //////////////////////
      if(horario.users.length <= 1){
        usercomp.name = "_" ;
        usercomp.surname = "_" ;
        usercomp.old = 0 ;
        usercomp.email = "" ;
        usercomp.sendmail = "false" ;
        horario.users.push(usercomp);
        this.companionsComplet = true;
      }
      /////////////////////////////////////////////////////

      horario.uuid = el.visit_time[0].uuid;
      
      if(this.usuario.address.length > 0){
        horario.address = this.usuario.address[0]["address"]?.uuid;
      }
      
      horario.token = token;

      this.carritoService.savePedidosguardados(horario).subscribe(resp=>{
        let r = resp;
      })
    })
    
    ///vaciar carrito en menu y vista
    this.carritoService.clearCart();
    this.providerService.setThrowCarritoupdate(new CartModel());
    this.router.navigate(['/compra']);
  }

  aceptarpoliticas(acept: any) {
    this.aceptacionpoliticas = acept.currentTarget.checked;
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
          this.compsE.controls.forEach((el, i) => {
            if(el.value.visit_time_uuid == visita.visit_time[0].uuid ){
              this.compsE.controls = this.compsE.controls.filter(x => x.value.visit_time_uuid != el.value.visit_time_uuid);
              //this.deleteCompsE(i) ;
            }
          });
          
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
        this.alertasService.alertaKO(
          'Madguides',
          this.mensaje1
        );
      }
      else if(!this.aceptacionpoliticas){
        this.alertasService.alertaKO(
          'Madguides',
          this.mensaje3
        );
      }
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
        this.alertasService.alertaKO(
          'Madguides',
          this.mensaje1
        );
      }
      else if(!this.aceptacionpoliticas){
        this.alertasService.alertaKO(
          'Madguides',
          this.mensaje3
        );
      }
    }
    else {
      this.pasoactivo = 1;
      this.solopaso1.emit(true);
    }
  }


  iniciarsesion() {
    this.auth.loginUser(this.usuario).subscribe((resp) => {
      let login = resp as LoginModel | any;
      this.usuario = login.user as UserModel;
      this.alertasService.alertaInfo(
        'Madguides',
        'Bienvenido ' + login.user.name + ' Te has identificado correctamente'
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

  getCities(stateId: string){
    this.micuentaService.getCities(stateId).subscribe((resp)=>{
      this.listacities = resp as CitiesModel[];
      if(this.usuario.city != '' && this.formregister != null ){
        this.formregister.patchValue({
          city: this.usuario.city
        });
      }
    })
  }

  getStates(countryId: string){
    this.micuentaService.getStates(countryId).subscribe((resp)=>{
      this.listastates = resp as StatesModel[];
      if(this.usuario.state != '' && this.formregister != null ){
        this.formregister.patchValue({
          state: this.usuario.state
        });
        this.getCities(this.usuario.state);
      }
    });
  }

  seleccountry(e: any){
    this.formregister.get('country')?.setValue(e.value);
    this.getStates(e.value);
  }

  selecstate(e: any){
    this.formregister.get('state')?.setValue(e.value);
    this.getCities(e.value);
  }

  getCountries(){
    this.micuentaService.getCountries().subscribe((resp)=>{
      this.listacountries = resp as CountriesModel[];
    });
  }


  registrarusuario(){
    if(this.usuario != null){

      this.auth.registrarUser( this.usuario ).subscribe( (resp) => {
            let respuesta = resp as LoginModel ;
            if(respuesta.status == "success"){
               let user = this.usuario; 
               this.formregister.reset();
               this.alertasService.alertaInfo("Madguides", this.mensaje4 );
            }
            else{
              this.alertasService.alertaInfo("Madguides", respuesta.message);
            }
      });
    }
    else{
      this.alertasService.alertaInfo("Madguides", this.mensaje1 );
    }
  }


}
