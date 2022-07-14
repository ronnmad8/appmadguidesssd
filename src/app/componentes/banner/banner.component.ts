import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';



@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit, AfterViewInit {

  @Input() enlace: string = "";
  @Input() imageBanner: ImagenesModel;

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
     this.imagenbanner.url = "";
     this.imagenbanner.url_movil = "";
     
     
  }

  ngAfterViewInit(){
    this.getImagenBanner();
  }

  getImagenBanner(){
    this.imagenbanner = this.imageBanner ;
  
  }


  

  
  

}
