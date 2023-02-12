import { Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { ListasService } from '../../../services/listas.service';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { BuscadorComponent } from '../../buscador/buscador.component';
import { BusquedaComponent } from 'src/app/componentes/busqueda/busqueda.component';
import { BannerbuscadorComponent } from 'src/app/componentes/bannerbuscador/bannerbuscador.component';
import { HomeService } from '../../../services/home.service';
import { CarritoService } from '../../../services/carrito.service';
import { ProviderService } from '../../../services/provider.service';
import { AlertasService } from '../../../services/alertas.service';
import { AuthService } from '../../../services/auth.service';
import { MicuentaService } from '../../../services/micuenta.service';
import { HeadfooterService } from '../../../services/headfooter.service';
import { MessagesModel } from 'src/app/models/Messages.model';
import { CartModel } from 'src/app/models/Cart.model';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { ResultadoModel } from 'src/app/models/Resultado.model';
import { UserModel } from 'src/app/models/User.model';
import { LoginModel } from 'src/app/models/Login.model';
import { LanguagesModel } from 'src/app/models/Languages.model';
import { MenuModel } from 'src/app/models/Menu.model';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextoLoginModel } from 'src/app/models/TextoLogin.model';
import { RecordarmeModel } from 'src/app/models/Recordarme.model';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { PlatformService } from 'src/app/services/platform.service';
import { TextoCartModel } from 'src/app/models/TextoCart.model';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { CountriesModel } from 'src/app/models/Countries.model';
import { CitiesModel } from 'src/app/models/Cities.model';
import { StatesModel } from 'src/app/models/States.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})


export class NavbarComponent implements OnInit {


  @Output() nomostrarenfooter: EventEmitter<any> = new EventEmitter();
  @Output() simostrarenfooter: EventEmitter<any> = new EventEmitter();
  @ViewChild(RouterOutlet ) ro: RouterOutlet;
  @ViewChild('cjbusque' ) cjbusque: ElementRef;
  sWindow: any;
  isrespon: boolean = false;
  loading: boolean = false;
  listatiposidentificacion: any[] = [];
  pedido: CartModel;
  modalI: NgbModalRef ;
  modalOptions: NgbModalOptions;
  idioma: string = "";
  idiomas: LanguagesModel[] = [];
  visitascarrito: VisitasResultadoModel[] = [];
  totalcarrito: string = "0";
  vercarrito: boolean = false;
  verusuario: boolean = false;
  verregistrar: boolean = false;
  verforget: boolean = false;
  veridiomas: boolean = false;
  verbusqueda: boolean = false;
  isAdminweb: boolean = false;
  isZonapago: boolean = false;
  ocultar: string = "";
  ocultado: boolean = false;
  menusticky :boolean = true;
  possc :number = 0;
  nombreusuario: string;
  tipopassword: string = "password";
  verpass: boolean = false;
  loginok: boolean = false;
  
  hov1: boolean = false;
  hov2: boolean = false;
  hov3: boolean = false;
  hov4: boolean = false;
  
  enlacehome = "/home";
  enlaceayuda = "/ayuda";
  enlaceblog = "/blog";
  enlacecontacto = "/contacto";
  enlacequienessomos = "/quienessomos";
  enlacebuscador = "/buscador";
  
  logoB :boolean = true ;
  messageMenu: MenuModel;
  messageLogin: TextoLoginModel;
  messageCart: TextoCartModel;
  formlogin: FormGroup;
  formregister: FormGroup;
  formforget: FormGroup;
  btactivado: boolean = false;
  btactivadoreg: boolean = false;
  btForgetactivado: boolean = false;
  usuario: UserModel = new UserModel();
  recordarme: boolean = false;
  carritovacio: boolean = true;
  mostrarmodalbuscador: boolean = false;
  rutaactual: string = "";
  verbusca: boolean = false;
  menuvisto :boolean = true;
  visitasprop: VisitasResultadoModel[] = [];
  busqueda: string = "";
  timeout: any;
  actividades: number = 0;
  logoMenu: ImagenesModel = new ImagenesModel();
  //socialUser: SocialUser;
  isLoginUser: boolean = false;
  enviar = "Enviar";
  tresize: any;
  pageadmin: boolean = false;

