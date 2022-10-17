import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';
import { GlobalService } from '../../services/global.service';
import { HomeService } from '../../services/home.service';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { MessagesModel } from 'src/app/models/Messages.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { MessagesSearchModel } from 'src/app/models/MessagesSearch.model';



@Component({
  selector: 'app-bannerbuscador',
  templateUrl: './bannerbuscador.component.html'
})
export class BannerbuscadorComponent implements OnInit, AfterViewInit {

  @Input() mostrarmodalbuscador: boolean = true;
  @Input() bannerfichadeproductoData: ImagenesModel = new ImagenesModel();
  @Input() messageSearchData: MessagesSearchModel = new MessagesSearchModel();
  @Input() numactividades: number = 0;
  @Input() busqueda: string = "";



  show: boolean = true;
  textobanner :TextosModel = new TextosModel() ;
  imagenbanner: ImagenesModel = new ImagenesModel();
  cargados: boolean = false;

  visitasprop: VisitasModel[] = [];
  verbusca :boolean = false;
  menuvisto :boolean = true;
  possc :number = 0;


  constructor(
    private homeService: HomeService

  ) {
    //this.bannerfichadeproductoData.url = "../../assets/images/sinimagen.jpg";
  }


  ngOnInit(): void {
    
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
