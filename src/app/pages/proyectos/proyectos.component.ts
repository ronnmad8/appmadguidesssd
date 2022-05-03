import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { NgwWowService } from "ngx-wow";

import { ImagenesModel } from "src/app/models/imagenes.model";
import { ImagenesService } from "../../services/imagenes.service";
import { TextosModel } from "src/app/models/textos.model";
import { TextosService } from "../../services/textos.service";
import { EnlacesService } from '../../services/enlaces.service';
import { EnlacesModel } from 'src/app/models/enlaces.model';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: "app-proyectos",
  templateUrl: "./proyectos.component.html",
})
export class ProyectosComponent implements OnInit {

  idenlaceschildren: number[] = [17,18,19,90,22,69,21,20,24,25,23,26,27];

  idenlace: number = 5; //proyectos
  idtipo: number = 7; //long
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
  texto6: string = "";
  texto7: string = "";
  texto8: string = "";
  texto9: string = "";
  texto10: string = "";
  texto11: string = "";
  texto12: string = "";
  texto13: string = "";
  texto14: string = "";

  textosall: TextosModel[];

  ////1
  link1: string = "/";
  posiciont1: number = 1;
  titulo1: string = ""; //bd PROYECTOS

  ////2
  link2: string = ""; //bd
  posiciont2: number = 2;
  titulo2: string = ""; //bd
  imagenlacea2: string = ""; //bd
  imagenlaceb2: string = ""; //bd
  imagenlaceamovil2: string = ""; //bd
  imagenlacebmovil2: string = ""; //bd

  //3
  link3: string = ""; //bd
  posiciont3: number = 3;
  titulo3: string = ""; //bd
  imagenlacea3: string = "";//bd
  imagenlaceb3: string = "";//bd
  imagenlaceamovil3: string = "";//bd
  imagenlacebmovil3: string = "";//bd

  //4
  link4: string = ""; //bd
  posiciont4: number = 4;
  titulo4: string = ""; //bd
  imagenlacea4: string = "";//bd
  imagenlaceb4: string = "";//bd
  imagenlaceamovil4: string = "";//bd
  imagenlacebmovil4: string = "";//bd

  //5
  link5: string = ""; //bd
  posiciont5: number = 5;
  titulo5: string = ""; //bd
  imagenlacea5: string = "";//bd
  imagenlaceb5: string = "";//bd
  imagenlaceamovil5: string = "";//bd
  imagenlacebmovil5: string = "";//bd

  //6
  link6: string = ""; //bd
  posiciont6: number = 6;
  titulo6: string = ""; //bd
  imagenlacea6: string = "";//bd
  imagenlaceb6: string = "";//bd
  imagenlaceamovil6: string = "";//bd
  imagenlacebmovil6: string = "";//bd

  //7
  link7: string = ""; //bd
  posiciont7: number = 7;
  titulo7: string = ""; //bd
  imagenlacea7: string = "";//bd
  imagenlaceb7: string = "";//bd
  imagenlaceamovil7: string = "";//bd
  imagenlacebmovil7: string = "";//bd

  //8
  link8: string = ""; //bd
  posiciont8: number = 8;
  titulo8: string = ""; //bd
  imagenlacea8: string = "";//bd
  imagenlaceb8: string = "";//bd
  imagenlaceamovil8: string = "";//bd
  imagenlacebmovil8: string = "";//bd

  //9
  link9: string = ""; //bd
  posiciont9: number = 9;
  titulo9: string = ""; //bd
  imagenlacea9: string = "";//bd
  imagenlaceb9: string = "";//bd
  imagenlaceamovil9: string = "";//bd
  imagenlacebmovil9: string = "";//bd

  //10
  link10: string = ""; //bd
  posiciont10: number = 10;
  titulo10: string = ""; //bd
  imagenlacea10: string = "";//bd
  imagenlaceb10: string = "";//bd
  imagenlaceamovil10: string = "";//bd
  imagenlacebmovil10: string = "";//bd

  //11
  link11: string = ""; //bd
  posiciont11: number = 11;
  titulo11: string = ""; //bd
  imagenlacea11: string = "";//bd
  imagenlaceb11: string = "";//bd
  imagenlaceamovil11: string = "";//bd
  imagenlacebmovil11: string = "";//bd

  ////12
  link12: string = ""; //bd
  posiciont12: number = 12;
  titulo12: string = ""; //bd
  imagenlacea12: string = "";//bd
  imagenlaceb12: string = "";//bd
  imagenlaceamovil12: string = "";//bd
  imagenlacebmovil12: string = "";//bd

  ////13
  link13: string = ""; //bd
  posiciont13: number = 12;
  titulo13: string = ""; //bd
  imagenlacea13: string = "";//bd
  imagenlaceb13: string = "";//bd
  imagenlaceamovil13: string = "";//bd
  imagenlacebmovil13: string = "";//bd

  ////14
  link14: string = ""; //bd
  posiciont14: number = 12;
  titulo14: string = ""; //bd
  imagenlacea14: string = "";//bd
  imagenlaceb14: string = "";//bd
  imagenlaceamovil14: string = "";//bd
  imagenlacebmovil14: string = "";//bd




