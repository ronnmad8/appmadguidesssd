import { Component, ElementRef, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EnlacesModel } from 'src/app/models/enlaces.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ColeccionesModel } from 'src/app/models/colecciones.model';
import { AuthService } from '../../../services/auth.service';
import { EnlacesService } from '../../../services/enlaces.service';
import { ColeccionesService } from '../../../services/colecciones.service';

import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
declare var gtag;
declare var dataLayer;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})


export class NavbarComponent implements OnInit {

  
  modalI: NgbModalRef;
  formasetcookies: FormGroup;
  modalOptions: NgbModalOptions;
  funcionalidadsel: boolean = true;
  rendimientosel: boolean = true;
  seguimientosel: boolean = true;
  pestacookie = 1;

  isAdminweb: boolean = false;
  cookiesconsent: boolean;
  ocultar: string = "";
  ocultado: boolean = false;
  menusticky :boolean = false;
  possc :number = 0;
  nombreusuario: string;

  enlacemobiliario: number = 7 ;
  enlacecorradi: number = 3;
  enlacemarkilux: number = 4;
  enlaceproyectos: number = 5;
  enlacenosotros: number = 6;

  subenlacesethimo: any[] = [];
  subenlacescorradi: any[] = [];
  subenlacesmarkilux: any[] = [];
  subenlacesproyectos: any[] = [];
  subenlacesnosotros: any[] = [];

  subenlacebioclimaticas: any[] = [];
  subenlacepergotenda: any[] = [];
  subenlacesunsails: any[] = [];

  subenlacebrazosextensibles: any[] = [];
  subenlacetoldosveranda: any[] = [];
  subenlacetoldosverticales: any[] = [];
  subenlacepergolas: any[] = [];
  
  subenlaceporches: any[] = [];
  subenlacepergolasproy: any[] = [];
  subenlacetechofijo: any[] = [];
  subenlacecortinas: any[] = [];
  subenlacetarimas: any[] = [];
  subenlacegarajes: any[] = [];
  subenlacecenadores: any[] = [];

  enlaceadminmarkilux: string;
  enlaceadmincorradi: string;
  enlaceadminmobiliario: string;
  enlaceadminproyectos: string;
  enlaceadminnosotros: string;
  enlaceadminhome: string;
  enlaceadminhomecliente: string;
  enlaceadminblog: string;
  enlaceadmincontacto: string;

  hov1: boolean = false;
  hov1a: boolean = false;
  hov1b: boolean = false;
  hov2: boolean = false;
  hov3: boolean = false;
  hov4: boolean = false;
  hov5: boolean = false;
  hov6: boolean = false;
  hov7: boolean = false;
  hov8: boolean = false;

  en1Show: boolean = false;
  en1aShow: boolean = false;
  en2Show: boolean = false;
  en2aShow: boolean = false;
  en2bShow: boolean = false;
  en2cShow: boolean = false;
  en3Show: boolean = false;
  en3aShow: boolean = false;
  en3bShow: boolean = false;
  en3cShow: boolean = false;
  en3dShow: boolean = false;
  en4Show: boolean = false;
  en4aShow: boolean = false;
  en4bShow: boolean = false;
  en4cShow: boolean = false;
  en4dShow: boolean = false;
  en4eShow: boolean = false;
  en4fShow: boolean = false;
  en4gShow: boolean = false;

  en5Show: boolean = false;
  en6Show: boolean = false;
  en7Show: boolean = false;
  en8Show: boolean = false;

  logoB :boolean = true ;

  constructor(
    private auth: AuthService,
    private enlacesService: EnlacesService,
    private coleccionesService: ColeccionesService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    
  ) 
  {
    
  }
  
  ngOnInit() {

    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      centered: true
    };

    this.getcookiesconsent();
    this.crearFormularioI();
    this.cambiosFormularioI();

