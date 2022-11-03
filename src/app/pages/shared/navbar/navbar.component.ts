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

  isrespon: boolean = false;
  
  listatiposidentificacion: any[] = [];
  pedido: CartModel;
  modalI: NgbModalRef ;
  modalOptions: NgbModalOptions;
  idioma: string = "Español";
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
    
  }
  
  ngOnInit() {
    this.isresponsive();

    this.listatiposidentificacion = this.globalService.getlistatiposidentificacion();
    this.loginadmin();
    this.getCart();
    this.getMessageMenu();
    this.getMessageLogin();
    this.getLogoMenu();
    this.getIdiomas();
    ///prueba viajes carrito
    this.getVisitascarrito();

    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      centered: true
    };

    this.isAdminweb = false;
    this.isZonapago = false;
    this.logoB = false;
    
    this.simostrarenfooter.emit();
    this.listenProvider()
    this.verbusca = false;

    //this.listenloginfacebook();
  }


  @HostListener("window:scroll")
  onWindowScroll() {
    let scrollPosition = window.pageYOffset ;
     this.menusticky = false;

     if(this.possc > scrollPosition){
       this.menusticky = true;
     }
     this.possc = scrollPosition;
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


  isresponsive() {
    let scree = window.innerWidth;
    if (scree < 1198) {
      this.isrespon = true;
    }else if(scree >= 1198){
      this.isrespon = false;
    }
  }


  loginadmin() {
    let user = localStorage.getItem('user');
    this.loginok = false;
    if(user != null){
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
      this.alertasService.alertaOK("Producto agregado al carrito", "puede elegir otra visita");
    });

    this.providerService.getThrowHiddModales.subscribe((resp)=>{
      if(resp){
        this.resetmodales();
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
        password: [ '',[Validators.required,Validators.minLength(6)]],
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


  menu() {
    this.ocultar == "" ? this.ocultar = "active" :  this.ocultar = "" ;
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
    window.location.reload();
  }


  mostrarcarrito(){
    this.mostrarmodalbuscador = false;
    this.verusuario = false;
    this.verregistrar = false;
    this.verforget = false;
    this.veridiomas = false;
    this.verbusqueda = false;
    this.vercarrito = !this.vercarrito;
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
    
    this.loginok = false;
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
      this.homeService.getCajaBuscaHome(this.busqueda).subscribe(resp => {  
        let resultado = resp as ResultadoModel;
        this.visitasprop = resultado.data as VisitasResultadoModel[];
      }) ;
    }, 1000);
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
    this.auth.loginUser(this.usuario ).subscribe( (resp) => {

    let login = resp as LoginModel;
    this.usuario = login.user as UserModel;
    this.alertasService.alertaInfo("Madguides", "Bienvenido " + login.user.name+" Te has logueado correctamente");
    this.loginok = false;
        if(login.status == "success" && login.token != null ){
          this.loginok = true;
          this.verusuario = false;
        }
    });
  }


  renovarpassword(){
    this.auth.renovarPassword(this.usuario).subscribe( (resp) => {
    let respuesta = resp;
      if(respuesta == "success"){
        this.alertasService.alertaInfo("Madguides", "Se ha enviado un mail para renovaci'on de contraseña");
      }
    })
  }


  cerrarsesion(){
    this.auth.logout();
    this.alertasService.alertaInfo("Madguides", "Has cerrado sesión correctamente");
    this.verusuario = false;
    this.loginok = false;
  }


  registrar(){
    this.auth.registrarUser( this.usuario ).subscribe( (resp) => {
          let respuesta = resp ;
          console.log("REIGISTRO HECHO --- ",respuesta);
    });
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



}