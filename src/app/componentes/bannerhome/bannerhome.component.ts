import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { GlobalService } from '../../services/global.service';
import { HomeService } from '../../services/home.service';
import { ProviderService } from '../../services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { TextContentsModel } from 'src/app/models/TextContents.model';



@Component({
  selector: 'app-bannerhome',
  templateUrl: './bannerhome.component.html'
})
export class BannerhomeComponent implements OnInit, AfterViewInit {

  @Input() mostrarmodalbuscador: boolean = true;
  @Input() textconts: TextContentsModel = new TextContentsModel();

  @ViewChild('cjbusqueda') cjbusqueda: ElementRef;
  
  loading: boolean = false;
  visitasprop: VisitasResultadoModel[] = [];
  busqueda: string = "";
  timeout: any;

  constructor(
    private acro : ActivatedRoute,
    private router: Router,
      
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
      this.loading = true;
      this.homeService.getCajaBuscaHome(this.busqueda).subscribe(resp => {  
        this.visitasprop = resp as VisitasResultadoModel[];
        this.visitasprop = this.globalService.getImageDefault(this.visitasprop);
        this.loading = false;
      }) ;
    }, 400); 
  }
  
  verbuscador(){
    this.router.navigate(['/buscador/title', this.busqueda]);
  }

  verdetalle(visita: VisitasResultadoModel){
    let titleleg = visita.titulo.replace(' ', '-')  ;
    this.router.navigate(['/visita', titleleg , visita.uuid]);
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
