import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
//import { AuthService } from '../../../services/auth.service';
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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})


export class NavbarComponent implements OnInit {

  @ViewChild(BannerbuscadorComponent ) bb: BannerbuscadorComponent;
  @ViewChild(RouterOutlet ) ro: RouterOutlet;
  
  modalI: NgbModalRef ;
  modalOptions: NgbModalOptions;
  idioma: string = "Español";
  idiomas: string[] = ["Español","English","Français","Portugûes","Deucht"];
  visitascarrito: VisitasModel[] = [];
  totalcarrito: number = 0;
  vercarrito: boolean = false;
  verusuario: boolean = false;
  veridiomas: boolean = false;
  verbusqueda: boolean = false;
  isAdminweb: boolean = false;
  ocultar: string = "";
  ocultado: boolean = false;
  menusticky :boolean = true;
  possc :number = 0;
  nombreusuario: string;
  
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

  forma: FormGroup;
  btactivadoT: boolean = false;
  passwordsel: string = "";
  usuariosel: string = "";
  verpass: boolean = false;

  recordarme: boolean = false;
  carritovacio: boolean = true;
  mostrarmodalbuscador: boolean = false;
  rutaactual: string = "";

  verbusca: boolean = false;
  menuvisto :boolean = true;
  visitasprop: VisitasModel[] = [];
  busqueda: string = "";
  
  constructor(
    //private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private globalService: GlobalService,
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    
  ) 
  {
    this.crearFormulario();    
    this.cambiosFormulario();

  }
  
  ngOnInit() {
    ///prueba viajes carrito
    this.getVisitascarrito();
    this.getRutaActual();
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      centered: true
    };

    this.isAdminweb = false;
    this.logoB = false;
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
  

  getRutaActual(){
      this.router.events.subscribe((el) => {
      if ( el instanceof NavigationEnd) {
          if(el.url.includes('buscador')){
            this.rutaactual = "buscador";
          }
      }
  });
    
  }

  crearFormulario() {
    this.forma = this.fb.group(
      {
        usuario: [ '',[Validators.required, Validators.email]],
        password: [ '',[Validators.required,Validators.minLength(2)]],
      }
    );
  }

  cambiosFormulario() {
    this.forma.valueChanges.subscribe((value) => {
      this.usuariosel = this.forma.get('usuario')?.value;
      this.passwordsel = this.forma.get('password')?.value;
      this.btactivadoT = false;
      if (this.forma.status != "INVALID") {
        this.btactivadoT = true;
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

  logout() {

    //this.auth.logout();

  }

  

  eliminarvisitacarrito(visitaid: number){

    this.visitascarrito.forEach((el,index)=>{
      if(el.id == visitaid){
        this.visitascarrito.splice(index,1)
        this.totalcarrito -= el.price ;
      }
    })
  }

  

  getVisitascarrito(){
    this.visitascarrito = this.globalService.getVisitascarrito();
    if(this.visitascarrito.length > 0){
      this.carritovacio = false;
    }
    this.visitascarrito.forEach((el)=>{
      this.totalcarrito += el.price;
    })
    //.subscribe( (resp : ArticulocoleccionesModel[]) => { if(resp != null){this.listavisitashome = resp ;} })
    
  }

  recordarmemicuenta(){
    this.recordarme = !this.recordarme;
  }
  
  onActivate(componentReference: any) {

    // if(componentReference.menuAdmin != undefined){
    //   this.isAdminweb = true ;
    // }
    // if(componentReference.menuPublic != undefined){
    //   this.isAdminweb = false ; 
    // }

  }

  //ver modales

  resetmodales(){
    this.vercarrito = false;
    this.veridiomas = false;
    this.verbusqueda = false;
  }

  cambiaridioma(idioma: string){
    this.idioma = idioma;
    this.veridiomas = false;
  }

  mostrarcarrito(){
    
    this.mostrarmodalbuscador = false;
    this.verusuario = false;
    this.veridiomas = false;
    this.verbusqueda = false;
    this.vercarrito = !this.vercarrito;
  }

  mostrarusuario(){
    this.mostrarmodalbuscador = false;
    this.vercarrito = false;
    this.veridiomas = false;
    this.verbusqueda = false;
    this.verusuario =  !this.verusuario;
  }
  mostrarusuariob(val: boolean){
    
    this.mostrarmodalbuscador = false;
    this.vercarrito = false;
    this.veridiomas = false;
    this.verbusqueda = false;
    this.verusuario =  val;
  }

  mostraridiomas(){
    this.mostrarmodalbuscador = false;
    this.vercarrito = false;
    this.verusuario = false;
    this.verbusqueda = false;
    this.veridiomas = !this.veridiomas;
  }

  mostrarbusqueda(){
    
    this.resetmodales();
    // si se encuentra en buscador
    
    if(this.rutaactual == "buscador"){
      this.verbusca = true;
    }

  }

  buscarprop(){
    this.homeService.getCajaBuscaHome(this.busqueda).subscribe(resp => {  
    this.visitasprop = resp as VisitasModel[]; 
  }) ;
}

vertodos(){
  ///ir a buscador
  this.router.navigate(['/buscador']);
}

  


}