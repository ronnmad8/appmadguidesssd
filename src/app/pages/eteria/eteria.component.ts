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
import { EnlacesService } from '../../services/enlaces.service';
import { EnlacesModel } from 'src/app/models/enlaces.model';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-eteria',
  templateUrl: './eteria.component.html'
})


export class EteriaComponent implements OnInit{
    

  idenlace: number = 41;
  idtipo: number = 5;
  idtipotexto: number = 7;
  tipotextoseccion: number = 2;
  textosall: TextosModel[];
  texto1: string = "";
  link1: string = "";
  posiciont1: number = 1;
  titulo1: string = "";

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
    this.title.setTitle( "PÉRGOLA BIOCLIMÁTICA ETERIA - proyectosxanadu.es");
    this.meta.updateTag({ name: 'description', content: ' Pérgolas bioclimáticas ETERIA, el mejor modelo manual Conoce la marca Corradi con su espectacular diseño italiano. Te la instalamos en Madrid' });
    this.meta.updateTag({ name: 'keywords', content: 'Pérgolas bioclimáticas ETERIA, el mejor modelo manual Conoce la marca Corradi con su espectacular diseño italiano. Te la instalamos en Madrid ' });
    this.meta.updateTag({ name: 'title', content: ' Pérgolas bioclimáticas ETERIA, el mejor modelo manual ✅ Conoce la marca Corradi con su espectacular diseño italiano. Te la instalamos en Madrid' });
  
    this.wowService.init();

    this.getTextosall();
    this.getTitulo1();

  }

  ngOnInit() {

  }

  getTextosall() {
    //// textos
    this.textosService
      .getTextosFiltnom(this.idenlace, 2)
      .subscribe((resp: TextosModel[]) => {
        this.textosall = resp;

        this.textosall.forEach((el) => {
          switch (el.posicion) {
            case "1":
              this.texto1 = el.texto;
              break;

          }
        });
      });
  }

  scrollToElement(element: Element): void {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  getTitulo1(){
    this.enlacesService.getEnlace(this.idenlace).subscribe( (resp)=>{
      let enlace = resp;
      this.titulo1 = enlace.nombre
    })
  }

  


 
   
  


  
}

    

