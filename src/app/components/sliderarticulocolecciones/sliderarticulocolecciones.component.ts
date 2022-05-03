import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';

import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ArticulocoleccionesModel } from 'src/app/models/articulocolecciones.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';



@Component({
  selector: 'app-sliderarticulocolecciones',
  templateUrl: './sliderarticulocolecciones.component.html',
  styleUrls: ['./sliderarticulocolecciones.component.css']
})
export class SliderarticulocoleccionesComponent implements OnInit {


  @Input() enlace: string;
  @Input() initial: string;
  @Input() coleccion: string;
  @Input() imagenesgaleria: ArticulocoleccionesModel[];
  
  
  public inic: number = 0; 
  public show: boolean = true;
  public imagenesarticulos :ArticulocoleccionesModel[] = [];
  public textoslightbox :TextosModel[] = []

  public config: SwiperConfigInterface;
  
  constructor(
    private imagenesService: ImagenesService,
    private textosService: TextosService

  ) {

    
  }

  ngOnInit(): void {
    
    if(this.initial != ""){
      this.inic = parseInt(this.initial) -1; 
    }

    this.config = {
      autoplay: false,
      initialSlide: this.inic,
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
      this.imagenesarticulos = this.imagenesgaleria ;
    }



  }







  

  
  

}
