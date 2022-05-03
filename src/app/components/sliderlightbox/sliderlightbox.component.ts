import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';

import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';



@Component({
  selector: 'app-sliderlightbox',
  templateUrl: './sliderlightbox.component.html',
  styleUrls: ['./sliderlightbox.component.css']
})
export class SliderlightboxComponent implements OnInit {


  @Input() enlace: string;
  @Input() initial: string;
  @Input() idtipoimagen: string;
  @Input() imagenesgaleria: ImagenesModel[];
  
  
  public show: boolean = true;
  public imageneslightbox :ImagenesModel[] = [];
  public textoslightbox :TextosModel[] = []

  public config: SwiperConfigInterface;
  
  constructor(
    private imagenesService: ImagenesService,
    private textosService: TextosService

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
      this.imageneslightbox = this.imagenesgaleria ;

    }



  }







  

  
  

}
