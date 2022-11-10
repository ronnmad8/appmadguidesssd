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
import { MessagesFormModel } from 'src/app/models/MessageseForm.model';
import { MessagesImageModel } from 'src/app/models/MessagesImage.model';
import { TextopoliticasModel } from 'src/app/models/Textopoliticas.model';
import { ProviderService } from 'src/app/services/provider.service';



@Component({
  selector: 'app-avisolegal',
  templateUrl: './avisolegal.component.html'

})


export class AvisolegalComponent implements OnInit {

  
  
  banner :ImagenesModel = new ImagenesModel();
  bannerbottom :ImagenesModel = new ImagenesModel();
  messageForm: MessagesFormModel = new MessagesFormModel();
  messageImage: MessagesImageModel = new MessagesImageModel();
  messagePoliticas: TextopoliticasModel= new TextopoliticasModel();
  

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

  )
  {
    // this.title.setTitle( "▷ Madguides");
    // this.meta.updateTag({ name: 'description', content: 'madguides visitas guiadas en Madrid' });
    // this.meta.updateTag({ name: 'author', content: 'madguides visitas guiadas en Madrid' });
    // this.meta.updateTag({ name: 'keywords', content: '▷ Madguides ✅ visitas guiadas en Madrid' });

    
  }
  

  ngOnInit() {
    this.providerService.setThrowHiddModales(true);

    this.getMessagesForm();
    this.getMessagesImage();
    this.getMessageavisolegal();
    this.getImagenes();
    
  }


  getImagenes(){
    this.politicasService.getImages().subscribe( (resp) => {
      let imagenes =  resp as ImagenesModel[];
      this.banner = imagenes.find(x => x.name == 'banner-ficha-de-producto') ?? new ImagenesModel();
      this.bannerbottom = imagenes.find(x => x.name == 'bannerbottom') ?? new ImagenesModel();

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
    });
  }


  getMessageavisolegal(){
    this.politicasService.getMessagesAvisolegal().subscribe( (resp) => {
      let respuesta: TextopoliticasModel =  resp as TextopoliticasModel; 
      this.messagePoliticas = respuesta;
    } );
  }




  

  
  


 
   
  


  
}

    

