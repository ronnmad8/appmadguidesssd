/*
· app-bannerhome => bannertop, mostrarmodalbuscador, messageBannerhome
· app-slidervisitas => messageRecommended, recommended
· app-slidertestimonios => messageOpinions,  logo, comments
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
import { HomeService } from '../../services/home.service';
import { ProviderService } from '../../services/provider.service';

import { Meta, Title } from '@angular/platform-browser';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { BannerhomeComponent } from 'src/app/componentes/bannerhome/bannerhome.component';
import { SlidervisitasComponent } from 'src/app/componentes/slidervisitas/slidervisitas.component';
import { SlidertestimoniosComponent } from 'src/app/componentes/slidertestimonios/slidertestimonios.component';
import { ZonacontactoComponent } from 'src/app/componentes/zonacontacto/zonacontacto.component';
import { ComentariosModel } from 'src/app/models/Cometarios.model';
import { MessagesModel } from 'src/app/models/Messages.model';
import { MessagesFormModel } from 'src/app/models/MessageseForm.model';
import { MessagesImageModel } from 'src/app/models/MessagesImage.model';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { TextotourModel } from 'src/app/models/Textotour.model';
import { TextoiconsModel } from 'src/app/models/Textoicons.model';
import { TextoopinionsModel } from 'src/app/models/Textoopinions.model';
import { TextorecomendadasModel } from 'src/app/models/Textorecomendadas.model';


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
  @ViewChild("contct") contct: ElementRef;
  
  imagenbanner: ImagenesModel;
  cliente: ClientesModel = new ClientesModel();
  
  mostrarmodalbuscador: boolean = true;
  imageneshome :ImagenesModel[] = [];
  recommended: VisitasResultadoModel[] = [];
  comments: ComentariosModel[] = [];
  //message: MessagesModel ;
  messagesForm: MessagesFormModel = new MessagesFormModel(); //texto del formulario
  messagesTour: TextotourModel = new TextotourModel(); //texto del banner
  messagesIcons: TextoiconsModel = new TextoiconsModel(); //texto de iconos banner
  messagesOpinions: TextoopinionsModel = new TextoopinionsModel(); //texto de iconos banner
  messagesRecomendadas: TextorecomendadasModel = new TextorecomendadasModel(); //texto de iconos banner
  messageImage: MessagesImageModel = new MessagesImageModel(); //texto banner formulario

  //imagenes
  bannerproducto: ImagenesModel = new ImagenesModel(); //banner-ficha-de-producto
  bannerbottom: ImagenesModel = new ImagenesModel(); //bannerbottom
  bannertop: ImagenesModel = new ImagenesModel(); //bannertop
  logovertical: ImagenesModel = new ImagenesModel(); //logo-madguides-vertical
  logotexto: ImagenesModel = new ImagenesModel(); //logo-texto
  logo: ImagenesModel = new ImagenesModel(); //logo



  constructor(
      private acro: ActivatedRoute,
      private router: Router,
      private alertasService: AlertasService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private meta: Meta,
      private title: Title,
      private homeService: HomeService,
      private providerService: ProviderService,

  )
  {
    this.title.setTitle( "▷ Madguides");
    this.meta.updateTag({ name: 'description', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'author', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'keywords', content: '▷ Madguides ✅ visitas guiadas en Madrid' });

    this.wowService.init();

  }
  

  ngOnInit() {
    this.providerService.setThrowHiddModales(true);
    
    this.getRecommended();
    this.getComments();
    this.getImageneshome();
    this.getMessagesImage();
    
    this.getMessagesOpinions();
    this.getMessagesRecomendadas();
    this.getMessagesForm();
    this.getMessagesTour();
    this.getMessagesIcons();
    
  }


  getImageneshome(){
    this.homeService.getImagenesHome().subscribe( (resp) => {
      this.imageneshome =  resp as ImagenesModel[];
      
      this.bannertop = this.imageneshome.find(x => x.name == 'bannertop') ?? new ImagenesModel();
      this.bannerbottom = this.imageneshome.find(x => x.name == 'bannerbottom') ?? new ImagenesModel();
      this.logo = this.imageneshome.find(x => x.name == 'logo') ?? new ImagenesModel();


    } );
  }

  
  getMessagesTour(){
    this.homeService.getMessagesTour().subscribe( (resp) => {
      this.messagesTour = resp as TextotourModel;
    } );
  }

  
  getMessagesIcons(){
    this.homeService.getMessagesIcons().subscribe( (resp) => {
      this.messagesIcons = resp as TextoiconsModel;
    } );
  }


  getMessagesOpinions(){
    this.homeService.getMessagesOpinions().subscribe( (resp) => {
      this.messagesOpinions = resp as TextoopinionsModel;
    } );
  }


  getMessagesRecomendadas(){
    this.homeService.getMessagesRecomendadas().subscribe( (resp) => {
      this.messagesRecomendadas = resp as TextorecomendadasModel;
      console.log(this.messagesRecomendadas);
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
      this.recommended = resp as VisitasResultadoModel[];
    });
  }


  getComments(){
    this.homeService.getCommentsHome().subscribe( (resp) => {
      this.comments =  resp as ComentariosModel[];

    } );
  }

  





  
}

    

