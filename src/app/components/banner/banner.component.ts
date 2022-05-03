import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';

import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';



@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input() enlace: string;

  public show: boolean = true;
  public textobanner :TextosModel ;

  public cargados: boolean = false;
  public imagenbanner: ImagenesModel;

  

  constructor(
    private imagenesService: ImagenesService,
    private textosService: TextosService

  ) {

    
  }


  ngOnInit(): void {
     this.imagenbanner = new ImagenesModel();
     this.imagenbanner.rutapc = "";
     this.imagenbanner.rutamovil = "";
     //imagen  banner
     this.getImagenBanner(this.enlace)


  }

  getImagenBanner(idenlace){
    this.imagenesService.getImagenesFiltpos( parseInt(idenlace) , 1, 1)
    .subscribe( (resp :ImagenesModel) => {
   
       if(resp != null){
         this.imagenbanner = resp ;
         
         ////texto banner
         this.textosService.getTextosFiltpos(parseInt(this.enlace), 1, 1)
         .subscribe( (resp2 :TextosModel) => {
     
             this.imagenbanner.titulo = resp2.texto ;
             this.cargados = true;
         });
       }
       this.cargados = true;
    });
  }


  

  
  

}