  listacountries: CountriesModel[] = [];
  listastates: StatesModel[] = [];
  listacities: CitiesModel[] = [];
  
  constructor(
    private auth: AuthService,
    private acr: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private fbr: FormBuilder,
    private modalService: NgbModal,
    private globalService: GlobalService,
    private homeService: HomeService,
    private carritoService: CarritoService,
    private providerService: ProviderService,
    private alertasService: AlertasService,
    private listasService: ListasService,
    private micuentaService: MicuentaService,
    private headfooterService: HeadfooterService,
    private platformService: PlatformService,
    //private socialAuthService: SocialAuthService,
  ) 
  {
    this.crearFormulario();    
    this.cambiosFormulario();
    this.crearFormularioRegistro();    
    this.cambiosFormularioRegistro();
    this.crearFormularioForget();    
    this.cambiosFormularioForget();
    this.pedido = new CartModel();
    this.sWindow = this.platformService.sWindow;
  }
  
  ngOnInit() {
    this.isrespon = this.platformService.isrespon;

    this.listatiposidentificacion = this.globalService.getlistatiposidentificacion();
    this.loginadmin();
    this.getCart();
    this.getMessageMenu();
    this.getMessageLogin();
    this.getMessageCart();
    this.getLogoMenu();
    this.getIdiomas();
    ///prueba viajes carrito
    this.getVisitascarrito();
    this.getCountries();

    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      centered: true
    };

    this.isAdminweb = false;
    this.isZonapago = false;
    this.logoB = false;
    
    this.simostrarenfooter.emit();
    this.listenProvider();
    this.verbusca = false;
    

