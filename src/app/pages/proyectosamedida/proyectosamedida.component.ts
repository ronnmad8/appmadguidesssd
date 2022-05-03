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
  selector: 'app-proyectosamedida',
  templateUrl: './proyectosamedida.component.html'
})


export class ProyectosamedidaComponent implements OnInit{
    

  idenlace: number = 27; //proyectosamedida
  idtipo: number = 8; //long
  idtipotexto: number = 8; //lemas
  idtipotextoseo = 2; //descripcion
  cargados: boolean = false;
  idtitulos = 1;//titulos
  imagenes: ImagenesModel[] = [];
  
  texto1: string = "";
  texto2: string = "";
  texto3: string = "";
  texto4: string = "";
  texto5: string = "";

  
  textosall: TextosModel[];

  tiposeccion: number = 2;
  tipotextoseccion: number = 1;

  ////1
  link1: string = "/contacto";
  posiciont1: number = 1;
  titulo1: string = "PROYECTOS A MEDIDA";

  ////2 UNO
  
  posiciont2: number = 2;
  titulo2: string = "";
  lema2: string = "";//bd
  imagenlacea2: string = "";//bd
  imagenlaceb2: string = "";//bd
  imagenlaceamovil2: string = "";//bd
  imagenlacebmovil2: string = "";//bd

  ////3 DOS
  
  posiciont3: number = 3;
  titulo3: string = "";
  lema3: string = "";//bd
  imagenlacea3: string = "";//bd
  imagenlaceb3: string = "";//bd
  imagenlaceamovil3: string = "";//bd
  imagenlacebmovil3: string = "";//bd

  ////3 TRES
  
  posiciont4: number = 4;
  titulo4: string = "";
  lema4: string = "";//bd
  imagenlacea4: string = "";//bd
  imagenlaceb4: string = "";//bd
  imagenlaceamovil4: string = "";//bd
  imagenlacebmovil4: string = "";//bd

  ////4 CUATRO
  
  posiciont5: number = 5;
  titulo5: string = "";
  lema5: string = "";//bd
  imagenlacea5: string = "";//bd
  imagenlaceb5: string = "";//bd
  imagenlaceamovil5: string = "";//bd
  imagenlacebmovil5: string = "";//bd
  

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
    this.title.setTitle( "▷ PROYECTOS A MEDIDA - proyectosxanadu.es ");
    this.meta.updateTag({ name: 'description', content: ' Instalaciones y montajes exteriores a medida En Xanadú somos especialistas en diseño de exteriores y estructuras a medida en Madrid  ' });
    this.meta.updateTag({ name: 'keywords', content: ' Instalaciones y montajes exteriores a medida En Xanadú somos especialistas en diseño de exteriores y estructuras a medida en Madrid' });
    this.meta.updateTag({ name: 'title', content: '▷ Instalaciones y montajes exteriores a medida ✅  En Xanadú somos especialistas en diseño de exteriores y estructuras a medida en Madrid' });
  
    this.wowService.init();

    this.getTextosall();
    this.getTextosLemasall();
    this.getTitulossall();
    this.getImagenes();
    this.getTitulo1();

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
            case "4":
              this.texto4 = el.texto;
              break;
            case "5":
              this.texto5 = el.texto;
              break;

          }
        });
      });
  }


  getTitulossall() {
    //// textos
    this.textosService
      .getTextosFiltnom(this.idenlace, this.idtitulos)
      .subscribe((resp: TextosModel[]) => {
        this.textosall = resp;

        this.textosall.forEach((el) => {
          switch (el.posicion) {
            case "2":
              this.titulo2 = el.texto;
              break;
            case "3":
              this.titulo3 = el.texto;
              break;
            case "4":
              this.titulo4 = el.texto;
              break;
            case "5":
              this.titulo5 = el.texto;
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
            case "3":
              this.lema4 = el.texto;
              break;
            case "4":
              this.lema5 = el.texto;
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
            case "6":
              this.imagenlacea4 = el.rutapc;
              this.imagenlaceamovil4 = el.rutamovil;
              break;
            case "7":
              this.imagenlaceb4 = el.rutapc;
              this.imagenlacebmovil4 = el.rutamovil;
              break;
            case "8":
              this.imagenlacea5 = el.rutapc;
              this.imagenlaceamovil5 = el.rutamovil;
              break;
            case "9":
              this.imagenlaceb5 = el.rutapc;
              this.imagenlacebmovil5 = el.rutamovil;
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
  
  
  
 
   
  


  
}

    

