import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';
import { GlobalService } from '../../services/global.service';
import { HomeService } from '../../services/home.service';
import { VisitasModel } from 'src/app/models/Visitas.model';



@Component({
  selector: 'app-bannerbuscador',
  templateUrl: './bannerbuscador.component.html'
})
export class BannerbuscadorComponent implements OnInit, AfterViewInit {

  @Input() mostrarmodalbuscador: boolean = true;
  @Input() imagebanner: ImagenesModel ;


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
    private globalService: GlobalService,
    private homeService: HomeService

  ) {
  ///    
  }


  ngOnInit(): void {
     this.imagenbanner = new ImagenesModel();
     this.imagenbanner.url = "../../assets/images/banner-ficha-de-producto.jpg";
     this.imagenbanner.url_movil = "";
     //imagen  banner
     
  }

  ngAfterViewInit(){ 

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


  vertodos(){
    ///ir a buscador
  }

  vercajabusca(){
    this.verbusca = !this.verbusca;
  }

  buscarprop(){
      this.homeService.getCajaBuscaHome(this.busqueda).subscribe(resp => {  
      this.visitasprop = resp as VisitasModel[]; 
    }) ;
  }

  
  

}
