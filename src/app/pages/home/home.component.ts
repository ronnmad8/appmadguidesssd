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
  imageneshome :ImagenesModel[] = [];
  textoshome :TextosModel[] = [];
  idenlace: number ;
  enlacedestacado: string = "";
  texto1: string = "";
  texto2: string = "";

  textosall: TextosModel[] = [];
  tiposeccion: number = 2;
  tipotextoseccion: number = 1;
  mostrarmodalbuscador: boolean = true;
  
  
  //imagenes
  bannerbottom: ImagenesModel = new ImagenesModel();
  bannertop: ImagenesModel = new ImagenesModel();
  logotexto: ImagenesModel = new ImagenesModel();
  logo: ImagenesModel = new ImagenesModel();



  constructor(
      private router: Router,
      private imagenesService: ImagenesService,
      private textosService: TextosService,
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
    //ids para home
    this.idenlace = 1;
  }
  

  ngOnInit() {
    this.menuPublic.emit(0);
    this.getImageneshome()
  
  }

  scrollToElement(element: Element): void {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  getImageneshome(){
    this.homeService.getImagenesHome().subscribe( (resp) => {
      this.imageneshome =  resp as ImagenesModel[];
      
      this.bannertop = this.imageneshome.find(x => x.image_name == 'bannertop') ?? new ImagenesModel();
      this.bannerbottom = this.imageneshome.find(x => x.image_name == 'bannerbottom') ?? new ImagenesModel();
      this.logotexto = this.imageneshome.find(x => x.image_name == 'logo-texto') ?? new ImagenesModel();
      this.logo = this.imageneshome.find(x => x.image_name == 'logo') ?? new ImagenesModel();
debugger
      this.bh.getImagenBanner(this.bannertop);
      this.zc.getImagenBanner(this.bannerbottom);
      this.st.getImagenLogo(this.logo);

    } );
  }

  getTextoshome(){
    this.homeService.getTextosHome().subscribe( (resp) => {
      this.textoshome =  resp as TextosModel[];
      
    } );
  }



  


  

  
  


  
}

    

