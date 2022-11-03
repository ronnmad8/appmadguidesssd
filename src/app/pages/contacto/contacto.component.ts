import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';

import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { HomeService } from '../../services/home.service';

import { Meta, Title } from '@angular/platform-browser';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { ZonacontactoComponent } from 'src/app/componentes/zonacontacto/zonacontacto.component';
import { MessagesFormModel } from 'src/app/models/MessageseForm.model';
import { MessagesImageModel } from 'src/app/models/MessagesImage.model';
import { ProviderService } from 'src/app/services/provider.service';




@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html'

})


export class ContactoComponent implements OnInit {

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
  @ViewChild(ZonacontactoComponent) zc: ZonacontactoComponent;
  
  
  bannerbottom :ImagenesModel = new ImagenesModel();
  imagenempresa :ImagenesModel = new ImagenesModel();
  messageForm: MessagesFormModel = new MessagesFormModel();
  messageImage: MessagesImageModel = new MessagesImageModel();
  

  constructor(
      private acro : ActivatedRoute,
      private router: Router,
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
    
    this.getMessagesForm();
    this.getMessagesImage();
    this.getImagenes();
      
  }


  getImagenes(){
    this.homeService.getImagenesHome().subscribe( (resp) => {
      let imagenes =  resp as ImagenesModel[];
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
    } );
  }




  

  
  


 
   
  


  
}

    

