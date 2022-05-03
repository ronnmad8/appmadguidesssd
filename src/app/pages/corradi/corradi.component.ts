import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { NgwWowService } from "ngx-wow";

import { ImagenesModel } from "src/app/models/imagenes.model";
import { ImagenesService } from "../../services/imagenes.service";
import { TextosModel } from "src/app/models/textos.model";
import { TextosService } from "../../services/textos.service";
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: "app-corradi",
  templateUrl: "./corradi.component.html",
})
export class CorradiComponent implements OnInit {

  idenlace: number = 3; //CORRADI
  idtipo: number = 8; //long
  idtipotexto: number = 8; //lemas
  idtipotextoseo = 2; //descripcion
  tipotextoseccion: number = 1;
  cargados: boolean = false;

  imagenes: ImagenesModel[] = [];

  texto1: string = "";
  texto2: string = "";
  texto3: string = "";
  texto4: string = "";
  texto5: string = "";

  textosall: TextosModel[];



  ////1
  link1: string = "/";
  posiciont1: number = 1;
  titulo1: string = "CORRADI";

  ////2
  link2: string = "/corradi/bioclimaticas";
  posiciont2: number = 2;
  titulo2: string = "BIOCLIMÁTICAS";
  lema2: string = ""; //bd
  imagenlacea2: string = ""; //bd
  imagenlaceb2: string = ""; //bd
  imagenlaceamovil2: string = ""; //bd
  imagenlacebmovil2: string = ""; //bd

  ////4
  link3: string = "/corradi/pergotenda";
  posiciont3: number = 3;
  titulo3: string = "PERGOTENDA";
  lema3: string = "";//bd
  imagenlacea3: string = "";//bd
  imagenlaceb3: string = "";//bd
  imagenlaceamovil3: string = "";//bd
  imagenlacebmovil3: string = "";//bd

  ////4
  link4: string = "/corradi/sunsails";
  posiciont4: number = 4;
  titulo4: string = "SUN SAILS";
  lema4: string = "";//bd
  imagenlacea4: string = "";//bd
  imagenlaceb4: string = "";//bd
  imagenlaceamovil4: string = "";//bd
  imagenlacebmovil4: string = "";//bd

  ////5
  link5: string = "/corradi/accesorios";
  posiciont5: number = 5;
  titulo5: string = "ACCESORIOS";
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
    private meta: Meta,
    private title: Title
  ) {
    this.wowService.init();

    this.getTextosall();
    this.getTextosLemasall();
    this.getImagenes();
  }

  ngOnInit() {
    this.title.setTitle( "▷ PÉRGOLAS Y PERGOTENDAS CORRADI - proyectosxanadu.es");
    this.meta.updateTag({ name: 'description', content: 'Las Pérgolas Bioclimáticas y Pergotendas Corradi en Madrid son una solución ideal  Conoce todos los modelos disponibles y combínalas con accesorios' });
    this.meta.updateTag({ name: 'keywords', content: 'Las Pérgolas Bioclimáticas y Pergotendas Corradi en Madrid son una solución ideal Conoce todos los modelos disponibles y combínalas con accesorios' });
    this.meta.updateTag({ name: 'title', content: ' ▷ Las Pérgolas Bioclimáticas y Pergotendas Corradi en Madrid son una solución ideal ✅ Conoce todos los modelos disponibles y combínalas con accesorios'});
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
}
