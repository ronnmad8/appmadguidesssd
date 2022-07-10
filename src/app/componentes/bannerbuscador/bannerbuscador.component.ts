import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';
import { GlobalService } from '../../services/global.service';
import { VisitasModel } from 'src/app/models/Visitas.model';



@Component({
  selector: 'app-bannerbuscador',
  templateUrl: './bannerbuscador.component.html'
})
export class BannerbuscadorComponent implements OnInit {

  @Input() mostrarmodalbuscador: boolean = true;


  show: boolean = true;
  textobanner :TextosModel = new TextosModel() ;
  imagenbanner: ImagenesModel = new ImagenesModel();
  cargados: boolean = false;
  idenlace: string = "1";
  busqueda: string = "";
  visitasprop: VisitasModel[] = [];
  verbusca :boolean = false;
  menuvisto :boolean = true;
  possc :number = 0;
  

  constructor(
    private imagenesService: ImagenesService,
    private textosService: TextosService,
    private globalService: GlobalService

  ) {
  ///    
  }


  ngOnInit(): void {
     this.imagenbanner = new ImagenesModel();
     this.imagenbanner.rutapc = "";
     this.imagenbanner.rutamovil = "";
     //imagen  banner
     this.getImagenBanner("2");
     this.getVisitasprop();
  }

  @HostListener("window:scroll")
  onWindowScroll() {
    let scrollPosition = window.pageYOffset ;
     this.menuvisto = false;

     if(this.possc > scrollPosition){
       this.menuvisto = true;
     }
     this.possc = scrollPosition;
  }


  getImagenBanner(idenlace: string){
    let posicion = 1;//posicion 1º
    let resp = this.imagenesService.getImagenBanner(idenlace) ;
       if(resp != null){
         this.imagenbanner = resp ;
       }
       this.cargados = true;
  
  }

  buscarprop(){
    let textoabuscar = this.busqueda;
  }

  vertodos(){
    ///ir a buscador
  }

  vercajabusca(){
    this.verbusca = !this.verbusca;
  }


  getVisitasprop(){
    this.visitasprop = this.globalService.getVisitasprop();
    
    //.subscribe( (resp : ArticulocoleccionesModel[]) => { if(resp != null){this.listavisitashome = resp ;} })
    
  }
  

  
  

}
