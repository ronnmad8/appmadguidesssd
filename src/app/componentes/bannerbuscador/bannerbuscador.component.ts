import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { GlobalService } from '../../services/global.service';
import { HomeService } from '../../services/home.service';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { MessagesModel } from 'src/app/models/Messages.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { TextosearchModel } from 'src/app/models/Textosearch.model';
import { PlatformService } from 'src/app/services/platform.service';



@Component({
  selector: 'app-bannerbuscador',
  templateUrl: './bannerbuscador.component.html'
})
export class BannerbuscadorComponent implements OnInit, AfterViewInit {

  @Input() mostrarmodalbuscador: boolean = true;
  @Input() bannerfichadeproductoData: ImagenesModel = new ImagenesModel();
  @Input() messageSearchData: TextosearchModel = new TextosearchModel();
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
    private homeService: HomeService,
    private platformService: PlatformService
  ) {
   ///
  }


  ngOnInit(): void {
    
  }

  ngAfterViewInit(){ 

  }


  @HostListener("window:scroll")
  onWindowScroll() {
    let sWindow = this.platformService.sWindow ;
    let scrollPosition = sWindow.pageYOffset ;
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
