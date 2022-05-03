import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';

import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';



@Component({
  selector: 'app-sliderproveedores',
  templateUrl: './sliderproveedores.component.html'
})
export class SliderproveedoresComponent  implements OnInit{

  @Input() enlace: string;

  public show: boolean = true;
  public imagenesproveedores :ImagenesModel[] = [];
  public textosproveedores :TextosModel[] = [];
  public idenlace: number;
  public idtipo: number;
  public idtipotexto: number;
  public proveedorescargadas: boolean = false;

  public config3: SwiperConfigInterface = {
    autoplay: true,
    effect: 'slide',
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 4,
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
    slidesOffsetBefore: 25,
    slidesOffsetAfter: 25,
    spaceBetween: 100,
    parallax: true,
    breakpoints: {
        1000: {
            slidesPerView: 1
        }
    }
  };

  constructor(
    private imagenesService: ImagenesService,
    private textosService: TextosService

  ) {

    //tipo sliderproveedores
    this.idtipo = 4;
    //tipotexto titulo
    this.idtipotexto = 5;
     
  }


  ngOnInit(): void {
      
    this.idenlace = parseInt(this.enlace);
    //imagenes
    this.imagenesService.getImagenesFilt(this.idenlace , this.idtipo)
    .subscribe( (resp :ImagenesModel[]) => {
       if(resp){
         this.imagenesproveedores = resp ;
         this.proveedorescargadas = true;
       }
    });

  }








}
