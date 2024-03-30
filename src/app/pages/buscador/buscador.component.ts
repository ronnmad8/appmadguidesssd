
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
import { TextosModel } from 'src/app/models/Textos.model';
import { ZonacontactoComponent } from 'src/app/componentes/zonacontacto/zonacontacto.component';
import { BannerbuscadorComponent } from 'src/app/componentes/bannerbuscador/bannerbuscador.component';
import { BusquedaComponent } from 'src/app/componentes/busqueda/busqueda.component';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { MessagesModel } from 'src/app/models/Messages.model';
import { ResultadoModel } from 'src/app/models/Resultado.model';
import { HomerespModel } from 'src/app/models/Homeresp.model';
import { DuracionesModel } from 'src/app/models/Duraciones.model';
import { FiltersModel } from 'src/app/models/Filters.model';
import { MessagesFormModel } from 'src/app/models/MessageseForm.model';
import { MessagesImageModel } from 'src/app/models/MessagesImage.model';
import { TextosearchModel } from 'src/app/models/Textosearch.model';
import { ProviderService } from 'src/app/services/provider.service';
import { dateTime } from 'date-fns/locale/af';
import { getTime } from 'date-fns';
import { TimesModel } from 'src/app/models/Times.model';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { TextDataModel } from 'src/app/models/TextData.model';
import { GlobalService } from 'src/app/services/global.service';



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
  resultadoBuscador :ResultadoModel = new ResultadoModel();
  texts: string[] = [];
  messageSearch: TextosearchModel = new TextosearchModel();
  messageForm: MessagesFormModel = new MessagesFormModel();
  messageImage: MessagesImageModel = new MessagesImageModel();
  message: MessagesModel = new MessagesModel();
  filters: FiltersModel = new FiltersModel();
  filtersrutacategorias: string= "";
  filtersrutatitle: string= "";
  page: number = 1;
  numactividades: number = 0;

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

    // this.getMessagesSearch();
    // this.getMessagesForm();
    // this.getMessagesImage();

    this.getMessages();
    this.getImagenesBuscador();
   
    this.menuPublic.emit(0);

    this.getTexts();
  }


  ngAfterViewInit() {
    //parametro uuid 
    this.acro.params.subscribe(
      (params: Params) => {
        ///categoria filtro ruta
        let cat_uuid = params.category_uuid;
        if(cat_uuid != null){
          this.filtersrutacategorias = cat_uuid
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
        if(resp && resp["data"]){
          this.listatextcontsdata = resp["data"] as TextDataModel[] ?? [] ;
          this.textconts = this.globalService.setTextContentsByLanguage(this.listatextcontsdata , this.globalService.idlang  );
        }
      })
    }
  }


  getImagenesBuscador(){
    this.buscadorService.getImagenesbuscador().subscribe( (resp) => {
      let imagenes =  resp as ImagenesModel[];
      this.bannerbottom = imagenes.find(x => x.name == 'bannerbottom') ?? new ImagenesModel();
      this.bannerfichadeproducto = imagenes.find(x => x.name == 'banner-ficha-de-producto') ?? new ImagenesModel();

    } );
  }


  getVisitasBuscador(){
    
    ///filters
    if(this.bu != null){
    
      this.filters = this.bu.filters;
      this.page = this.bu.page;
      this.bu.loading = true;
      if(this.filtersrutatitle != ""){
        this.filters.title = this.filtersrutatitle;
      }
      if(this.filtersrutacategorias != ""){
        this.filters.categorias.push(this.filtersrutacategorias);
      }
      //console.log("start=> ",getTime.toString())
      this.buscadorService.getResultadoBuscador(this.filters, this.page).subscribe( (resp) => {
        //console.log("end=> ",getTime.toString())
        this.resultadoBuscador =  resp as ResultadoModel;

        ///correct duration and price
        this.resultadoBuscador.data.forEach(visita => {
          
           if( visita.visit_time == null){
             visita.visit_time = [];
             visita.visit_time.push(new TimesModel());
             visita.visit_time[0].price = Math.floor(Math.random() * (40 - 10 + 1)) + 10
             visita.visit_time[0].duration = Math.floor(Math.random() * (2 - 1 + 1)) + 1
           }

        });

        this.bu.getVisitasBuscador(this.resultadoBuscador);
        this.numactividades = this.resultadoBuscador.total;

        setTimeout(() => {
          this.bu.loading = false;
        }, 500);
      } );
      setTimeout(() => {
        this.bu.loading = false;
      }, 10000);
    }
  }


  getMessages(){
    this.homeService.getMessagesHome().subscribe( (resp) => {
      let respuesta: MessagesModel =  resp as MessagesModel; ;
      this.message = respuesta;
      
    } );
  }


  generarAleatorioPrice(visita: any): number {
    return visita.visit_time == null || visita.visit_time[0]?.price == null
      ? Math.floor(Math.random() * (40 - 10 + 1)) + 10
      : visita.visit_time[0].price;
  }
  generarAleatorioDuration(visita: any): number {
    return visita.visit_time == null || visita.visit_time[0]?.duration == null
      ? Math.floor(Math.random() * (40 - 10 + 1)) + 10
      : visita.visit_time[0].duration;
  }

  

  
  


 
   
  


  
}

    

