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
import { ZonacontactoComponent } from 'src/app/componentes/zonacontacto/zonacontacto.component';
import { BannerbuscadorComponent } from 'src/app/componentes/bannerbuscador/bannerbuscador.component';
import { BusquedaComponent } from 'src/app/componentes/busqueda/busqueda.component';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { ResultadoModel } from 'src/app/models/Resultado.model';
import { HomerespModel } from 'src/app/models/Homeresp.model';
import { DuracionesModel } from 'src/app/models/Duraciones.model';
import { FiltersModel } from 'src/app/models/Filters.model';
import { VisitaAssetsModel } from 'src/app/models/VisitaAssets.model';
import { ProviderService } from 'src/app/services/provider.service';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { TextDataModel } from 'src/app/models/TextData.model';
import { GlobalService } from 'src/app/services/global.service';



@Component({
  selector: 'app-quienessomos',
  templateUrl: './quienessomos.component.html'

})


export class QuienessomosComponent implements OnInit {

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
  @ViewChild(ZonacontactoComponent) zc: ZonacontactoComponent;
  
  
  bannerimage :string = "";
  bannerbottom :ImagenesModel = new ImagenesModel();
  
  textconts: TextContentsModel = new TextContentsModel();
  listatextcontsdata: TextDataModel[] = [];


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
      private globalService: GlobalService,
  )
  {
    this.title.setTitle( "▷ Quienes somos");
    this.meta.updateTag({ name: 'description', content: 'quienes somos madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'author', content: 'madguides' });
    this.meta.updateTag({ name: 'keywords', content: 'madguides' });

  }
  

  ngOnInit() {
    this.providerService.setThrowHiddModales(true);
    this.providerService.setThrowFooterpol(true);

    this.bannerimage = "assets/images/banner-ficha-de-producto.jpg"; 
    this.getTexts();
    this.menuPublic.emit(0);
        
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

    

