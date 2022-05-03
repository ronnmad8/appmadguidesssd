import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';

import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';



@Component({
  selector: 'app-slidercolecciones',
  templateUrl: './slidercolecciones.component.html'
})
export class SlidercoleccionesComponent implements OnInit  {

  @Input() enlace: string;

  public show: boolean = true;
  public imagenescolecciones :ImagenesModel[] = [];
  public textoscolecciones :TextosModel[] = [];
  public idenlace: number;
  public idtipo: number;
  public idtipotexto: number;
  public coleccionescargadas: boolean = false;


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
    pagination: true,
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
    private imagenesService: ImagenesService,
    private textosService: TextosService

  ) {
    
    //tipo slidercolecciones
    this.idtipo = 3;


  }

  ngOnInit(): void {
      
    this.idenlace = parseInt(this.enlace);

    //imagenes
     this.imagenesService.getColeccioneshome(this.idenlace , this.idtipo)
     .subscribe( (resp :ImagenesModel[]) => {

        if(resp != undefined){
          this.imagenescolecciones = resp ;
          this.coleccionescargadas = true ;
        }
     });


  }





}
