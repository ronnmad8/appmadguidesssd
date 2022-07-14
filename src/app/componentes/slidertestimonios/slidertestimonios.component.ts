import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HomeService } from '../../services/home.service';
import { SwiperModule, SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';
import { ComentariosModel } from 'src/app/models/Cometarios.model';
import { ImagenesModel } from 'src/app/models/Imagenes.model';



@Component({
  selector: 'app-slidertestimonios',
  templateUrl: './slidertestimonios.component.html'
})
export class SlidertestimoniosComponent implements OnInit {
 

  public show: boolean = true;
  public cargados: boolean = false;
  public listacomentarioshome: ComentariosModel[] = [];
  imagenlogo: ImagenesModel = new ImagenesModel();

  public config: SwiperConfigInterface = {
    autoplay: false,
    effect: 'slide',
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    slideToClickedSlide: false,
    speed: 1000,
    mousewheel: false,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    pagination: false,
    centeredSlides: false,
    loop: true,
    loopedSlides: 0,
    initialSlide: 1,
    loopFillGroupWithBlank: false,
    roundLengths: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    spaceBetween: 1,
    breakpoints: {
      1290: {
        slidesPerView: 1
      },
      590: {
        slidesPerView: 1.05
      },
      490: {
        slidesPerView: 1.15
      },

    }

  };

  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private homeService: HomeService,
  ) 
  {  
      this.wowService.init(); 
  }


  ngOnInit(): void {
    this.getComentarioshome();

  }

  getComentarioshome(){
    this.homeService.getComentariosHome().subscribe( (resp) => {
      this.listacomentarioshome =  resp as ComentariosModel[];
      this.cargados = true;
    } );
  }

  verActividad(){
    alert("ver actividad");
  }
  
  getImagenLogo(logo: ImagenesModel){
    this.imagenlogo = logo ;
  }

}