    this.isAdminweb = false;
    this.enlaceadminhome = "/adminhome";
    this.enlaceadminhomecliente = "/adminhomecliente";
    this.enlaceadminblog = "/adminblog";
    this.enlaceadmincontacto = "/admincontacto";
    this.enlaceadminnosotros = "/adminnosotros";

    
    //id enlace mobiliario
    this.enlacesService.getEnlacePpal('mobiliario')
    .subscribe( (resp :EnlacesModel) => {
      let enlace: EnlacesModel = resp;
      if(enlace.id != undefined){
        this.enlacemobiliario = enlace.id ;
        this.enlaceadminmobiliario = "/admintipo1/"+enlace.id;
      }
      //subenlace mobiliario
      this.enlacesService.getEnlacesFilt(this.enlacemobiliario)
      .subscribe( (resp2 : EnlacesModel[]) => {
        if(resp2 != undefined){
          this.subenlacesethimo = resp2;
          this.coleccionesService.getTitulos()
          .subscribe( (resp3 : ColeccionesModel[]) => {
              let colecciones = resp3 ;
              this.subenlacesethimo.forEach((el)=>{
                colecciones.forEach((it)=>{
                  if(el.id == it.enlaces_id){
                    el.coleccion = it.titulo; 
                  }
                })
              })
          })
        }
      });
    
    });


    //id enlace corradi
    this.enlacesService.getEnlacePpal('corradi')
    .subscribe( (resp :EnlacesModel) => {
      let enlace: EnlacesModel = resp;
      if(enlace.id != undefined){
        this.enlacecorradi = enlace.id ;
        this.enlaceadmincorradi = "/admintipo1/"+enlace.id;
      }
      //subenlace corradi
      this.enlacesService.getEnlacesFilt(this.enlacecorradi)
      .subscribe( (resp2 : EnlacesModel[]) => {
        if(resp2 != undefined){
          this.subenlacescorradi = resp2;
        
          this.subenlacescorradi.forEach( (el) => {
            this.enlacesService.getEnlacesFilt(el.id)
            .subscribe( (resp3 : EnlacesModel[]) => {
              if(resp3 != undefined){  
                if(el.id==11){
                  this.subenlacebioclimaticas = resp3;
                }
                if(el.id==12){
                  this.subenlacepergotenda = resp3;
                }
                if(el.id==13){
                  this.subenlacesunsails = resp3;
                }
              }
            })
          })
        }
      })
    })
    


    //id enlace markilux
    this.enlacesService.getEnlacePpal('markilux')
    .subscribe( (resp :EnlacesModel) => {
      let enlace: EnlacesModel = resp;
      if(enlace.id != undefined){
        this.enlacemarkilux = enlace.id ;
        this.enlaceadminmarkilux = "/admintipo1/"+enlace.id;
      }
      //subenlace markilux
      this.enlacesService.getEnlacesFilt(this.enlacemarkilux)
      .subscribe( (resp2 : EnlacesModel[]) => {
        if(resp2 != undefined){
          this.subenlacesmarkilux = resp2;
  
          this.subenlacesmarkilux.forEach( (el) => {
            this.enlacesService.getEnlacesFilt(el.id)
            .subscribe( (resp3 : EnlacesModel[]) => {
              if(resp3 != undefined){  
                if(el.id==14){
                  this.subenlacebrazosextensibles = resp3;
                }
                if(el.id==15){
                  this.subenlacetoldosveranda = resp3;
                }
                if(el.id==16){
                  this.subenlacetoldosverticales = resp3;
                }
                if(el.id==28){
                  this.subenlacepergolas = resp3;
                }
              }
            })
          })
        }
      });
    
    });

    //id enlace proyectos
    this.enlacesService.getEnlacePpal('proyectos')
    .subscribe( (resp :EnlacesModel) => {
      let enlace: EnlacesModel = resp;
      if(enlace.id != undefined){
        this.enlaceproyectos = enlace.id ;
        this.enlaceadminproyectos = "/admintipo1/"+enlace.id;
      }
      //subenlace proyectos
      this.enlacesService.getEnlacesOrden(this.enlaceproyectos)
      .subscribe( (resp2 : EnlacesModel[]) => {
        this.subenlacesproyectos = resp2;
  
        this.subenlacesproyectos.forEach( (el) => {
          this.enlacesService.getEnlacesFilt(el.id)
          .subscribe( (resp3 : EnlacesModel[]) => {
       
            if(resp3 != undefined){  
              if(el.id==18){
                this.subenlaceporches = resp3;
              }
              if(el.id==19){
                this.subenlacepergolasproy = resp3;
              }
              if(el.id==69){
                this.subenlacetechofijo = resp3;
              }
              if(el.id==21){
                this.subenlacecortinas = resp3;
              }
              if(el.id==20){
                this.subenlacetarimas = resp3;
              }
              if(el.id==23){
                this.subenlacegarajes = resp3;
              }

            }
          })
        })
      });
    });


