import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { GlobalService } from '../../services/global.service';
import { HomeService } from '../../services/home.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { PlatformService } from 'src/app/services/platform.service';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';


@Component({
  selector: 'app-bannerbuscador',
  templateUrl: './bannerbuscador.component.html'
})
export class BannerbuscadorComponent implements OnInit, AfterViewInit {

  @Input() mostrarmodalbuscador: boolean = true;
  @Input() textconts: TextContentsModel = new TextContentsModel();
  @Input() numactividades: number = 0;
  @Input() busqueda: string = "";



  show: boolean = true;
  imagenbanner: ImagenesModel = new ImagenesModel();
  cargados: boolean = false;

  visitasprop: VisitasResultadoModel[] = [];
  verbusca :boolean = false;
  menuvisto :boolean = true;
  possc :number = 0;


  constructor(
    private homeService: HomeService,
    private platformService: PlatformService,
    private globalService: GlobalService,
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
      this.visitasprop = resp as VisitasResultadoModel[];
      this.visitasprop = this.globalService.getImageDefault(this.visitasprop);
    }) ;
  }

  
}
