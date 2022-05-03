import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';

import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';



@Component({
  selector: 'app-collageproveedores',
  templateUrl: './collageproveedores.component.html'
})
export class CollageproveedoresComponent  implements OnInit{

  @Input() enlace: string;

  public show: boolean = true;
  public imagenesproveedores :ImagenesModel[] = [];
  public textosproveedores :TextosModel[] = [];
  public idenlace: number;
  public idtipo: number;
  public idtipotexto: number;
  public proveedorescargadas: boolean = false;


  constructor(
    private imagenesService: ImagenesService,
    private textosService: TextosService

  ) {

    //tipo collageproveedores
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
