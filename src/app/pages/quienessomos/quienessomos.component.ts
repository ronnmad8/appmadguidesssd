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
import { QuienessomosService } from '../../services/quienessomos.service';


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
import { VisitaAssetsModel } from 'src/app/models/VisitaAssets.model';
import { TextoquienessomosModel } from 'src/app/models/Textoquienessomos.model';
import { ProviderService } from 'src/app/services/provider.service';



@Component({
  selector: 'app-quienessomos',
  templateUrl: './quienessomos.component.html'

})


export class QuienessomosComponent implements OnInit {

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
  @ViewChild(ZonacontactoComponent) zc: ZonacontactoComponent;
  
  
  banner :ImagenesModel = new ImagenesModel();
  bannerbottom :ImagenesModel = new ImagenesModel();
  imagenempresa :ImagenesModel = new ImagenesModel();
  messageForm: MessagesFormModel = new MessagesFormModel();
  messageImage: MessagesImageModel = new MessagesImageModel();
  messageLaempresa: TextoquienessomosModel= new TextoquienessomosModel();
  

  constructor(
      private acro : ActivatedRoute,
      private router: Router,
        
      private alertasService: AlertasService,
      private buscadorService: BuscadorService,
      private homeService: HomeService,
      private quienessomosService: QuienessomosService,
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
    this.providerService.setThrowFooterpol(true);


    this.getMessagesForm();
    this.getMessagesImage();
    this.getMessagesLaempresa();
    this.getImagenes();

   
    this.menuPublic.emit(0);
    
    
  }


  getImagenes(){
    this.quienessomosService.getImages().subscribe( (resp) => {
      let imagenes =  resp as ImagenesModel[];
      this.banner = imagenes.find(x => x.name == 'banner-ficha-de-producto') ?? new ImagenesModel();
      this.bannerbottom = imagenes.find(x => x.name == 'bannerbottom') ?? new ImagenesModel();
      //this.imagenempresa = imagenes.find(x => x.name == 'imagenempresa') ?? new ImagenesModel();

      this.imagenempresa.url = "../../assets/images/imagenempresa.png";

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
      let respuesta: MessagesImageModel =  resp as MessagesImageModel; 
      this.messageImage = respuesta;
    } );
  }


  getMessagesLaempresa(){
    this.quienessomosService.getMessages().subscribe( (resp) => {
      let respuesta: TextoquienessomosModel =  resp as TextoquienessomosModel; 
      this.messageLaempresa = respuesta;
      
    } );
  }




  

  
  


 
   
  


  
}

    

