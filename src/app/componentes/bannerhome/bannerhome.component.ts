import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';
import { GlobalService } from '../../services/global.service';
import { HomeService } from '../../services/home.service';
import { VisitasModel } from 'src/app/models/Visitas.model';



@Component({
  selector: 'app-bannerhome',
  templateUrl: './bannerhome.component.html'
})
export class BannerhomeComponent implements OnInit, AfterViewInit {

  @Input() mostrarmodalbuscador: boolean = true;
  


  show: boolean = true;
  textobanner :TextosModel = new TextosModel() ;
  imagenbanner: ImagenesModel = new ImagenesModel();
  cargados: boolean = false;
  visitasprop: VisitasModel[] = [];
  busqueda: string = "";

  constructor(
    private imagenesService: ImagenesService,
    private textosService: TextosService,
    private globalService: GlobalService,
    private homeService: HomeService

  ) {
  ///    
  }


  ngOnInit(): void {
     this.imagenbanner = new ImagenesModel();
     this.imagenbanner.url = "";
     this.imagenbanner.url_movil = "";
     
  }

  ngAfterViewInit(){
    
  }

  getImagenBanner(bannertop: ImagenesModel){
    this.imagenbanner = bannertop ;
  }


  vertodos(){
    ///ir a buscador
  }

  buscarprop(){
    this.homeService.getCajaBuscaHome(this.busqueda).subscribe(resp => {  
      this.visitasprop = resp as VisitasModel[]; 

    }) ;
  }




  

  
  

}
