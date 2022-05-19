import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';



@Component({
  selector: 'app-bannerhome',
  templateUrl: './bannerhome.component.html'
})
export class BannerhomeComponent implements OnInit {

  public show: boolean = true;
  public textobanner :TextosModel = new TextosModel() ;
  public imagenbanner: ImagenesModel = new ImagenesModel();
  public cargados: boolean = false;
  

  constructor(
    private imagenesService: ImagenesService,
    private textosService: TextosService

  ) {
  ///    
  }


  ngOnInit(): void {
     this.imagenbanner = new ImagenesModel();
     this.imagenbanner.rutapc = "";
     this.imagenbanner.rutamovil = "";
     //imagen  banner
     this.getImagenBanner("1");
  }

  getImagenBanner(idenlace: string){
    let posicion = 1;//posicion 1º
    let resp = this.imagenesService.getImagenBanner(idenlace) ;
       if(resp != null){
         this.imagenbanner = resp ;
       }
       this.cargados = true;
  
  }


  

  
  

}
