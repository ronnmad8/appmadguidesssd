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



@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html'
  
})

export class PoliticasComponent implements OnInit {

  @Input () messagePoliticasData: TextopoliticasModel = new  TextopoliticasModel();

  isrespon: boolean = false;


  constructor(
    private wowService: NgwWowService,
    private router: Router,

    private renderer: Renderer2,
    private modalService: NgbModal,
    private auth: AuthService ,
  ) { 
    this.wowService.init(); 
  }


  ngOnInit(): void {
    this.isresponsive();
  }


  @HostListener("window:scroll")
  onWindowScroll() {
    let posactual = window.pageYOffset ;
  
  }


  isresponsive(){
    let scree = window.innerWidth;
    if(scree < 1198){
      this.isrespon = true;
    }
  }





}


