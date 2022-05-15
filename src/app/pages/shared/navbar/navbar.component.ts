import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//import { AuthService } from '../../../services/auth.service';


import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})


export class NavbarComponent implements OnInit {

  modalI: NgbModalRef ;
  modalOptions: NgbModalOptions;

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

  constructor(
    //private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    
  ) 
  {
///
  }
  
  ngOnInit() {

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

  

  onActivate(componentReference: any) {

    // if(componentReference.menuAdmin != undefined){
    //   this.isAdminweb = true ;
    // }
    // if(componentReference.menuPublic != undefined){
    //   this.isAdminweb = false ; 
    // }

  }



}