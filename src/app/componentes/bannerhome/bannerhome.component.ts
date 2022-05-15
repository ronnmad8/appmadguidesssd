import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';



@Component({
  selector: 'app-bannerhome',
  templateUrl: './bannerhome.component.html'
})
export class BannerhomeComponent implements OnInit {

  @Input() enlace: string = "";

  public show: boolean = true;
  public textobanner :TextosModel = new TextosModel() ;
  public imagenbanner: ImagenesModel = new ImagenesModel();
  public cargados: boolean = false;
  

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
     this.getImagenBanner(this.enlace);
  }

  getImagenBanner(idenlace: string){
    let posicion = 1;//posicion 1º
    let tipo = 1;//tipo banner
    let tipotexto = 1;//tipo titulo ppal
    this.imagenesService.getImagenesFiltpos( parseInt(idenlace) , tipo, posicion)
    .subscribe( (resp) => {
       if(resp != null){
         this.imagenbanner = resp as ImagenesModel ;
       }
       this.cargados = true;
    });
  }


  

  
  

}
