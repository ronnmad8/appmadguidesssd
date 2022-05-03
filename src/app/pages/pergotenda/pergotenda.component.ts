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
  selector: 'app-pergotenda',
  templateUrl: './pergotenda.component.html'
})


export class PergotendaComponent implements OnInit{
    
  idenlaceschildren: number[] = [48,49,50,51,52,53,54,55];

  idenlace: number = 12; //pergotenda
  idtipo: number = 8; //long
  idtipotexto: number = 8; //lemas
  idtipotextoseo = 2; //descripcion
  cargados: boolean = false;

  imagenes: ImagenesModel[] = [];
  
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
  link1: string = "";
  posiciont1: number = 1;
  titulo1: string = "pergotenda";

  ////2 B-SPACE
  link2: string = "";
  posiciont2: number = 2;
  titulo2: string = "";
  lema2: string = "";//bd
  imagenlacea2: string = "";//bd
  imagenlaceb2: string = "";//bd
  imagenlaceamovil2: string = "";//bd
  imagenlacebmovil2: string = "";//bd

  ////3 EXYL
  link3: string = "";
  posiciont3: number = 3;
  titulo3: string = "";
  lema3: string = "";//bd
  imagenlacea3: string = "";//bd
  imagenlaceb3: string = "";//bd
  imagenlaceamovil3: string = "";//bd
  imagenlacebmovil3: string = "";//bd

  ////4 FLUX
  link4: string = "";
  posiciont4: number = 4;
  titulo4: string = "";
  lema4: string = "";//bd
  imagenlacea4: string = "";//bd
  imagenlaceb4: string = "";//bd
  imagenlaceamovil4: string = "";//bd
  imagenlacebmovil4: string = "";//bd

  ////5 IMPACT
  link5: string = "";
  posiciont5: number = 5;
  titulo5: string = "";
  lema5: string = "";//bd
  imagenlacea5: string = "";//bd
  imagenlaceb5: string = "";//bd
  imagenlaceamovil5: string = "";//bd
  imagenlacebmovil5: string = "";//bd

  ////6 MAESTRO
  link6: string = "";
  posiciont6: number = 6;
  titulo6: string = "";
  lema6: string = "";//bd
  imagenlacea6: string = "";//bd
  imagenlaceb6: string = "";//bd
  imagenlaceamovil6: string = "";//bd
  imagenlacebmovil6: string = "";//bd

  ////7 MILLENIUM CELEB
  link7: string = "";
  posiciont7: number = 7;
  titulo7: string = "";
  lema7: string = "";//bd
  imagenlacea7: string = "";//bd
  imagenlaceb7: string = "";//bd
  imagenlaceamovil7: string = "";//bd
  imagenlacebmovil7: string = "";//bd

  ////8 PALLADIA
  link8: string = "";
  posiciont8: number = 8;
  titulo8: string = "";
  lema8: string = "";//bd
  imagenlacea8: string = "";//bd
  imagenlaceb8: string = "";//bd
  imagenlaceamovil8: string = "";//bd
  imagenlacebmovil8: string = "";//bd

  ////9 PERGOTENDA45
  link9: string = "";
  posiciont9: number = 9;
  titulo9: string = "";
  lema9: string = "";//bd
  imagenlacea9: string = "";//bd
  imagenlaceb9: string = "";//bd
  imagenlaceamovil9: string = "";//bd
  imagenlacebmovil9: string = "";//bd




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

    this.title.setTitle( "PÉRGOLAS Y PERGOTENDAS CORRADI ");
    this.meta.updateTag({ name: 'description', content: ' Las Pérgolas Bioclimáticas y Pergotendas Corradi en Madrid son una solución ideal Conoce todos los modelos disponibles y combínalas con accesorios' });
    this.meta.updateTag({ name: 'keywords', content: 'Las Pérgolas Bioclimáticas y Pergotendas Corradi en Madrid son una solución ideal Conoce todos los modelos disponibles y combínalas con accesorios ' });
    this.meta.updateTag({ name: 'title', content: 'Las Pérgolas Bioclimáticas y Pergotendas Corradi en Madrid son una solución ideal ✅ Conoce todos los modelos disponibles y combínalas con accesorios' });
  
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
            case "5":
              this.lema6 = el.texto;
              break;
            case "6":
              this.lema7 = el.texto;
              break;
            case "7":
              this.lema8 = el.texto;
              break;
            case "8":
              this.lema9 = el.texto;
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
            case "10":
              this.imagenlacea6 = el.rutapc;
              this.imagenlaceamovil6 = el.rutamovil;
              break;
            case "11":
              this.imagenlaceb6 = el.rutapc;
              this.imagenlacebmovil6 = el.rutamovil;
              break;
            case "12":
              this.imagenlacea7 = el.rutapc;
              this.imagenlaceamovil7 = el.rutamovil;
              break;
            case "13":
              this.imagenlaceb7 = el.rutapc;
              this.imagenlacebmovil7 = el.rutamovil;
              break;
            case "14":
              this.imagenlacea8 = el.rutapc;
              this.imagenlaceamovil8 = el.rutamovil;
              break;
            case "15":
              this.imagenlaceb8 = el.rutapc;
              this.imagenlacebmovil8 = el.rutamovil;
              break;
            case "16":
              this.imagenlacea9 = el.rutapc;
              this.imagenlaceamovil9 = el.rutamovil;
              break;
            case "17":
              this.imagenlaceb9 = el.rutapc;
              this.imagenlacebmovil9 = el.rutamovil;
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
            case this.idenlaceschildren[2]:
                this.titulo4 = el.nombre;
                this.link4 = el.enlace;
                break;
            case this.idenlaceschildren[3]:
                this.titulo5 = el.nombre;
                this.link5 = el.enlace;
                break;
            case this.idenlaceschildren[4]:
                this.titulo6 = el.nombre;
                this.link6 = el.enlace;
                break;
            case this.idenlaceschildren[5]:
                this.titulo7 = el.nombre;
                this.link7 = el.enlace;
                break;
            case this.idenlaceschildren[6]:
                this.titulo8 = el.nombre;
                this.link8 = el.enlace;
                break;
            case this.idenlaceschildren[7]:
                this.titulo9 = el.nombre;
                this.link9 = el.enlace;
                break;

    
          }

        });
      }
    
    })
  }
  
 
   
  


  
}

    

