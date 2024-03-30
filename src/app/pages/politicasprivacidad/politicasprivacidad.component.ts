import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, ViewChild } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd, Params  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { HomeService } from '../../services/home.service';
import { PoliticasService } from '../../services/politicas.service';


import { Meta, Title } from '@angular/platform-browser';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { ZonacontactoComponent } from 'src/app/componentes/zonacontacto/zonacontacto.component';
import { MessagesFormModel } from 'src/app/models/MessageseForm.model';
import { MessagesImageModel } from 'src/app/models/MessagesImage.model';
import { TextopoliticasModel } from 'src/app/models/Textopoliticas.model';
import { ProviderService } from 'src/app/services/provider.service';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { TextDataModel } from 'src/app/models/TextData.model';
import { GlobalService } from 'src/app/services/global.service';



@Component({
  selector: 'app-politicasprivacidad',
  templateUrl: './politicasprivacidad.component.html'

})


export class PoliticasprivacidadComponent implements OnInit {

  
  
  banner :ImagenesModel = new ImagenesModel();
  bannerbottom :ImagenesModel = new ImagenesModel();
  messagePoliticas: TextopoliticasModel= new TextopoliticasModel();

  textconts: TextContentsModel = new TextContentsModel();
  listatextcontsdata: TextDataModel[] = [];
  

  constructor(
      private acro : ActivatedRoute,
      private router: Router,
      private alertasService: AlertasService,
      private homeService: HomeService,
      private politicasService: PoliticasService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private meta: Meta,
      private title: Title,
      private providerService: ProviderService,
      private globalService: GlobalService,
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

    this.getImagenes();
    this.getTexts();

  }


  getTexts(){
    this.listatextcontsdata = this.globalService.listaTextDataModel
    this.textconts = this.globalService.textcontents;
    this.messagePoliticas.title = this.textconts.politicasprivacidad_title;
    this.messagePoliticas.textohtml = this.textconts.politicasprivacidad_text;
    if(!this.textconts.dataok){
      this.globalService.getTextcontentsglobal().subscribe((resp)=>{
        if(resp && resp["data"]){
          this.listatextcontsdata = resp["data"] as TextDataModel[] ?? [] ;
          this.textconts = this.globalService.setTextContentsByLanguage(this.listatextcontsdata , this.globalService.idlang  );
          this.messagePoliticas.title = this.textconts.politicasprivacidad_title;
          this.messagePoliticas.textohtml = this.textconts.politicasprivacidad_text;
        }
      })
    }
  }

  getImagenes(){
    this.politicasService.getImages().subscribe( (resp) => {
      let imagenes =  resp as ImagenesModel[];
      this.banner = imagenes.find(x => x.name == 'banner-ficha-de-producto') ?? new ImagenesModel();
      this.bannerbottom = imagenes.find(x => x.name == 'bannerbottom') ?? new ImagenesModel();

    } );
  }


  
}

    