  constructor(
    private ro: ActivatedRoute,
    private router: Router,
    private imagenesService: ImagenesService,
    private textosService: TextosService,
    private wowService: NgwWowService,
    private enlacesService: EnlacesService,
    private meta: Meta,
    private title: Title
  ) {
    this.title.setTitle( "▷ PROYECTOS XANADÚ - proyectosxanadu.es ");
    this.meta.updateTag({ name: 'description', content: ' Conoce todas las opciones disponibles Bioclimáticas, pergolas, cerramientos, proyectos a medida. Lo que necesites para el exterior en Madrid ' });
    this.meta.updateTag({ name: 'keywords', content: ' Conoce todas las opciones disponibles Bioclimáticas, pergolas, cerramientos, proyectos a medida. Lo que necesites para el exterior en Madrid' });
    this.meta.updateTag({ name: 'title', content: '▷ Conoce todas las opciones disponibles ✅  Bioclimáticas, pergolas, cerramientos, proyectos a medida. Lo que necesites para el exterior en Madrid' });

    this.wowService.init();

    this.getTextosall();
    this.getImagenes();
    this.getTitulo1();
    this.getTitlinkEnlace(this.idenlace);
  }

  ngOnInit() {}

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
            case "10":
              this.texto10 = el.texto;
              break; 
            case "11":
              this.texto11 = el.texto;
              break;
            case "12":
              this.texto12 = el.texto;
              break;
            case "13":
              this.texto13 = el.texto;
              break;
            case "14":
              this.texto14 = el.texto;
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
            case "1":
              this.imagenlacea2 = el.rutapc;
              this.imagenlaceamovil2 = el.rutamovil;
              break;
            case "2":
              this.imagenlaceb2 = el.rutapc;
              this.imagenlacebmovil2 = el.rutamovil;
              break;
            case "3":
              this.imagenlacea3 = el.rutapc;
              this.imagenlaceamovil3 = el.rutamovil;
              break;
            case "4":
              this.imagenlaceb3 = el.rutapc;
              this.imagenlacebmovil3 = el.rutamovil;
              break;
            case "5":
              this.imagenlacea4 = el.rutapc;
              this.imagenlaceamovil4 = el.rutamovil;
              break;
            case "6":
              this.imagenlaceb4 = el.rutapc;
              this.imagenlacebmovil4 = el.rutamovil;
              break;
            case "7":
              this.imagenlacea5 = el.rutapc;
              this.imagenlaceamovil5 = el.rutamovil;
              break;
            case "8":
              this.imagenlaceb5 = el.rutapc;
              this.imagenlacebmovil5 = el.rutamovil;
              break;
            case "9":
              this.imagenlacea6 = el.rutapc;
              this.imagenlaceamovil6 = el.rutamovil;
              break;
            case "10":
              this.imagenlaceb6 = el.rutapc;
              this.imagenlacebmovil6 = el.rutamovil;
              break;
            case "11":
              this.imagenlacea7 = el.rutapc;
              this.imagenlaceamovil7 = el.rutamovil;
              break;
            case "12":
              this.imagenlaceb7 = el.rutapc;
              this.imagenlacebmovil7 = el.rutamovil;
              break;
            case "13":
              this.imagenlacea8 = el.rutapc;
              this.imagenlaceamovil8 = el.rutamovil;
              break;
            case "14":
              this.imagenlaceb8 = el.rutapc;
              this.imagenlacebmovil8 = el.rutamovil;
              break;
            case "15":
              this.imagenlacea9 = el.rutapc;
              this.imagenlaceamovil9 = el.rutamovil;
              break;
            case "16":
              this.imagenlaceb9 = el.rutapc;
              this.imagenlacebmovil9 = el.rutamovil;
              break;
            case "17":
              this.imagenlacea10 = el.rutapc;
              this.imagenlaceamovil10 = el.rutamovil;
              break;
            case "18":
              this.imagenlaceb10 = el.rutapc;
              this.imagenlacebmovil10 = el.rutamovil;
              break;
            case "19":
              this.imagenlacea11 = el.rutapc;
              this.imagenlaceamovil11 = el.rutamovil;
              break;
            case "20":
              this.imagenlaceb11 = el.rutapc;
              this.imagenlacebmovil11 = el.rutamovil;
              break;
            case "21":
              this.imagenlacea12 = el.rutapc;
              this.imagenlaceamovil12 = el.rutamovil;
              break;
            case "22":
              this.imagenlaceb12 = el.rutapc;
              this.imagenlacebmovil12 = el.rutamovil;
              break;
            case "23":
              this.imagenlacea13 = el.rutapc;
              this.imagenlaceamovil13 = el.rutamovil;
              break;
            case "24":
              this.imagenlaceb13 = el.rutapc;
              this.imagenlacebmovil13 = el.rutamovil;
              break;
            case "25":
              this.imagenlacea14 = el.rutapc;
              this.imagenlaceamovil14 = el.rutamovil;
              break;
            case "26":
              this.imagenlaceb14 = el.rutapc;
              this.imagenlacebmovil14 = el.rutamovil;
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
        if(resp != undefined){
        var enlaces = resp;
    console.log("enlaces ", enlaces);
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
            case this.idenlaceschildren[8]:
                this.titulo10 = el.nombre;
                this.link10 = el.enlace;
                break;
            case this.idenlaceschildren[9]:
                this.titulo11 = el.nombre;
                this.link11 = el.enlace;
                break;
            case this.idenlaceschildren[10]:
                this.titulo12 = el.nombre;
                this.link12 = el.enlace;
                break;
            case this.idenlaceschildren[11]:
                this.titulo13 = el.nombre;
                this.link13 = el.enlace;
                break;
            case this.idenlaceschildren[12]:
                this.titulo14 = el.nombre;
                this.link14 = el.enlace;
                break;

          }

        });
  
      }
    })
  }









}
