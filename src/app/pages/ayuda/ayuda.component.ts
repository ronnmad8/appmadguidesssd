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
import { AyudaService } from '../../services/ayuda.service';


import { Meta, Title } from '@angular/platform-browser';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { ZonacontactoComponent } from 'src/app/componentes/zonacontacto/zonacontacto.component';
import { ProviderService } from 'src/app/services/provider.service';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { TextDataModel } from 'src/app/models/TextData.model';
import { GlobalService } from 'src/app/services/global.service';



@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html'

})


export class AyudaComponent implements OnInit {

  @ViewChild(ZonacontactoComponent) zc: ZonacontactoComponent;
  
  
  bannerimage: string = '';
  
  textconts: TextContentsModel = new TextContentsModel();
  listatextcontsdata: TextDataModel[] = [];

  constructor(
      private acro : ActivatedRoute,
      private router: Router,
        
      private alertasService: AlertasService,
      private homeService: HomeService,
      private ayudaService: AyudaService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private meta: Meta,
      private title: Title,
      private providerService: ProviderService,
      private globalService: GlobalService,

  )
  {
    this.title.setTitle( "▷ Ayuda");
    this.meta.updateTag({ name: 'description', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'author', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'keywords', content: 'Madguides visitas guiadas en Madrid' });

    
  }
  

  ngOnInit() {
    this.providerService.setThrowHiddModales(true);
    this.providerService.setThrowFooterpol(true);


    this.bannerimage = "assets/images/banner-ficha-de-producto.jpg"; 
    this.getTexts();
    
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


 

  
}

    

