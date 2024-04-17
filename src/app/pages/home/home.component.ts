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
 
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { HomeService } from '../../services/home.service';
import { ProviderService } from '../../services/provider.service';

import { Meta, Title } from '@angular/platform-browser';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { BannerhomeComponent } from 'src/app/componentes/bannerhome/bannerhome.component';
import { SlidervisitasComponent } from 'src/app/componentes/slidervisitas/slidervisitas.component';
import { SlidertestimoniosComponent } from 'src/app/componentes/slidertestimonios/slidertestimonios.component';
import { ZonacontactoComponent } from 'src/app/componentes/zonacontacto/zonacontacto.component';
import { ComentariosModel } from 'src/app/models/Cometarios.model';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { HttpClient } from '@angular/common/http';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { GlobalService } from 'src/app/services/global.service';
import { TextDataModel } from 'src/app/models/TextData.model';
import { VisitaService } from 'src/app/services/visita.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'

})


export class HomeComponent implements OnInit {

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

  textconts: TextContentsModel = new TextContentsModel();
  listatextcontsdata: TextDataModel[] = [];
  visitasrecomendadas: VisitasResultadoModel[] = [];

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
      private globalService: GlobalService,
      private visitaService: VisitaService,
      private http: HttpClient
  )
  {
    this.title.setTitle( "▷ Madguides");
    this.meta.updateTag({ name: 'description', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'author', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'keywords', content: 'madguides visitas guiadas en Madrid' });

    this.wowService.init();

  }
  

  ngOnInit() {
    this.providerService.setThrowHiddModales(true);
    this.providerService.setThrowFooterpol(true);

    this.getTexts();
    this.getRecommended();
    this.getComments();
  
  }


  getTexts(){
    this.listatextcontsdata = this.globalService.listaTextDataModel
    this.textconts = this.globalService.textcontents;
    if(!this.textconts.dataok){
      this.globalService.getTextcontentsglobal().subscribe((resp)=>{
        if(resp){
          this.listatextcontsdata = resp as TextDataModel[] ?? [] ;
          this.textconts = this.globalService.setTextContentsByLanguage(this.listatextcontsdata , this.globalService.idlang  );
          console.log("TEXTCONTENTS*** ", this.textconts)
        }
      })
    }
  }


  getRecommended(){
    this.visitaService.getVisitasRecomendadas( this.globalService.idlang ).subscribe((resp)=>{
      if(resp){
        this.visitasrecomendadas = resp as VisitasResultadoModel[] ?? [] ;
        this.visitasrecomendadas = this.globalService.getImageDefault(this.visitasrecomendadas);
        console.log("VISITASRECOMENDAS*** ", this.visitasrecomendadas);
      }
    })
  }


  getComments(){
    this.globalService.getTextcomments().subscribe( (resp) => {
      this.comments =  resp as ComentariosModel[];
      this.comments.forEach(element => {
        if(element.visit) { 
          element.visit_name = element.visit[0].name ;
        } ;
      });
      console.log("COMMENTS*** ", this.comments);
    } );
  }



  
}

    

