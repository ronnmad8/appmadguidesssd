import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';

import { UsuarioModel } from 'src/app/models/Usuario.model';
import { ClientesModel } from 'src/app/models/Clientes.model';
 
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { HomeService } from '../../services/home.service';

import { Meta, Title } from '@angular/platform-browser';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { VisitasModel } from 'src/app/models/Visitas.model';

import { SlidervisitasinteresarComponent } from 'src/app/componentes/slidervisitasinteresar/slidervisitasinteresar.component';
import { ZonapagoComponent } from 'src/app/componentes/zonapago/zonapago.component';
import { ZonacontactoComponent } from 'src/app/componentes/zonacontacto/zonacontacto.component';
import { SlidervisitaComponent } from 'src/app/componentes/slidervisita/slidervisita.component';
import { VisitaService } from 'src/app/services/visita.service';
import { ProviderService } from 'src/app/services/provider.service';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { MessagesModel } from 'src/app/models/Messages.model';
import { VisitaAssetsModel } from 'src/app/models/VisitaAssets.model';
import { MessagesFormModel } from 'src/app/models/MessageseForm.model';
import { MessagesImageModel } from 'src/app/models/MessagesImage.model';
import { HttpClient } from '@angular/common/http';
import { TimesModel } from 'src/app/models/Times.model';


@Component({
  selector: 'app-visitadetail',
  templateUrl: './visitadetail.component.html'

})


export class VisitadetailComponent implements OnInit{

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();


  imagenesproducto :ImagenesModel[] = [];
  visitauuid: string = "";
  visitaSel: VisitasResultadoModel = new VisitasResultadoModel();
  textosproducto :TextosModel = new TextosModel();
  messages: VisitaAssetsModel = new VisitaAssetsModel();
  messagesForm: MessagesFormModel = new MessagesFormModel();
  messageImage: MessagesImageModel = new MessagesImageModel();
  messagesRelated: MessagesModel = new MessagesModel();
  bannerbottom: ImagenesModel = new ImagenesModel(); //bannertop
  related: VisitasResultadoModel[] = [];

  constructor(
      private acro : ActivatedRoute,
      private router: Router,
        
      private alertasService: AlertasService,
      private visitaService: VisitaService,
      private providerService: ProviderService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private homeService: HomeService,
      private activatedRoute: ActivatedRoute,
      private meta: Meta,
      private title: Title,
      private http: HttpClient

  )
  {
    ///

  }
  

  ngOnInit() {
    
    this.providerService.setThrowHiddModales(true);
    this.providerService.setThrowFooterpol(true);

    
    //parametro uuid 
    this.acro.params.subscribe(
      (params: Params) => {
      
        this.visitauuid = params.uuid;
        let tituloparam = params.title;
        
        if(this.visitauuid != null){
  
          this.getVisita(this.visitauuid );
          this.getRelatedUuid(this.visitauuid);
        }
        else if(tituloparam != null){
          
          this.getVisitaTitle(tituloparam );
          this.getRelatedTitle(tituloparam);
        }
        
        this.getMessages();
        this.getMessagesForm();
        this.getMessagesImage();
        this.getMessagesHome();
        this.getImagenesForm();
        
      }
    );

  }


  setMetas(){
    // this.title.setTitle( "▷ Madguides");
    // this.meta.updateTag({ name: 'description', content: 'madguides visitas guiadas en Madrid' });
    // this.meta.updateTag({ name: 'author', content: 'madguides visitas guiadas en Madrid' });
    // this.meta.updateTag({ name: 'keywords', content: '▷ Madguides ✅ visitas guiadas en Madrid' });
    this.meta.updateTag({ property :"og:url", content:  ("https://madguides.es/"+ this.router.url)  });
    this.meta.updateTag({ property :"og:type", content: "website"  });
    this.meta.updateTag({ property :"og:title", content:  this.visitaSel.visit_lang_title  });
    this.meta.updateTag({ property :"og:description", content:  this.visitaSel.visit_lang_description  });
    this.meta.updateTag({ property :"og:image", content:  this.visitaSel.visit_image_url  });
  }
  

  getVisita(uuid: string){
    if(uuid != "" && uuid != null){
      this.visitaService.getVisita(uuid).subscribe((resp)=>{
        
        let resul = resp as VisitasResultadoModel;
                
        ///get first de lista de api
        this.visitaSel = resul ?? new VisitasResultadoModel();
        
        console.log("xx ",this.visitaSel)
        this.providerService.setThrowVisita(this.visitaSel);
        this.setMetas();
        
      })
    }
    else{
      console.error("uuid no valido ", uuid);
    }
  }


  getVisitaTitle(title: string){
   
      this.visitaService.getVisitaTitle(title).subscribe((resp)=>{
        
        let resul = resp as VisitasResultadoModel[];
        this.visitaSel = resul[0] ?? new VisitasResultadoModel();
        this.providerService.setThrowVisita(this.visitaSel);

      })

  }


  getMessages(){
      this.visitaService.getMessagesVisita().subscribe((resp)=>{
        this.messages = resp as VisitaAssetsModel;
        this.providerService.setThrowMessagesVisita(this.messages);
      })
  }


  getImagenesContacto(){
    this.homeService.getImagenesHome().subscribe( (resp) => {
      let imagenesResp =  resp as ImagenesModel[];
      this.bannerbottom = imagenesResp.find(x => x.name == 'bannerbottom') ?? new ImagenesModel();
    } );
  }


  getMessagesHome(){
    this.homeService.getMessagesHome().subscribe( (resp) => {
      let respuesta: any =  resp ;
      this.messagesRelated = respuesta[0] ?? new MessagesModel();
      
    } );
  }



  getMessagesForm(){
    this.homeService.getMessagesForm().subscribe( (resp) => {
      this.messagesForm = resp as MessagesFormModel;
    } );
  }


  getMessagesImage(){
    this.homeService.getMessagesImage().subscribe( (resp) => {
      this.messageImage = resp as MessagesImageModel;
    } );
  }


  getRelatedUuid(uuid: string){
    
    //this.visitaService.getCategoryUuid(uuid).subscribe((d)=>{
      //let visita = d as VisitasResultadoModel;
      //let catuuid = visita.category_uuid;
      
      // this.visitaService.getRelacionadas(catuuid).subscribe( (resp) => {
      //   this.related = resp as VisitasResultadoModel[];
        
      // });

    //})


    const rutaArchivoJson = 'assets/docs/recommended.json';
    this.http.get(rutaArchivoJson).subscribe(
      (data: any) => {
      this.related = data as VisitasResultadoModel[];

      ///correct duration and price
      this.related.forEach(visita => {
        if( visita.visit_time == null){
          visita.visit_time = [];
          visita.visit_time.push(new TimesModel());
          visita.visit_time[0].price = 10
          visita.visit_time[0].duration = 1
        }

     });

      },
      (error) => {
        console.error('Error al cargar el archivo JSON:', error);
      }
    );


  }

  getRelatedTitle(tit: string){
    this.visitaService.getCategoryTitle(tit).subscribe((d)=>{
      let visita = d as VisitasResultadoModel;
      let catuuid = visita.category_lang_uuid;
      this.visitaService.getRelacionadas(catuuid).subscribe( (resp) => {
      this.related = resp as VisitasResultadoModel[];
      });
    })
  }


  getImagenesForm(){
    this.homeService.getImagenesHome().subscribe( (resp) => {
      let imagenes =  resp as ImagenesModel[];
      this.bannerbottom = imagenes.find(x => x.name == 'bannerbottom') ?? new ImagenesModel();
    } );
  }


  
  

  
}

    

