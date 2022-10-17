import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';

import { UsuarioModel } from 'src/app/models/Usuario.model';
import { ClientesModel } from 'src/app/models/Clientes.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { HomeService } from '../../services/home.service';

import { Meta, Title } from '@angular/platform-browser';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { BannerhomeComponent } from 'src/app/componentes/bannerhome/bannerhome.component';
import { SlidervisitasComponent } from 'src/app/componentes/slidervisitas/slidervisitas.component';
import { SlidertestimoniosComponent } from 'src/app/componentes/slidertestimonios/slidertestimonios.component';
import { ZonacontactoComponent } from 'src/app/componentes/zonacontacto/zonacontacto.component';
import { RecomendadasModel } from 'src/app/models/Recomendadas.model';
import { ComentariosModel } from 'src/app/models/Cometarios.model';
import { MessagesModel } from 'src/app/models/Messages.model';
import { MessagesFormModel } from 'src/app/models/MessageseForm.model';
import { MessagesImageModel } from 'src/app/models/MessagesImage.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'

})


export class HomeComponent implements OnInit{

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
  @ViewChild(BannerhomeComponent) bh: BannerhomeComponent;
  @ViewChild(SlidervisitasComponent ) sv: SlidervisitasComponent;
  @ViewChild(SlidertestimoniosComponent) st: SlidertestimoniosComponent;
  @ViewChild(ZonacontactoComponent) zc: ZonacontactoComponent;
  
  imagenbanner: ImagenesModel;
  cliente: ClientesModel = new ClientesModel();
  
  mostrarmodalbuscador: boolean = true;
  imageneshome :ImagenesModel[] = [];
  recommended: RecomendadasModel[] = [];
  comments: ComentariosModel[] = [];
  message: MessagesModel ;
  messagesForm: MessagesFormModel = new MessagesFormModel();
  messageImage: MessagesImageModel = new MessagesImageModel();

  //imagenes
  bannerproducto: ImagenesModel = new ImagenesModel(); //banner-ficha-de-producto
  bannerbottom: ImagenesModel = new ImagenesModel(); //bannerbottom
  bannertop: ImagenesModel = new ImagenesModel(); //bannertop
  logovertical: ImagenesModel = new ImagenesModel(); //logo-madguides-vertical
  logotexto: ImagenesModel = new ImagenesModel(); //logo-texto
  logo: ImagenesModel = new ImagenesModel(); //logo



  constructor(
      private router: Router,
      private alertasService: AlertasService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private activatedRoute: ActivatedRoute,
      private meta: Meta,
      private title: Title,
      private homeService: HomeService,

  )
  {
    this.title.setTitle( "▷ Madguides");
    this.meta.updateTag({ name: 'description', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'author', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'keywords', content: '▷ Madguides ✅ visitas guiadas en Madrid' });

    this.wowService.init();

  }
  

  ngOnInit() {
    this.menuPublic.emit(0);
    this.getRecommended();
    this.getImageneshome();
    this.getMessages();
    this.getMessagesForm();
    this.getMessagesImage();
    this.getComments();
    
  }

  scrollToElement(element: Element): void {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  getImageneshome(){
    this.homeService.getImagenesHome().subscribe( (resp) => {
      this.imageneshome =  resp as ImagenesModel[];
      
      this.bannertop = this.imageneshome.find(x => x.name == 'bannertop') ?? new ImagenesModel();
      this.bannerbottom = this.imageneshome.find(x => x.name == 'bannerbottom') ?? new ImagenesModel();
      this.logo = this.imageneshome.find(x => x.name == 'logo') ?? new ImagenesModel();
      //this.logotexto = this.imageneshome.find(x => x.name == 'logo-texto') ?? new ImagenesModel();

    } );
  }

  getMessages(){
    this.homeService.getMessagesHome().subscribe( (resp) => {
      let respuesta: any =  resp ;
      this.message = respuesta[0] ?? new MessagesModel();
    } );
  }

  getMessagesForm(){
    this.homeService.getMessagesForm().subscribe( (resp) => {
      this.messagesForm =  resp  as MessagesFormModel;

    } );
  }

  getMessagesImage(){
    this.homeService.getMessagesImage().subscribe( (resp) => {
      this.messageImage =  resp  as MessagesImageModel;

    } );
  }

  getRecommended(){
    this.homeService.getRecomendadasHome().subscribe( (resp) => {
      this.recommended = resp as RecomendadasModel[];
      console.log(this.recommended);
    });
  }

  getComments(){
    this.homeService.getCommentsHome().subscribe( (resp) => {
      this.comments =  resp as ComentariosModel[];

    } );
  }

  





  
}

    

