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
  selector: 'app-homecliente',
  templateUrl: './homecliente.component.html'

})


export class HomeclienteComponent implements OnInit{

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
    

  cliente: ClientesModel = new ClientesModel();
  imagenes :ImagenesModel[] = [];
  idenlace: number ;
  enlacedestacado: string = "";

  texto1: string = "";
  texto2: string = "";
  texto3: string = "";
  texto4: string = "";
  texto5: string = "";
  texto6: string = "";
  texto7: string = "";
  texto8: string = "";
  texto9: string = "";


  textosall: TextosModel[];

  tiposeccion: number = 2;
  tipotextoseccion: number = 1;

  ////1
  posiciona1: number = 1;
  link1: string = "/nosotros";
  posiciont1: number = 1;
  titulo1: string = "NOSOTROS"

  ////2
  posiciona2: number = 2;
  link2: string = "";
  posiciont2: number = 2;
  titulo2: string = "MOBILIARIO ETHIMO"

  ////3
  posiciona3: number = 3;
  posicionb3: number = 4;
  link3: string = "/corradi";
  posiciont3: number = 3;
  titulo3: string = "CORRADI"
  imagenlacea3: string = "";
  imagenlaceb3: string = "";
  imagenlaceamovil3: string = "";
  imagenlacebmovil3: string = "";
  linka3: string = "";
  linkb3: string = "";
  
  ////4
  posicion4a: number = 5;
  posicion4b: number = 6;
  link4: string = "/markilux";
  posiciont4: number = 4;
  titulo4: string = "MARKILUX";
  imagenlacea4: string = "";
  imagenlaceb4: string= "";
  imagenlaceamovil4: string = "";
  imagenlacebmovil4: string = "";
  linka4: string = "";
  linkb4: string = "";

  ////5
  posicion5a: number = 7;
  posicion5b: number = 8;
  link5: string = '';//"/techo-movil";
  posiciont5: number = 5;
  titulo5: string = "TECNIKOR";
  imagenlacea5: string = "";
  imagenlaceb5: string = "";
  imagenlaceamovil5: string = "";
  imagenlacebmovil5: string = "";
  linka5: string = "";
  linkb5: string = "";

  ////6
  posiciona6: number = 9;
  link6: string = "/proyectos";
  posiciont6: number = 6;
  titulo6: string = "PROYECTOS";
  imagenlacea6: string = "";
  imagenlaceamovil6: string = "";
  linka6: string = "";
  

  ////7
  posiciona7: number = 10;
  link7: string = "";
  posiciont7: number = 7;
  titulo7: string = "PRODUCTO DESTACADO";
  imagenlacea7: string = "";
  imagenlaceamovi7: string = "";
  linka7: string = "";

  ////8
  posiciona8: number = 11;
  link8: string = "";
  posiciont8: number = 8;
  titulo8: string = "PROVEEDORES";
  linka8: string = "";

  ////9
  posiciona9: number = 12;
  link9: string = "/blog";
  posiciont9: number = 9;
  titulo9: string = "BLOG";
  linka9: string = "";



  blogarticulos: BlogarticulosModel[] = [];

  elem: HTMLElement;

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
    this.title.setTitle( "▷ PROYECTOS XANADU- proyectosxanadu.es");
    this.meta.updateTag({ name: 'description', content: 'Conoce Proyectos Xanadu Madrid Proveedores e instaladores de soluciones para exterior, cerramientos, muebles, estructuras a medida' });
    this.meta.updateTag({ name: 'author', content: 'Conoce Proyectos Xanadu Madrid Proveedores e instaladores de soluciones para exterior, cerramientos, muebles, estructuras a medida' });
    this.meta.updateTag({ name: 'keywords', content: '▷ Conoce Proyectos Xanadu Madrid ✅  Proveedores e instaladores de soluciones para exterior, cerramientos, muebles, estructuras a medida' });

    this.wowService.init();
    //ids para home
    this.idenlace = 1;

    this.getTextosall();
    this.getBlog();
    this.getImagenes();

    

  }

  ngOnInit() {

    this.menuPublic.emit(0);

    
  }

  getBlog(){
     ////blog articulos
     this.blogarticulosService.getBlogarticuloshome()
     .subscribe( (resp :BlogarticulosModel[]) => {
     this.blogarticulos = resp;
     });
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
             case "3": 
             this.texto3 = el.texto;
             break;
             case "4": 
             this.texto4 = el.texto;
             break;
             case "5": 
             this.texto5 = el.texto;
             break;
             case "6": 
             this.texto6 = el.texto;
             break;
             case "7": 
             this.texto7 = el.texto;
             break;
             case "8": 
             this.texto8 = el.texto;
             break;
             case "9": 
             this.texto9 = el.texto;
             break;

           } 
      })

    })
  }


  getlinkimagen(rutabase){
    let link = rutabase.replace('https://proyectosxanadu.es/assets/images','');
    
    return link;
  }



  getImagenes(){
    
    this.imagenesService.getImagenesFilt(this.idenlace, 2).subscribe( (resp: ImagenesModel[] ) =>{
      var imagenes = resp;

        imagenes.forEach( (el)=>{
      
           switch(el.posicion){
             case "3": 
             this.imagenlacea3 = el.rutapc;
             this.imagenlaceamovil3 = el.rutamovil;
             this.linka3 = el.destino; 
           
             break;
             case "4": 
             this.imagenlaceb3 = el.rutapc;
             this.imagenlacebmovil3 = el.rutamovil;
             this.linkb3 = el.destino; 

             break;
             case "5": 
             this.imagenlacea4 = el.rutapc;
             this.imagenlaceamovil4 = el.rutamovil;
             this.linka4 = el.destino; 
       
             break;
             case "6": 
             this.imagenlaceb4 = el.rutapc;
             this.imagenlacebmovil4 = el.rutamovil;
             this.linkb4 = el.destino; 
     
             break;
             case "7": 
             this.imagenlacea5 = el.rutapc;
             this.imagenlaceamovil5 = el.rutamovil;
             this.linka5 = null; 
            
             break;
             case "8": 
             this.imagenlaceb5 = el.rutapc;
             this.imagenlacebmovil5 = el.rutamovil;
             this.linkb5 = null;
            
             break;
             case "9": 
             this.imagenlacea6 = el.rutapc;
             this.imagenlaceamovil6 = el.rutamovil;
             this.linka6 = el.destino; 
           
             break;
             case "10": 
             this.imagenlacea7 = el.rutapc;
             this.imagenlaceamovi7 = el.rutamovil;
             this.linka7 = el.destino; 
         
             break;

           } 
        })


    })
    
  }

  scrollToElement(element: Element): void {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  

  
  


 
   
  


  
}

    

