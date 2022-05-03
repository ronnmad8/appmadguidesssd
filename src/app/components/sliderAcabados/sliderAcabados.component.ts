import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';

import { AcabadosModel } from 'src/app/models/Acabados.model';
import { AcabadosService } from '../../services/acabados.service';




@Component({
  selector: 'app-sliderAcabados',
  templateUrl: './sliderAcabados.component.html'
})
export class SliderAcabadosComponent implements OnInit {


  @Input() enlace: string;
  @Input() initial: string;
  @Input() imagenesgaleria: AcabadosModel[];
  
  
  public show: boolean = true;
  public imagenesAcabados :AcabadosModel[] = [];

  public config: SwiperConfigInterface;
  
  constructor(
    private Service: AcabadosService


  ) {

    
  }

  ngOnInit(): void {


    this.config = {
      autoplay: false,
      initialSlide: parseInt(this.initial),
      effect: 'fade',
      a11y: true,
      direction: 'horizontal',
      slidesPerView: 1,
      slideToClickedSlide: true,
      mousewheel: false,
      scrollbar: false,
      watchSlidesProgress: true,
      navigation: true,
      keyboard: true,
      pagination: true,
      centeredSlides: true,
      loop: false,
      roundLengths: true,
      slidesOffsetBefore: 10,
      slidesOffsetAfter: 10,
      spaceBetween: 5,
    };

    


    if( this.imagenesgaleria != null){
      this.imagenesAcabados = this.imagenesgaleria ;

    }



  }







  

  
  

}
