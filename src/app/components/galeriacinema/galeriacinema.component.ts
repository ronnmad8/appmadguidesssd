import { Component, Input, OnInit } from '@angular/core';
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { ImagenesModel } from 'src/app/models/imagenes.model';
import { ImagenesgaleriaModel } from 'src/app/models/Imagenesgaleria.model';
import { ImagenesService } from '../../services/imagenes.service';
import { ImagenesgaleriaService } from '../../services/imagenesgaleria.service';
import { TextosModel } from 'src/app/models/textos.model';
import { TextosService } from '../../services/textos.service';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-galeriacinema',
  templateUrl: './galeriacinema.component.html'
})
export class GaleriacinemaComponent implements OnInit {

  @Input() idenlace: number;

  cargados: boolean = false;
  idtipo: number = 5;
  idtipotexto: number = 7;
  
  inic: number;
  imagenesgallery:ImagenesgaleriaModel[] = [];

  imagenpc: string ="";
  imagenmovil: string ="";
  imagenobs: string ="";
  imagennom: string ="";

  public config: SwiperConfigInterface = {
    autoplay: false,
    effect: 'slide',
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 4,
    slideToClickedSlide: false,
    speed: 1000,
    mousewheel: false,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    pagination: true,
    centeredSlides: true,
    loop: true,
    loopedSlides: 0,
    initialSlide: 2,
    loopFillGroupWithBlank: false,
    roundLengths: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    spaceBetween: 1,
    breakpoints: {
        900: {
          slidesPerView: 1
        },
        400: {
            slidesPerView: 1
        }
    }
  };

  public config2: SwiperConfigInterface = {
    autoplay: false,
    effect: 'slide',
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 2,
    slideToClickedSlide: true,
    speed: 1000,
    mousewheel: false,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    pagination: false,
    centeredSlides: true,
    loop: true,
    loopedSlides: 0,
    initialSlide: 0,
    loopFillGroupWithBlank: false,
    roundLengths: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 200,
    spaceBetween: 1,
    parallax: true,
    breakpoints: {
        800: {
            slidesPerView: 1
        }
    }
  };

  constructor(
    private ro: ActivatedRoute,
      private router: Router,
      private imagenesService: ImagenesService,
      private imagenesgaleriaService: ImagenesgaleriaService,
      private textosService: TextosService,
      private wowService: NgwWowService
  ) {
    
    this.wowService.init();

   }

  ngOnInit() {
    this.getImagenes();
  }

  getImagenes(){
    this.imagenesgaleriaService.getImagenesgaleriaFilt(this.idenlace , this.idtipo)
    .subscribe( (resp :ImagenesgaleriaModel[]) => {
       if(resp){
         this.imagenesgallery = resp ;
         
         this.cargados = true;
         this.opencinema(this.imagenesgallery[0]);
       }
    });
    
  }

  scrollToElement(element: Element): void {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  opencinema(ev: ImagenesgaleriaModel) {
  
    this.imagenpc = ev.rutapc;
    this.imagenmovil = ev.rutamovil;
    this.imagenobs = ev.descripcion;
    this.imagennom = ev.nombre;
    
  }

}
