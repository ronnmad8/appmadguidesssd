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
import { TextoayudaModel } from 'src/app/models/Textoayuda.model';
import { PlatformService } from 'src/app/services/platform.service';



@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html'
  
})

export class FaqsComponent implements OnInit {

  @Input () imagenempresaData: ImagenesModel = new ImagenesModel();
  @Input () messageFaqsData: TextoayudaModel = new  TextoayudaModel();
  sWindow: any;

  isrespon: boolean = false;
  verq1: boolean = false;
  verq2: boolean = false;
  verq3: boolean = false;
  verq4: boolean = false;
  verq5: boolean = false;

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



  mandarwhatsapp(){
    let url = 'https://api.whatsapp.com/send?phone=34656786524&text=Hola%20me%20gustaría%20saber%20más%20de%20la%20empresa';
    this.sWindow.open(url, '_blank');
  }


  verqu(num: number){


    switch(num){
      case 1:
        this.verq1 = !this.verq1;
        break;
      case 2:
        this.verq2 = !this.verq2;
        break;
      case 3:
        this.verq3 = !this.verq3;
        break;
      case 4:
        this.verq4 = !this.verq4;
        break;
      case 5:
        this.verq5 = !this.verq5;
        break;

    }
  }




}


