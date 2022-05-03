import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';

import { UsuarioModel } from 'src/app/models/Usuario.model';
import { ClientesModel } from 'src/app/models/Clientes.model';
import { ImagenesModel } from 'src/app/models/imagenes.model';
import { BlogarticulosModel } from 'src/app/models/blogarticulos.model';
import { TextosModel } from 'src/app/models/textos.model';
import { FiltrosModel } from 'src/app/models/Filtros.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';
import { AlertasService } from '../../services/alertas.service';
import { BlogarticulosService } from '../../services/blogarticulos.service';
import { ClientesService } from '../../services/clientes.service';
import { AuthService } from '../../services/auth.service';
import { EnlacesService } from '../../services/enlaces.service';
import { EnlacesModel } from 'src/app/models/enlaces.model';
import { link } from 'fs';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html'

})


export class NosotrosComponent implements OnInit{

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
    

  cliente: ClientesModel = new ClientesModel();
  imagenes :ImagenesModel[] = [];
  idenlace: number ;
  enlacedestacado: string = "";

  texto1: string = "";
  texto2: string = "";
  texto3: string = "";

  textosall: TextosModel[];

  tiposeccion: number = 2;
  tipotextoseccion: number = 1;

  ////1
  posiciona1: number = 1;
  link1: string = "/contacto";
  posiciont1: number = 1;
  titulo1: string = "NOSOTROS"
  
  
  ////3
  posiciona3: number = 3;
  posicionb3: number = 4;
  link2: string = "/contacto";
  posiciont2: number = 2;
  titulo2: string = "PROYECTOS XANADU "
  imagenlacea2: string = "";
  imagenlaceamovil2: string = "";
  imagenlaceb2: string = "";
  imagenlacebmovil2: string = "";



  constructor(
      private router: Router,
      private imagenesService: ImagenesService,
      private textosService: TextosService,
      private blogarticulosService: BlogarticulosService,
      private alertasService: AlertasService,
      private clientesService: ClientesService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private enlacesService: EnlacesService,
      private activatedRoute: ActivatedRoute,
      private meta: Meta,
      private title: Title

  )
  {

    this.title.setTitle( "▷ TU EMPRESA DE PROYECTOS DE EXTERIOR - proyectosxanadu.es ");
    this.meta.updateTag({ name: 'description', content: 'Fabricantes, distribuidores y proveedores de muebles y proyectos de exterior Diseñamos exteriores y realizamos cerramientos a medida en Madrid ' });
    this.meta.updateTag({ name: 'keywords', content: 'Fabricantes, distribuidores y proveedores de muebles y proyectos de exterior Diseñamos exteriores y realizamos cerramientos a medida en Madrid ' });
    this.meta.updateTag({ name: 'title', content: '▷ Fabricantes, distribuidores y proveedores de muebles y proyectos de exterior ✅ Diseñamos exteriores y realizamos cerramientos a medida en Madrid' });
    this.wowService.init();
    //ids para home
    this.idenlace = 6;

    this.getTextosall();
    this.getImagenes();

  }

  ngOnInit() {

    this.menuPublic.emit(0);
   
  }


  getTextosall(){
    //// textos
    this.textosService.getTextosFiltnom(this.idenlace, 2 ).subscribe( (resp: TextosModel[] ) =>{
      this.textosall = resp;

        this.textosall.forEach( (el)=>{
      
           switch(el.posicion){
             case "1": 
             this.texto1 = el.texto;
             break;
             case "2": 
             this.texto2 = el.texto;
             break;

           } 
      })

    })
  }



  getImagenes(){
    
    this.imagenesService.getImagenesFilt(this.idenlace, 2).subscribe( (resp: ImagenesModel[] ) =>{
      if(resp != undefined){
        var imagenes = resp;
        imagenes.forEach( (el)=>{
      
           switch(el.posicion){
             case "1": 
             this.imagenlacea2 = el.rutapc;
             this.imagenlaceamovil2 = el.rutamovil;
             break;
             case "2": 
             this.imagenlaceb2 = el.rutapc;
             this.imagenlacebmovil2 = el.rutamovil;
             break;
           } 
        })
      }
    })
  }

  scrollToElement(element: Element): void {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  

  
  


 
   
  


  
}

    

