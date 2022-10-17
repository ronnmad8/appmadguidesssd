import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';
import { GlobalService } from '../../services/global.service';
import { HomeService } from '../../services/home.service';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { MessagesModel } from 'src/app/models/Messages.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { ResultadoModel } from 'src/app/models/Resultado.model';




@Component({
  selector: 'app-bannerhome',
  templateUrl: './bannerhome.component.html'
})
export class BannerhomeComponent implements OnInit, AfterViewInit {

  @Input() mostrarmodalbuscador: boolean = true;
  @Input() messageData: MessagesModel = new MessagesModel();
  @Input() bannertopData: ImagenesModel = new ImagenesModel();
  

  visitasprop: VisitasResultadoModel[] = [];
  busqueda: string = "";

  constructor(
    private acro : ActivatedRoute,
    private router: Router,
    private imagenesService: ImagenesService,
    private textosService: TextosService,
    private globalService: GlobalService,
    private homeService: HomeService

  ) {
  ///    
  }


  ngOnInit(): void {
     
     
  }

  ngAfterViewInit(){
  }

  
  vertodos(){
    ///ir a buscador
  }

  buscarprop(){
    this.homeService.getCajaBuscaHome(this.busqueda).subscribe(resp => {  
      let resultado = resp as ResultadoModel;
      this.visitasprop = resultado.data as VisitasResultadoModel[];
      
    }) ;
  }
  
  verbuscador(){
    this.router.navigate(['/buscador/title', this.busqueda]);
  }

  verdetalle(visita: VisitasResultadoModel){
    this.router.navigate(['/visita', visita.visit_lang_title , visita.visit_uuid]);
  }




  

  
  

}