    //id enlace nosotros
    this.enlacesService.getEnlacePpal('nosotros')
    .subscribe( (resp :EnlacesModel) => {
      let enlace: EnlacesModel = resp;
      if(enlace.id != undefined){
        this.enlaceadminnosotros = "/admintipo1/"+enlace.id;
      }
    });

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

  gestionarcookies(){
    ///gestionar en tagmanager
    this.tagmFuncionalidad();
    this.tagmRendimiento();
    this.tagmSeguimiento();

    this.resetear();
    this.modalI.dismiss();
  }

  tagmFuncionalidad(){
    ///cambiar en tagmanager segun resultado de this.funcionalidadsel
    
    if(this.funcionalidadsel){
      let encuentra = dataLayer.find(x=>x.event == 'activarcookiefuncionalidad');
      if(encuentra == undefined){
        dataLayer.push({ 'event':'activarcookiefuncionalidad' });
      }
    }
    else{
      dataLayer = dataLayer.filter(x=> x.event != 'activarcookiefuncionalidad' );
    }
  }
  
  tagmRendimiento(){
    ///cambiar en tagmanager segun resultado de this.rendimientosel
    if(this.rendimientosel){
      let encuentra = dataLayer.find(x=>x.event == 'activarcookierendimiento');
      if(encuentra == undefined){
        dataLayer.push({ 'event':'activarcookierendimiento' });
      }
    }
    else{
      dataLayer = dataLayer.filter(x=> x.event != 'activarcookierendimiento' );
    }
  }

  tagmSeguimiento(){
    ///cambiar en tagmanager segun resultado de this.seguimientosel
    if(this.seguimientosel){
      let encuentra = dataLayer.find(x=>x.event == 'activarcookieseguimiento');
      if(encuentra == undefined){
        dataLayer.push({ 'event':'activarcookieseguimiento' });
      }
    }
    else{
      dataLayer = dataLayer.filter(x=> x.event != 'activarcookieseguimiento' );
    }
  }
  
  crearFormularioI() {
    this.formasetcookies = this.fb.group({
      funcionalidad: [this.funcionalidadsel, [Validators.required]],
      rendimiento: [this.rendimientosel, [Validators.required]],
      seguimiento: [this.seguimientosel, [Validators.required]],
      obligatorias: [true, [Validators.required]],

    });
    
  }

  cambiosFormularioI() {
    this.formasetcookies.valueChanges.subscribe((value) => {
      this.funcionalidadsel = this.formasetcookies.get(
        "funcionalidad"
      ).value;
      this.rendimientosel = this.formasetcookies.get(
        "rendimiento"
      ).value;
      this.seguimientosel = this.formasetcookies.get(
        "seguimiento"
      ).value;

      if (this.formasetcookies.status != "INVALID") {
        ///guardar en localstorage
        this.setcookies();
      }
    });
  }

  setpestanacookie(n){
    this.pestacookie = n;
  }

  setcookies(){

    localStorage.setItem('funcionalidad', this.funcionalidadsel.toString());
    localStorage.setItem('rendimiento', this.rendimientosel.toString());
    localStorage.setItem('seguimiento', this.seguimientosel.toString());
  }

  getcookies(){
    
    this.funcionalidadsel =  Boolean(localStorage.getItem('funcionalidad'));
    this.rendimientosel = Boolean(localStorage.getItem('rendimiento'));
    this.seguimientosel = Boolean(localStorage.getItem('seguimiento'));

  }


  getcookiesconsent(){
    let coo = localStorage.getItem('cookiesconsent');
    this.cookiesconsent = false;
    if(coo != null ){
        this.cookiesconsent = true;
    }
    
  }

  cerrarmodalI(content) {
    this.resetear();
    this.modalI.dismiss();
  }

  openI(content) {
    
    this.resetear();
    this.modalI = this.modalService.open(content, this.modalOptions);
  }

  resetear() {

    this.getcookies();

    this.formasetcookies.controls["funcionalidad"].setValue(this.funcionalidadsel);
    this.formasetcookies.controls["rendimiento"].setValue(this.rendimientosel);
    this.formasetcookies.controls["seguimiento"].setValue(this.seguimientosel);

  }





  homecontacto(){
        this.router.navigate( ['/homecliente' ], {fragment: 'contacto'});
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

    this.auth.logout();

  }

