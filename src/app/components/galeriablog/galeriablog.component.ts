import { Component, Input, OnInit } from '@angular/core';
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { ImagenesModel } from 'src/app/models/imagenes.model';
import { BlogarticulosModel } from 'src/app/models/blogarticulos.model';
import { ImagenesgaleriaModel } from 'src/app/models/Imagenesgaleria.model';
import { ImagenesService } from '../../services/imagenes.service';
import { ImagenesgaleriaService } from '../../services/imagenesgaleria.service';
import { CategoriasService } from '../../services/categorias.service';
import { TextosModel } from 'src/app/models/textos.model';
import { TextosService } from '../../services/textos.service';
import { BlogarticulosService } from '../../services/blogarticulos.service';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { __classPrivateFieldGet } from 'tslib';
import { CategoriasModel } from 'src/app/models/categorias.model';

@Component({
  selector: 'app-galeriablog',
  templateUrl: './galeriablog.component.html'
})
export class GaleriablogComponent implements OnInit {

  @Input() idcategoria: number = 0;
  @Input() year: number = 0;
  @Input() month: number = 0;


  titulo:string =  "ARTÍCULOS ANTERIORES";
  cargados: boolean = false;
  idtipo: number = 5;
  idtipotexto: number = 7;
  articulos: BlogarticulosModel[] = [];
  inic: number;
  categorias: CategoriasModel[] = [];
  fechas: string[] = [];
  fecha: string = "";
  categoria: string = "";

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
    loopedSlides: 4,
    initialSlide: 0,
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

  constructor(
    private ro: ActivatedRoute,
      private router: Router,
      private imagenesService: ImagenesService,
      private imagenesgaleriaService: ImagenesgaleriaService,
      private textosService: TextosService,
      private blogarticulosService: BlogarticulosService,
      private categoriasService: CategoriasService,
      private wowService: NgwWowService
  ) {
    
    this.wowService.init();
    this.fecha = this.year+"/"+this.month ;

   }

  ngOnInit() {

    this.getListCategorias();
    this.getListBlog(this.idcategoria, this.year, this.month);
    
  }

  

  scrollToElement(element: Element): void {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }



  getListBlog(idcategoria: number, year: number, month: number){

    this.blogarticulosService.getblogarticulosFilt( idcategoria ,year, month) 
      .subscribe( (resp: BlogarticulosModel[]) => {
        
        if(resp != undefined){
          this.articulos = resp ;
          this.articulos.forEach( (it)=>{
            let fe = it.fecha.split('-')[0]+"/"+it.fecha.split('-')[1] ;
            if( !this.fechas.includes(fe) ){
              this.fechas.push(fe);
            }
          })
          this.cargados = true;
          
        }
      });
  }


  getListCategorias(){

    this.categoriasService.getListaCategorias() 
      .subscribe( (resp: CategoriasModel[]) => {
        if(resp != undefined){
          this.categorias = resp ;
        }
      });
   }


   filtrarfecha(filfe){
      this.fecha = filfe.value ;
      this.month = Number(this.fecha.split('/')[1]);
      this.year = Number(this.fecha.split('/')[0]);
      console.log(this.categoria, this.month, this.year);
      this.getListBlog(this.idcategoria, this.year , this.month );
   }

   filtrarcategoria(filcate){
      this.categoria = filcate.value ;
      console.log(this.categoria, this.month, this.year);
      this.getListBlog(this.idcategoria, this.year , this.month );
   }




}
