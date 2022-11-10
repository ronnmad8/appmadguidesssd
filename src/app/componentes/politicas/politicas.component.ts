import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, Renderer2, Output, EventEmitter } from '@angular/core';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { VisitaService } from '../../services/visita.service';
import { AuthService } from '../../services/auth.service';
import { Options } from "@angular-slider/ngx-slider";
import { SwiperModule, SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';
import { Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import * as moment from 'moment';
import { LanguagesModel } from 'src/app/models/Languages.model';
import { trigger, animate, transition, style } from '@angular/animations';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TextopoliticasModel } from 'src/app/models/Textopoliticas.model';
import { PlatformService } from 'src/app/services/platform.service';



@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html'
  
})

export class PoliticasComponent implements OnInit {

  @Input () messagePoliticasData: TextopoliticasModel = new  TextopoliticasModel();
  sWindow: any;

  isrespon: boolean = false;


  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private renderer: Renderer2,
    private modalService: NgbModal,
    private auth: AuthService ,
    private platformService: PlatformService
  ) { 
    this.wowService.init(); 
    this.sWindow = this.platformService.sWindow ;
  }


  ngOnInit(): void {
    this.isrespon = this.platformService.isrespon;
  }


  @HostListener("window:scroll")
  onWindowScroll() {
    let posactual = this.sWindow.pageYOffset ;
  
  }






}


