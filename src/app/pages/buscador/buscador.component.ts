
/*
· app-bannerbuscado => mostrarmodalbuscador, messageSearch,  bannertop, 
· app-busqueda 
· app-zonacontacto => messageForm, messageImage, bannerbottom

*/


import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';

import { UsuarioModel } from 'src/app/models/Usuario.model';
import { ClientesModel } from 'src/app/models/Clientes.model';
 
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { BuscadorService } from '../../services/buscador.service';
import { HomeService } from '../../services/home.service';


import { Meta, Title } from '@angular/platform-browser';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { ZonacontactoComponent } from 'src/app/componentes/zonacontacto/zonacontacto.component';
import { BannerbuscadorComponent } from 'src/app/componentes/bannerbuscador/bannerbuscador.component';
import { BusquedaComponent } from 'src/app/componentes/busqueda/busqueda.component';
import { ResultadoModel } from 'src/app/models/Resultado.model';
import { HomerespModel } from 'src/app/models/Homeresp.model';
import { DuracionesModel } from 'src/app/models/Duraciones.model';
import { FiltersModel } from 'src/app/models/Filters.model';
import { ProviderService } from 'src/app/services/provider.service';
import { dateTime } from 'date-fns/locale/af';
import { getTime } from 'date-fns';
import { TimesModel } from 'src/app/models/Times.model';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { TextDataModel } from 'src/app/models/TextData.model';
import { GlobalService } from 'src/app/services/global.service';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';



@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html'

})


export class BuscadorComponent implements OnInit, AfterViewInit {

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
  @ViewChild(BannerbuscadorComponent) bb: BannerbuscadorComponent;
  @ViewChild(BusquedaComponent ) bu: BusquedaComponent;
  @ViewChild(ZonacontactoComponent) zc: ZonacontactoComponent;
  
  bannerfichadeproducto :ImagenesModel = new ImagenesModel();
  bannerbottom :ImagenesModel = new ImagenesModel();
  bannertop :ImagenesModel = new ImagenesModel();
  resultadoBuscador :VisitasResultadoModel[] = [];
  texts: string[] = [];

  filters: FiltersModel = new FiltersModel();
  filtersrutacategorias: string= "";
  filtersrutatitle: string= "";
  page: number = 1;
  numactividades: number = 0;
  maxvalueprecio: number = 0;

  textconts: TextContentsModel = new TextContentsModel();
  listatextcontsdata: TextDataModel[] = [];

  constructor(
      private acro : ActivatedRoute,
      private router: Router,
        
      private alertasService: AlertasService,
      private buscadorService: BuscadorService,
      private homeService: HomeService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private activatedRoute: ActivatedRoute,
      private meta: Meta,
      private title: Title,
      private providerService: ProviderService,
      private globalService: GlobalService,
  )
  {
    this.title.setTitle( "▷ Buscador");
    this.meta.updateTag({ name: 'description', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'author', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'keywords', content: 'Madguides visitas guiadas en Madrid' });
    
    
  }
  

  ngOnInit() {
    this.providerService.setThrowHiddModales(true);
    this.providerService.setThrowFooterpol(true);

    this.menuPublic.emit(0);

    this.getTexts();
  }


  ngAfterViewInit() {
    //parametro uuid 
    this.acro.params.subscribe(
      (params: Params) => {
        ///categoria filtro ruta
        let catid = params.categoryid;
        if(catid != null){
          this.filtersrutacategorias = catid
        }
        ///recomendados filtro ruta
        let recommended = params.recommended;
        if(recommended){
          //this.filters.recommended = true;
        }
        ///title filtro ruta
        let title = params.title;
        if(title != null){
          this.filtersrutatitle = title;
        }
        this.getVisitasBuscador();
      }
      );
  }


  getTexts(){
    this.listatextcontsdata = this.globalService.listaTextDataModel
    this.textconts = this.globalService.textcontents;
    if(!this.textconts.dataok){
      this.globalService.getTextcontentsglobal().subscribe((resp)=>{
        if(resp){
          this.listatextcontsdata = resp as TextDataModel[] ?? [] ;
          this.textconts = this.globalService.setTextContentsByLanguage(this.listatextcontsdata , this.globalService.idlang  );
        }
      })
    }
  }




  getVisitasBuscador(){
    
    ///filters
    if(this.bu != null){
    
      this.filters = this.bu.filters;
      this.page = this.bu.page;
      
      if(this.filtersrutatitle != ""){
        this.filters.title = this.filtersrutatitle;
      }
      if(this.filtersrutacategorias != ""){
        //this.filters.categorias.push(this.filtersrutacategorias);
      }
      //console.log("start=> ",getTime.toString())
      this.bu.loading = true;
      this.buscadorService.getResultadoBuscador(this.filters, this.page).subscribe( (resp) => {
        //console.log("end=> ",getTime.toString())
        this.resultadoBuscador =  resp as VisitasResultadoModel[] ?? [];
        this.resultadoBuscador = this.globalService.getImageDefault(this.resultadoBuscador);
        this.resultadoBuscador = this.globalService.getLanguages(this.resultadoBuscador);

        this.bu.getVisitasBuscador(this.resultadoBuscador);
        this.numactividades = this.resultadoBuscador.length ;
        setTimeout(() => {
          this.bu.loading = false;
        }, 800);
      });
      setTimeout(() => {
        this.bu.loading = false;
      }, 10000);
    }
  }




  // generarAleatorioPrice(visita: any): number {
  //   return visita.visit_time == null || visita.visit_time[0]?.price == null
  //     ? Math.floor(Math.random() * (40 - 10 + 1)) + 10
  //     : visita.visit_time[0].price;
  // }


  // generarAleatorioDuration(visita: any): number {
  //   return visita.visit_time == null || visita.visit_time[0]?.duration == null
  //     ? Math.floor(Math.random() * (40 - 10 + 1)) + 10
  //     : visita.visit_time[0].duration;
  // }

  

  
  


 
   
  


  
}

    

