import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { Router, ActivatedRoute  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HomeService } from '../../services/home.service';
import { VisitaService } from '../../services/visita.service';
import { SwiperModule, SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-slidervisitas',
  templateUrl: './slidervisitas.component.html'
})
export class SlidervisitasComponent implements OnInit, AfterViewInit {
 
  @Input() textconts: TextContentsModel = new TextContentsModel();
  @Input() recommendedData: VisitasResultadoModel[] = [];

  public show: boolean = true;

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
          slidesPerView: 4
        },
        1190: {
          slidesPerView: 4
        },
        1090: {
          slidesPerView: 4
        },
        990: {
          slidesPerView: 3.6
        },
        890: {
          slidesPerView: 3.3
        },
        790: {
          slidesPerView: 3
        },
        690: {
          slidesPerView: 2.5
        },
        590: {
          slidesPerView: 2
        },
        490: {
          slidesPerView: 1.6
        },
        400: {
          slidesPerView: 1.4
        },
    }
  };

  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private homeService: HomeService,
    private visitaService: VisitaService,
    private globalService: GlobalService,
  ) 
  {  
      this.wowService.init(); 
      
  }


  ngOnInit(): void {    
    

  }

  ngAfterViewInit() {
    
  }


  verrecomendadas(){
    this.router.navigate(['/buscador', true]);
  }

  verdetalle(visita: VisitasResultadoModel){
    this.router.navigateByUrl('/visita/'+ visita.id );
  }

   
  getFormattedDuration(visita: VisitasResultadoModel): string {
    return this.visitaService.getFormattedDuration(visita);
  }

  getFormattedPrice(visita: VisitasResultadoModel): string {
    return this.visitaService.getFormattedPrice(visita);
  }

}