    //this.listenloginfacebook();
  }


  @HostListener("window:scroll")
  onWindowScroll() {
    let scrollPosition = this.sWindow.pageYOffset ;
    this.menusticky = false;

    if(this.possc > scrollPosition){
      this.menusticky = true;
     }
    this.possc = scrollPosition;
  }

  @HostListener("window:resize")
  onWindowResize() {
    let wresize = this.sWindow.innerWidth * this.sWindow.innerHeight; 
    if(this.tresize != 0 && this.tresize != wresize){
      ///revisar menu movil o pc
      this.platformService.isresponsive();
      this.isrespon = this.platformService.isrespon;
      this.providerService.setThrowIsresize(this.isrespon);
      console.log("| ", this.isrespon);
    }
    this.tresize = wresize;
  }


  onActivate(componentReference: any) {
    
    if(componentReference.zonapago != undefined ){
      this.isZonapago = true;
      this.nomostrarenfooter.emit();
    }
    else if(componentReference.zonanopago != undefined ){
      this.isZonapago = false;
      this.simostrarenfooter.emit();
    }
    else{
      this.isZonapago = false;
      this.simostrarenfooter.emit();
    }

  }


  loginadmin() {
    let user = localStorage.getItem('user');
    this.loginok = false;

    if(user != "undefined" && user != null ){
      this.usuario = JSON.parse(user) as UserModel;
      this.usuario.roles.length > 0 ? this.usuario.rol = this.usuario.roles[0].name : this.usuario.rol = "";
      this.loginok = true;
    }
    
  }


  listenProvider(){
    this.providerService.getThrowCarritoupdate.subscribe((resp)=>{
      this.pedido = resp as CartModel;
      this.vercarrito = true;
      this.getVisitascarrito();
    });

    this.providerService.getThrowHiddModales.subscribe((resp)=>{
      if(resp){
        this.resetmodales();
      }
    });

    this.providerService.getThrowPageadmin.subscribe((resp)=>{
      if(resp){
        this.pageadmin = true;
      }
    });

  }


  getCart() {
    if(this.carritoService.haveCart()){
      this.pedido = this.carritoService.getCart();
    }
    else{
      this.pedido = new CartModel();
      this.carritoService.saveCart(this.pedido);
      this.actividades = this.pedido.visitasPedido.length;
    }
  }


  getMessageMenu(){
    this.headfooterService.getMessagesMenu().subscribe( (resp) => {
      this.messageMenu = resp as MenuModel;
    } );
  }


  getMessageLogin(){
    this.headfooterService.getMessagesLogin().subscribe( (resp) => {
      this.messageLogin = resp as TextoLoginModel;
    } );
  }

  getMessageCart(){
    this.headfooterService.getMessagesCart().subscribe( (resp) => {
      this.messageCart = resp as TextoCartModel;
    } );
  }

  getLogoMenu(){
    this.headfooterService.getLogoMenu().subscribe( (resp) => {
      this.logoMenu = resp as ImagenesModel;
    } );
  }

  
  getIdiomas(){
    this.listasService.getIdiomas().subscribe( (resp) => {
      let respuesta: LanguagesModel[] =  resp as LanguagesModel[];
      this.idiomas = respuesta ;
      
      let iso = localStorage.getItem('currentLanguage');
      if(this.idiomas != null){
        this.idioma = this.idiomas.find(el => el.iso == iso)?.name ?? "";
      }
    } );
  }
  

  crearFormulario() {
    this.formlogin = this.fb.group(
      {
        email: [ '',[Validators.required, Validators.email]],
        password: [ '',[Validators.required,Validators.minLength(1)]],
      }
    );
  }


  cambiosFormulario() {
    this.formlogin.valueChanges.subscribe((value) => {
      this.usuario.email = this.formlogin.get('email')?.value;
      this.usuario.password = this.formlogin.get('password')?.value;
      this.btactivado = false;
      
      if (this.formlogin.status != "INVALID") {
        this.btactivado = true;
      }
    });
  }


  crearFormularioForget() {
    this.formforget = this.fb.group(
      {
        email: [ '',[Validators.required, Validators.email]],
      }
    );
  }


  cambiosFormularioForget() {
    this.formforget.valueChanges.subscribe((value) => {
      this.usuario.email = this.formforget.get('email')?.value;
      this.btForgetactivado = false;
      if (this.formforget.status != "INVALID") {
        this.btForgetactivado = true;
      }
    });
  }


  crearFormularioRegistro() {
    this.formregister = this.fbr.group(
      {
        email: [ '',[Validators.required, Validators.email]],
        name: [ '',[Validators.required,Validators.minLength(2)]],
        surname: [ '' ],
        password: [ '',[Validators.required,Validators.minLength(1)]],
        prefijo: [ '' ],
        telefono: [ '',[Validators.required,Validators.minLength(2)]],
        street: [ '',[Validators.required,Validators.minLength(2)]],
        country: [ '',[Validators.required,Validators.minLength(2)]],
        city: [ '',[Validators.required,Validators.minLength(2)]],
        number: [ '',[Validators.required]],
        state: [ '',[Validators.required,Validators.minLength(2)]],
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
      this.usuario.phone = this.formregister.get('phone')?.value;
      this.usuario.street = this.formregister.get('street')?.value;
      this.usuario.number = this.formregister.get('number')?.value;
      this.usuario.country = this.formregister.get('country')?.value;
      this.usuario.state = this.formregister.get('state')?.value;
      this.usuario.city = this.formregister.get('city')?.value;


      this.btactivadoreg = false;
      if (this.formregister.status != "INVALID") {
        
        this.btactivadoreg = true;
      }
    });
  }


  menu() {
    this.ocultar == "" ? this.ocultar = "active" :  this.ocultar = "" ;
    this.resetmodales()
    this.mostrarusuariob(false);
  }


  mostrar() {
      this.ocultar == "" ? this.ocultar = "toggled"  : this.ocultar = "" ;
      this.ocultado = !this.ocultado;
  }


  esmovil() {
    var ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua) ;
  }


  eliminarvisitacarrito(uuid: string) {
    this.pedido = this.carritoService.deleteProductCart(uuid);
    this.totalcarrito = this.globalService.getFormatNumber(this.pedido.total);
    this.actividades = this.pedido.visitasPedido.length;
  }

  
  getVisitascarrito(){
    this.visitascarrito = this.pedido.visitasPedido;
    if(this.visitascarrito.length > 0){
      this.carritovacio = false;
    }
    this.totalcarrito = this.globalService.getFormatNumber(this.pedido.total);
    this.actividades = this.pedido.visitasPedido.length;
  }


  recordarmemicuenta(){
    this.recordarme = !this.recordarme;
    if(this.recordarme){
      let reco = new RecordarmeModel();
      reco.email = this.usuario.email;
      reco.password = this.usuario.password;
      this.auth.saveRecordarme(reco);
    }else{
      localStorage.removeItem('recordarme');
    }
  }
  

  //ver modales
  resetmodales(){
    this.vercarrito = false;
    this.veridiomas = false;
    this.verbusqueda = false;
    this.verregistrar = false;
    this.verusuario = false;
    this.verforget = false;
  }


  cambiaridioma(iso: string){
    localStorage.setItem('currentLanguage', iso);
    this.veridiomas = false;
    this.auth.setHeaders();
    this.platformService.sWindow.location.reload();

  }


  mostrarcarrito(){
    this.mostrarmodalbuscador = false;
    this.verusuario = false;
    this.verregistrar = false;
    this.verforget = false;
    this.veridiomas = false;
    this.verbusqueda = false;
    this.vercarrito = !this.vercarrito;
    this.ocultado = false;
  }


  mostrarusuario(){
    this.mostrarmodalbuscador = false;
    this.vercarrito = false;
    this.verregistrar = false;
    this.verforget = false;
    this.veridiomas = false;
    this.verbusqueda = false;
    this.verusuario =  !this.verusuario;
    if(this.verusuario){
      let rec = this.auth.leerRecordarme();
      if(rec){
        this.formlogin.get('email')?.setValue(rec.email);
        this.formlogin.get('password')?.setValue(rec.password);
      }
    }
  }


  mostrarusuariob(val: boolean){
    
    this.mostrarmodalbuscador = false;
    this.vercarrito = false;
    this.verregistrar = false;
    this.verforget = false;
    this.veridiomas = false;
    this.verbusqueda = false;
    this.verusuario =  val;
    if(this.verusuario){
      let rec = this.auth.leerRecordarme();
      if(rec){
        this.formlogin.get('email')?.setValue(rec.email);
        this.formlogin.get('password')?.setValue(rec.password);
      }
    }
  }

  
  mostraridiomas(){
    this.mostrarmodalbuscador = false;
    this.vercarrito = false;
    this.verregistrar = false;
    this.verforget = false;
    this.verusuario = false;
    this.verbusqueda = false;
    this.veridiomas = !this.veridiomas;
  }


  mostrarbusqueda(){
    this.resetmodales();
    this.rutaactual = this.router.url;
    // si se encuentra en buscador
    if(!this.rutaactual.includes("home")){
      this.verbusca = !this.verbusca;
    }
    else if(this.rutaactual.includes("home")) {
      this.verbusca = false;
      this.providerService.setThrowFococaja(true);
    }

    if(this.cjbusque){
        setTimeout(()=>{ 
          this.cjbusque.nativeElement.focus(); 
        },400);  
    }
    else{
      this.busqueda = "";
    }

  }


  buscarprop(){
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(()=> {
      this.loading = true;
      this.homeService.getCajaBuscaHome(this.busqueda).subscribe(resp => {  
        let resultado = resp as ResultadoModel;
        this.visitasprop = resultado.data as VisitasResultadoModel[];
        this.loading = false;
      }) ;
    }, 10);
  }


  verbuscador(){
    this.verbusca = false;
    this.visitasprop = [];
    this.router.navigate(['/buscador/title', this.busqueda]);
    this.busqueda = "";
  }
  

  verdetalle(visita: VisitasResultadoModel){
    this.router.navigate(['/visita', visita.visit_lang_title , visita.visit_uuid]);
  }


  vermodalregistrar(){
    this.verregistrar = true;
    this.verusuario = false;
    this.verforget = false;
  }


  vermodalusuario(){
    this.verusuario = true;
    this.verregistrar = false;
    this.verforget = false;
  }

  vermodalforgot(){
    this.verforget = true;
    this.verusuario = false;
    this.verregistrar = false;
  }

  
  iniciarsesion(){
    this.loading = true;
    this.auth.loginUser(this.usuario ).subscribe( (resp) => {

    this.loginok = false;
    if(resp == "success"){
      this.auth.getMe().subscribe( res=> {
        console.log("me ",res);
        this.alertasService.alertaInfo("Madguides", "Bienvenido,Te has logueado correctamente");   
        this.loginok = true;
        this.verusuario = false;
        })
      }
      this.loading = false;
    });
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  }


  renovarpassword(){
    this.loading = true;
    this.auth.renovarPassword(this.usuario).subscribe( (resp) => {
      let respuesta = resp;
      if(respuesta == "success"){
        this.alertasService.alertaInfo("Madguides", "Se ha enviado un mail para renovación de contraseña");
      }
      this.loading = false;
    })
  }


  cerrarsesion(){
    this.auth.logout();
    this.alertasService.alertaInfo("Madguides", "Has cerrado sesión correctamente");
    this.verusuario = false;
    this.loginok = false;
  }


  registrar(){
    this.loading = true;
    this.auth.registrarUser( this.usuario ).subscribe( (resp) => {
          let respuesta = resp as LoginModel ;
          if(respuesta.status == "success"){
             this.alertasService.alertaInfo("Madguides", respuesta.message);
             let user = this.usuario; 
             this.formregister.reset();
             this.mostrarusuario();
            
          }
          else{
            this.alertasService.alertaInfo("Madguides", respuesta.message);
          }
          this.loading = false;
    });
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  }


  verpassword(ver: boolean){
    this.verpass = !this.verpass;
    this.tipopassword = "password";
    if(this.verpass){
      this.tipopassword = "text";
    }
  }


  selecparticular(){
    this.formregister.get('particular')?.setValue(true);
    this.formregister.get('empresa')?.setValue(false);
  }
  
  
  selecempresa(){
     this.formregister.get('empresa')?.setValue(true);
     this.formregister.get('particular')?.setValue(false);
  }
  
  irazonaclientemicuenta(){
    this.verusuario = false;
    this.router.navigate(['/zonacliente/micuenta']);
  }


  irazonaclientereservas(){
    this.verusuario = false;
    this.router.navigate(['/zonacliente/reservas']);
  }


  quitarmodales(){
    this.verusuario = false;
    this.veridiomas = false;
    this.vercarrito = false;
    this.verbusca = false;
  }


  // listenloginfacebook(){
  //   this.socialAuthService.authState.subscribe( (user) => {
  //      this.socialUser = user;
  //      this.isLoginUser = (user != null)
  //   });
  // }

  loginfacebook(){
    //this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  logoutfacebook(){
    //this.socialAuthService.signOut();
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

  gotocarrito(){
    let nologin = this.auth.noAuth();
    if(nologin){
      this.alertasService.alertaInfo("Madguides", "Debes estar resgistrado para realizar el pago");
    }
    this.router.navigate(['/carrito']);
  }


}