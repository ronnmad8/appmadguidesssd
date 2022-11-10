import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { GlobalService } from '../../services/global.service';
import { HomeService } from '../../services/home.service';
import { ProviderService } from '../../services/provider.service';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { MessagesModel } from 'src/app/models/Messages.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { ResultadoModel } from 'src/app/models/Resultado.model';
import { TextotourModel } from 'src/app/models/Textotour.model';
import { TextoiconsModel } from 'src/app/models/Textoicons.model';




@Component({
  selector: 'app-bannerhome',
  templateUrl: './bannerhome.component.html'
})
export class BannerhomeComponent implements OnInit, AfterViewInit {

  @Input() mostrarmodalbuscador: boolean = true;
  @Input() messagesTourData: TextotourModel = new TextotourModel();
  @Input() messagesIconsData: TextoiconsModel = new TextoiconsModel();
  @Input() bannertopData: ImagenesModel = new ImagenesModel();

  @ViewChild('cjbusqueda') cjbusqueda: ElementRef;
  

  visitasprop: VisitasResultadoModel[] = [];
  busqueda: string = "";
  timeout: any;

  constructor(
    private acro : ActivatedRoute,
    private router: Router,
    private imagenesService: ImagenesService,
    private globalService: GlobalService,
    private providerService: ProviderService,
    private homeService: HomeService

  ) {
  ///    
  }


  ngOnInit() {
      this.listenProvider(); 
  }

  ngAfterViewInit(){
    ///
  }


  buscarprop(){
    
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(()=> {
      this.homeService.getCajaBuscaHome(this.busqueda).subscribe(resp => {  
        let resultado = resp as ResultadoModel;
        this.visitasprop = resultado.data as VisitasResultadoModel[];
      }) ;
    }, 10);

  }
  
  verbuscador(){
    this.router.navigate(['/buscador/title', this.busqueda]);
  }

  verdetalle(visita: VisitasResultadoModel){
    let titleleg = visita.visit_lang_title.replace(' ', '-')  ;
    this.router.navigate(['/visita', titleleg , visita.visit_uuid]);
  }


  listenProvider(){
    this.providerService.getThrowFococaja.subscribe((resp)=>{
      var prov = resp as boolean;
      if(prov && this.cjbusqueda){
        
        setTimeout(()=>{ 
          this.cjbusqueda.nativeElement.focus(); 
        },600);  
      
      }
    });
  }


  

  
  

}
