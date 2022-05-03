import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { ImagenesModel } from 'src/app/models/imagenes.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosModel } from 'src/app/models/textos.model';
import { TextosService } from '../../services/textos.service';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { EnlacesModel } from 'src/app/models/enlaces.model';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-techofijo',
  templateUrl: './techofijo.component.html'
})


export class TechofijoComponent implements OnInit{
    
  idenlaceschildren: number[] = [74,75];

  idenlace: number = 69; //techofijo
  idtipo: number = 8; //long
  idtipotexto: number = 8; //lemas
  idtipotextoseo = 2; //descripcion
  cargados: boolean = false;

  imagenes: ImagenesModel[] = [];
  
  texto1: string = "";
  texto2: string = "";
  texto3: string = "";
  texto4: string = "";

  
  textosall: TextosModel[];

  tiposeccion: number = 2;
  tipotextoseccion: number = 1;

  ////1
  link1: string = "";
  posiciont1: number = 1;
  titulo1: string = "pergotenda";

  ////2 EVOLUTION
  link2: string = "";
  posiciont2: number = 2;
  titulo2: string = "";
  lema2: string = "";//bd
  imagenlacea2: string = "";//bd
  imagenlaceb2: string = "";//bd
  imagenlaceamovil2: string = "";//bd
  imagenlacebmovil2: string = "";//bd

  ////3 ISKAR
  link3: string = "";
  posiciont3: number = 3;
  titulo3: string = "";
  lema3: string = "";//bd
  imagenlacea3: string = "";//bd
  imagenlaceb3: string = "";//bd
  imagenlaceamovil3: string = "";//bd
  imagenlacebmovil3: string = "";//bd
  


  

  constructor(
      private ro: ActivatedRoute,
      private router: Router,
      private imagenesService: ImagenesService,
      private textosService: TextosService,
      private wowService: NgwWowService,
      private enlacesService: EnlacesService,
      private meta: Meta,
      private title: Title
  )
  {
    this.title.setTitle( "▷  TECHOS FIJOS DE CRISTAL - proyectosxanadu.es");
    this.meta.updateTag({ name: 'description', content: ' Conoce nuestra selección de techos fijos acristalados Descubre nuestro catálogo de techos de cristal para tu propiedad en Madrid ' });
    this.meta.updateTag({ name: 'keywords', content: ' Conoce nuestra selección de techos fijos acristalados Descubre nuestro catálogo de techos de cristal para tu propiedad en Madrid' });
    this.meta.updateTag({ name: 'title', content: '▷Conoce nuestra selección de techos fijos acristalados ✅  Descubre nuestro catálogo de techos de cristal para tu propiedad en Madrid' });

    this.wowService.init();

    this.getTextosall();
    this.getTextosLemasall();
    this.getImagenes();
    this.getTitulo1();
    this.getTitlinkEnlace(this.idenlace);

  }

  ngOnInit() {

    

  }

  getTextosall() {
    //// textos
    this.textosService
      .getTextosFiltnom(this.idenlace, this.idtipotextoseo)
      .subscribe((resp: TextosModel[]) => {
        this.textosall = resp;

        this.textosall.forEach((el) => {
          switch (el.posicion) {
            case "1":
              this.texto1 = el.texto;
              break;
            case "2":
              this.texto2 = el.texto;
              break;
            case "3":
              this.texto3 = el.texto;
              break;

          }
        });
        
      });
  }

  getTextosLemasall() {
    //// textos
    this.textosService
      .getTextosFiltnom(this.idenlace, this.idtipotexto)
      .subscribe((resp: TextosModel[]) => {
        this.textosall = resp;

        this.textosall.forEach((el) => {
          switch (el.posicion) {
            case "1":
              this.lema2 = el.texto;
              break;
            case "2":
              this.lema3 = el.texto;
              break;
            

          }
        });
      });
  }


  getImagenes() {
    this.imagenesService
      .getImagenesFilt(this.idenlace, this.idtipo )
      .subscribe((resp: ImagenesModel[]) => {
        var imagenes = resp;
        imagenes.forEach((el) => {
          switch (el.posicion) {
            case "2":
              this.imagenlacea2 = el.rutapc;
              this.imagenlaceamovil2 = el.rutamovil;
              break;
            case "3":
              this.imagenlaceb2 = el.rutapc;
              this.imagenlacebmovil2 = el.rutamovil;
              break;
            case "4":
              this.imagenlacea3 = el.rutapc;
              this.imagenlaceamovil3 = el.rutamovil;
              break;
            case "5":
              this.imagenlaceb3 = el.rutapc;
              this.imagenlacebmovil3 = el.rutamovil;
              break;

          }
        });
      });
  }

  scrollToElement(element: Element): void {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }

  
  getTitulo1(){
    this.enlacesService.getEnlace(this.idenlace).subscribe( (resp)=>{
      let enlace = resp;
      this.titulo1 = enlace.nombre
    })
  }
  

  getTitlinkEnlace( id:number) {
    
    this.enlacesService.getEnlacesByppal(this.idenlace).subscribe( (resp: EnlacesModel[])=>{
      
      if( resp != undefined ){
        var enlaces = resp;

        enlaces.forEach( (el) => {
          
          switch(el.id){
            case this.idenlaceschildren[0]:
                this.titulo2 = el.nombre;
                this.link2 = el.enlace;
                break;
            case this.idenlaceschildren[1]:
                this.titulo3 = el.nombre;
                this.link3 = el.enlace;
                break;
            

    
          }

        });
      }
    
    })
  }
  
 
   
  


  
}

    

