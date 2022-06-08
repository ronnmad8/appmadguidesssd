import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})


export class NavbarComponent implements OnInit {
  
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
  menusticky :boolean = false;
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
  
  constructor(
    //private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private globalService: GlobalService
  ) 
  {
    this.crearFormulario();    
    this.cambiosFormulario();
  }
  
  ngOnInit() {
    ///prueba viajes carrito
    this.getVisitascarrito();

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
     console.log(this.possc);
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

  mostrarcarrito(){
    this.vercarrito = !this.vercarrito;
    this.verusuario = false;
    this.veridiomas = false;
    this.verbusqueda = false;
  }

  mostrarusuario(){
    this.verusuario = !this.verusuario;
    this.vercarrito = false;
    this.veridiomas = false;
    this.verbusqueda = false;
  }

  mostraridiomas(){
    this.veridiomas = !this.veridiomas;
    this.vercarrito = false;
    this.verusuario = false;
    this.verbusqueda = false;
  }

  mostrarbusqueda(){
    this.verbusqueda = !this.verbusqueda;
    this.vercarrito = false;
    this.verusuario = false;
    this.veridiomas = false;
  }

  eliminarvisitacarrito(visitaid: number){

    this.visitascarrito.forEach((el,index)=>{
      if(el.id == visitaid){
        this.visitascarrito.splice(index,1)
        this.totalcarrito -= el.precioPersona ;
      }
    })
  }

  cambiaridioma(idioma: string){
    this.idioma = idioma;
  }

  getVisitascarrito(){
    this.visitascarrito = this.globalService.getVisitascarrito();
    this.visitascarrito.forEach((el)=>{
      this.totalcarrito += el.precioPersona;
    })
    //.subscribe( (resp : ArticulocoleccionesModel[]) => { if(resp != null){this.listavisitashome = resp ;} })
    
  }
  

  onActivate(componentReference: any) {

    // if(componentReference.menuAdmin != undefined){
    //   this.isAdminweb = true ;
    // }
    // if(componentReference.menuPublic != undefined){
    //   this.isAdminweb = false ; 
    // }

  }



}