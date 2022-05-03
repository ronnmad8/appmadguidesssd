import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';

import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';



@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html'
})
export class SliderComponent implements OnInit {


  @Input() enlace: string;
  
  public show: boolean = true;
  public imagenesbanner :ImagenesModel[] = [];
  public textosbanner :TextosModel[] = [];
  public idenlace: number;
  public idtipo: number = 1;
  public idtipotexto: number;
  public cargados: boolean = false;

  public config: SwiperConfigInterface = {
    autoplay: {
      delay: 6000,
      disableOnInteraction:false
    },
    initialSlide: 0,
    effect: 'fade',
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    slideToClickedSlide: false,
    mousewheel: false,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    pagination: false,
    centeredSlides: true,
    loop: false,
    roundLengths: true,
    slidesOffsetBefore: 100,
    slidesOffsetAfter: 100,
    spaceBetween: 50,
    // breakpoints: {
    //     // when window width is >= 320px
    //     400: {
    //         slidesPerView: 1
    //     }
    // }
  };

  constructor(
    private imagenesService: ImagenesService,
    private textosService: TextosService

  ) {

    
  }

  ngOnInit(): void {

    this.idenlace = parseInt(this.enlace);
 
    this.imagenesService.getBannershome(this.idenlace , this.idtipo)
     .subscribe( (resp :ImagenesModel[]) => {
        if(resp){
          this.imagenesbanner = resp ;
          this.cargados = true;
        }
     });

  }







  

  
  

}
