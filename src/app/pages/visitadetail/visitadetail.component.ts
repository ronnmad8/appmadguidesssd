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
import { VisitasModel } from 'src/app/models/Visitas.model';

import { SlidervisitasinteresarComponent } from 'src/app/componentes/slidervisitasinteresar/slidervisitasinteresar.component';
import { ZonapagoComponent } from 'src/app/componentes/zonapago/zonapago.component';
import { ZonacontactoComponent } from 'src/app/componentes/zonacontacto/zonacontacto.component';
import { SlidervisitaComponent } from 'src/app/componentes/slidervisita/slidervisita.component';
import { VisitaService } from 'src/app/services/visita.service';
import { ProviderService } from 'src/app/services/provider.service';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { VisitaAssetsModel } from 'src/app/models/VisitaAssets.model';
import { HttpClient } from '@angular/common/http';
import { TimesModel } from 'src/app/models/Times.model';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { TextDataModel } from 'src/app/models/TextData.model';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-visitadetail',
  templateUrl: './visitadetail.component.html'

})


export class VisitadetailComponent implements OnInit{

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();


  imagenesproducto :ImagenesModel[] = [];
  visitauuid: string = "";
  visitaSel: VisitasResultadoModel = new VisitasResultadoModel();
  messages: VisitaAssetsModel = new VisitaAssetsModel();
  bannerbottom: ImagenesModel = new ImagenesModel(); //bannertop
  related: VisitasResultadoModel[] = [];

  textconts: TextContentsModel = new TextContentsModel();
  listatextcontsdata: TextDataModel[] = [];

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
      private http: HttpClient,
      private globalService: GlobalService,
  )
  {
    ///

  }
  

  ngOnInit() {
    this.providerService.setThrowHiddModales(true);
    this.providerService.setThrowFooterpol(true);
    
    this.getTexts();
    
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
          
          this.getRelatedTitle(tituloparam);
        }
      }
    );

  }


  setMetas(){
    this.title.setTitle( "▷ Visita");
    this.meta.updateTag({ name: 'description', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'author', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'keywords', content: 'Madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ property :"og:url", content:  ("https://madguidesmadrid.com/"+ this.router.url)  });
    this.meta.updateTag({ property :"og:type", content: "website"  });
    this.meta.updateTag({ property :"og:title", content:  this.visitaSel.titulo  });
    this.meta.updateTag({ property :"og:description", content:  this.visitaSel.titulo  });
    this.meta.updateTag({ property :"og:image", content:  this.visitaSel.images[0].url  });
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

  getVisita(uuid: string){
    if(uuid != "" && uuid != null){
      // this.visitaService.getVisita(uuid).subscribe((resp)=>{
        
      //   let resul = resp as VisitasResultadoModel;
                
      //   ///get first de lista de api
      //   this.visitaSel = resul ?? new VisitasResultadoModel();
        
      //   console.log("xx ",this.visitaSel)
      //   this.providerService.setThrowVisita(this.visitaSel);
      //   this.setMetas();
        
      // })
    }
    else{
      console.error("uuid no valido ", uuid);
    }
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
        if( visita.duracionmin == null){
          visita.duracionmin = 0;
          visita.preciohoramin = 0;

        }

     });

      },
      (error) => {
        console.error('Error al cargar el archivo JSON:', error);
      }
    );


  }

  getRelatedTitle(tit: string){
    // this.visitaService.getCategoryTitle(tit).subscribe((d)=>{
    //   let visita = d as VisitasResultadoModel;
    //   let catuuid = visita.category_lang_uuid;
    //   this.visitaService.getRelacionadas(catuuid).subscribe( (resp) => {
    //   this.related = resp as VisitasResultadoModel[];
    //   });
    // })
  }

  
}

    

