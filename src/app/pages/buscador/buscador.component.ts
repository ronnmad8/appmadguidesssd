
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
import { ImagenesService } from '../../services/imagenes.service';
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

  constructor(
      private acro : ActivatedRoute,
      private router: Router,
      private imagenesService: ImagenesService,
      private alertasService: AlertasService,
      private buscadorService: BuscadorService,
      private homeService: HomeService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private activatedRoute: ActivatedRoute,
      private meta: Meta,
      private title: Title,
      private providerService: ProviderService,

  )
  {
    // this.title.setTitle( "▷ Madguides");
    // this.meta.updateTag({ name: 'description', content: 'madguides visitas guiadas en Madrid' });
    // this.meta.updateTag({ name: 'author', content: 'madguides visitas guiadas en Madrid' });
    // this.meta.updateTag({ name: 'keywords', content: '▷ Madguides ✅ visitas guiadas en Madrid' });
    
    
  }
  

  ngOnInit() {
    this.providerService.setThrowHiddModales(true);

    this.getMessagesSearch();
    this.getMessagesForm();
    this.getMessagesImage();
    this.getMessages();
    this.getImagenesBuscador();
   
    this.menuPublic.emit(0);
    
    
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
      this.buscadorService.getResultadoBuscador(this.filters, this.page).subscribe( (resp) => {
        
        this.resultadoBuscador =  resp as ResultadoModel;
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

  getMessagesSearch(){
    this.buscadorService.getMessagesSearch().subscribe( (resp) => {
      let respuesta: TextosearchModel =  resp as TextosearchModel; ;
      this.messageSearch = respuesta;
      
    } );
  }

  getMessagesForm(){
    this.homeService.getMessagesForm().subscribe( (resp) => {
      let respuesta: MessagesFormModel =  resp as MessagesFormModel; 
      this.messageForm = respuesta;
    } );
  }

  getMessagesImage(){
    this.homeService.getMessagesImage().subscribe( (resp) => {
      this.messageImage =  resp  as MessagesImageModel;

    } );
  }

  getMessages(){
    this.homeService.getMessagesHome().subscribe( (resp) => {
      let respuesta: MessagesModel =  resp as MessagesModel; ;
      this.message = respuesta;
      
    } );
  }




  

  
  


 
   
  


  
}

    