  submenu(enshow){
    this.en1aShow  = false;
    this.en2aShow  = false;
    this.en2bShow  = false;
    this.en2cShow  = false;
    enshow != 1 ? (this.en1Show  = false)  :  ( this.en1Show ? this.en1Show = false : this.en1Show = true );
    enshow != 2 ? (this.en2Show  = false)  :  ( this.en2Show ? this.en2Show = false : this.en2Show = true );
    enshow != 3 ? (this.en3Show  = false)  :  ( this.en3Show ? this.en3Show = false : this.en3Show = true );
    enshow != 4 ? (this.en4Show  = false)  :  ( this.en4Show ? this.en4Show = false : this.en4Show = true );
    //enshow != 5 ? (this.en5Show  = false)  :  ( this.en5Show ? this.en5Show = false : this.en5Show = true );
    enshow != 6 ? (this.en6Show  = false)  :  ( this.en6Show ? this.en6Show = false : this.en6Show = true );
    //enshow != 7 ? (this.en7Show  = false)  :  ( this.en7Show ? this.en7Show = false : this.en7Show = true );
    //enshow != 8 ? (this.en8Show  = false)  :  ( this.en8Show ? this.en8Show = false : this.en8Show = true );

  }
  sub2menu(enshow){

    enshow != 1 ? (this.en1aShow  = false)  :  ( this.en1aShow ? this.en1aShow = false : this.en1aShow = true );
    enshow != 2 ? (this.en2aShow  = false)  :  ( this.en2aShow ? this.en2aShow = false : this.en2aShow = true );
    enshow != 3 ? (this.en2bShow  = false)  :  ( this.en2bShow ? this.en2bShow = false : this.en2bShow = true );
    enshow != 4 ? (this.en2cShow  = false)  :  ( this.en2cShow ? this.en2cShow = false : this.en2cShow = true );
    enshow != 5 ? (this.en3aShow  = false)  :  ( this.en3aShow ? this.en3aShow = false : this.en3aShow = true );
    enshow != 6 ? (this.en3bShow  = false)  :  ( this.en3bShow ? this.en3bShow = false : this.en3bShow = true );
    enshow != 7 ? (this.en3cShow  = false)  :  ( this.en3cShow ? this.en3cShow = false : this.en3cShow = true );
    enshow != 8 ? (this.en3dShow  = false)  :  ( this.en3dShow ? this.en3dShow = false : this.en3dShow = true );
    enshow != 9 ? (this.en4aShow  = false)  :  ( this.en4aShow ? this.en4aShow = false : this.en4aShow = true );
    enshow != 10 ? (this.en4bShow  = false)  :  ( this.en4bShow ? this.en4bShow = false : this.en4bShow = true );
    enshow != 11 ? (this.en4cShow  = false)  :  ( this.en4cShow ? this.en4cShow = false : this.en4cShow = true );
    enshow != 12 ? (this.en4dShow  = false)  :  ( this.en4dShow ? this.en4dShow = false : this.en4dShow = true );
    enshow != 13 ? (this.en4eShow  = false)  :  ( this.en4eShow ? this.en4eShow = false : this.en4eShow = true );
    enshow != 14 ? (this.en4fShow  = false)  :  ( this.en4fShow ? this.en4fShow = false : this.en4fShow = true );
    enshow != 15 ? (this.en4gShow  = false)  :  ( this.en4gShow ? this.en4gShow = false : this.en4gShow = true );

    
  }

  onActivate(componentReference) {

    if(componentReference.menuAdmin != undefined){
      this.isAdminweb = true ;
    }
    if(componentReference.menuPublic != undefined){
      this.isAdminweb = false ; 
    }

 
  }


  aceptarcookiestodas(){
    ///aceptar cada tipo de cookie en tagmanager a la vez
    localStorage.setItem('cookiesconsent','true');
    this.cookiesconsent = true;
    this.funcionalidadsel = true;
    this.rendimientosel = true;
    this.seguimientosel = true;
    this.gestionarcookies();
  }

  denegarcookies(){
    ///no activar ninguna cookie
    localStorage.setItem('cookiesconsent','false');
    this.cookiesconsent = true;
    this.funcionalidadsel = false;
    this.rendimientosel = false;
    this.seguimientosel = false;
    this.gestionarcookies();

}

}