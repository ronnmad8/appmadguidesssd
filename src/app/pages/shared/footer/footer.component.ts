import { NullTemplateVisitor } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertasService } from 'src/app/services/alertas.service';
import { HomeService } from 'src/app/services/home.service';
import { AuthService } from 'src/app/services/auth.service';
import { HeadfooterService } from 'src/app/services/headfooter.service';
import { FooterModel } from 'src/app/models/Footer.model';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformService } from 'src/app/services/platform.service';
import { ProviderService } from 'src/app/services/provider.service';
import * as e from 'express';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { TextDataModel } from 'src/app/models/TextData.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  //@ViewChild(LoginComponent, null) loginentrar;
  @Input() nomostrarenlacesfooter: boolean = false;

  messageFooter: FooterModel = new FooterModel();
  logoFooter: ImagenesModel = new ImagenesModel();
  adminactive: boolean;
  widg1show = false;
  widg2show = false;

  modalI: NgbModalRef;
  formasetcookies: FormGroup;
  modalOptions: NgbModalOptions;
  funcionalidadsel: boolean = true;
  rendimientosel: boolean = true;
  seguimientosel: boolean = true;
  pestacookie = 1;
  cookiesconsent: boolean;

  listacookiesrendimiento: any[] = [];
  listacookiesseguimiento: any[] = [];
  listacookiesfuncionalidad: any[] = [];
  editarcookies: boolean = false;

  textconts: TextContentsModel = new TextContentsModel();
  listatextcontsdata: TextDataModel[] = [];


  constructor(
    private auth: AuthService,
    private alertasService: AlertasService,
    private homeService: HomeService,
    private headfooterService: HeadfooterService,
    private platformService: PlatformService,
    private providerService: ProviderService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private globalService: GlobalService,
  ) {
    //leer persona
    this.adminactive = false;
  }

  ngOnInit() {
    this.getcookiesconsent();
    this.crearFormularioI();
    this.cambiosFormularioI();

    // this.getMessageFooter();
    this.getListaCookies();
    this.listenProvider();
    this.getTexts();
    

  }

  getTexts(){
    this.listatextcontsdata = this.globalService.listaTextDataModel
    this.textconts = this.globalService.textcontents;
    if(!this.textconts.dataok){
      this.globalService.getTextcontentsglobal().subscribe((resp)=>{
        if(resp){
          this.listatextcontsdata = resp as TextDataModel[] ?? [] ;
          this.textconts = this.globalService.setTextContentsByLanguage(this.listatextcontsdata , this.globalService.idlang  );
        }
      })
    }
  }

  listenProvider(){
    this.providerService.getThrowFooterpol.subscribe((resp)=>{
      if(resp){
        this.nomostrarenlacesfooter = false;
      }
      else{
        this.nomostrarenlacesfooter = true;
      }
    });
  }



  showwidg1() {
    this.widg1show = !this.widg1show;
    this.widg2show = false;
  }
  showwidg2() {
    this.widg2show = !this.widg2show;
    this.widg1show = false;
  }


  //////////////////cookies
  gestionarcookies() {
    
    this.cookFuncionalidad();
    this.cookRendimiento();
    this.cookSeguimiento();

    this.resetear();
    if(this.modalI != null){
      this.modalI.dismiss();
    }
    this.cookiesconsent = true;
  }

  //let encuentra = localStorage.getItem('activarcookiefuncionalidad');
  //if(encuentra == undefined){}

  cookFuncionalidad() {
    ///activarcookiefuncionalidad
    if (this.platformService.plId == 'browser') {
      if (this.funcionalidadsel) {
        localStorage.setItem('activarcookiefuncionalidad', 'true');
      } else {
        localStorage.setItem('activarcookiefuncionalidad', 'false');
      }
    }
  }

  cookRendimiento() {
    ///'activarcookierendimiento'
    if (this.platformService.plId == 'browser') {
      if (this.rendimientosel) {
        localStorage.setItem('activarcookierendimiento', 'true');
      } else {
        localStorage.setItem('activarcookierendimiento', 'false');
      }
    }
  }

  cookSeguimiento() {
    ///activarcookieseguimiento
    
    if (this.platformService.plId == 'browser') {
      if (this.seguimientosel) {
        this.listacookiesseguimiento.forEach((element) => {
          this.resetCookie(element);
        });
      } else {
        this.listacookiesseguimiento.forEach((element) => {
          this.deleteCookie(element);
        });
      }
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
      this.funcionalidadsel = this.formasetcookies.get('funcionalidad').value;
      this.rendimientosel = this.formasetcookies.get('rendimiento').value;
      this.seguimientosel = this.formasetcookies.get('seguimiento').value;

      if (this.formasetcookies.status != 'INVALID') {
        ///guardar en localstorage
        this.setcookies();
      }
    });
  }

  setpestanacookie(n) {
    this.pestacookie = n;
  }

  setcookies() {
    localStorage.setItem('funcionalidad', this.funcionalidadsel.toString());
    localStorage.setItem('rendimiento', this.rendimientosel.toString());
    localStorage.setItem('seguimiento', this.seguimientosel.toString());
  }

  getcookies() {
    this.funcionalidadsel = Boolean(localStorage.getItem('funcionalidad'));
    this.rendimientosel = Boolean(localStorage.getItem('rendimiento'));
    this.seguimientosel = Boolean(localStorage.getItem('seguimiento'));
  }

  getcookiesconsent() {
    let coo = localStorage.getItem('cookiesconsent');
    this.cookiesconsent = false;
    if (coo != null) {
      this.cookiesconsent = true;
    }
  }

  cerrarmodalI() {
    this.resetear();
    if(this.modalI != null){
      this.modalI.dismiss();
    }
  }

  openI(content) {
    this.resetear();
    this.modalI = this.modalService.open(content, this.modalOptions);
  }

  resetear() {
    this.getcookies();

    if(this.formasetcookies){
      this.formasetcookies.controls['funcionalidad'].setValue(
        this.funcionalidadsel
      );
      this.formasetcookies.controls['rendimiento'].setValue(this.rendimientosel);
      this.formasetcookies.controls['seguimiento'].setValue(this.seguimientosel);
      localStorage.setItem('cookiesconsent', 'true');
    }
  }

  aceptarcookiestodas() {
    ///aceptar cada tipo de cookie en tagmanager a la vez
    localStorage.setItem('cookiesconsent', 'true');
    this.cookiesconsent = true;
    this.funcionalidadsel = true;
    this.rendimientosel = true;
    this.seguimientosel = true;
    this.gestionarcookies();
  }

  denegarcookies() {
    ///no activar ninguna cookie
    localStorage.setItem('cookiesconsent', 'false');
    this.cookiesconsent = true;
    this.funcionalidadsel = false;
    this.rendimientosel = false;
    this.seguimientosel = false;
    this.gestionarcookies();
  }

  
  ///manejar cookies
  resetCookie(name) {
    let thiscookie = this.getCookie(name);
    
    let date = new Date();
    date.setTime(date.getTime() + (365*24*60*60*1000));
    let expires = "; expires=" + date.toUTCString();
    this.platformService.sDocument.cookie = name+'='+expires+'; path=/';  
  }

  getCookie(name) {
    var nameEQ = name + "=";
    var ca = this.platformService.sDocument.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
         c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
  }

  deleteCookie(name) {   
    this.platformService.sDocument.cookie = name+'=; Max-Age=-99999999;';  
  }

  ///////////////////incluir cookies que se usan ///puede incluirse desde back
  getListaCookies() {
    this.listacookiesfuncionalidad = [];
    this.listacookiesrendimiento = [];
    this.listacookiesseguimiento = [
      '_ga',
    ];
  }

  abrireditarcookies(modal: any){
    this.openI(modal);
    this.editarcookies = true;
  }

  
}
