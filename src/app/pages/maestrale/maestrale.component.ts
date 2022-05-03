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
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-maestrale',
  templateUrl: './maestrale.component.html'
})


export class MaestraleComponent implements OnInit{
    

  idenlace: number = 46;
  idtipo: number = 5;
  idtipotexto: number = 7;
  tipotextoseccion: number = 2;
  textosall: TextosModel[];
  texto1: string = "";
  link1: string = "";
  posiciont1: number = 1;
  titulo1: string = "MAESTRALE";

  constructor(
      private ro: ActivatedRoute,
      private router: Router,
      private imagenesService: ImagenesService,
      private textosService: TextosService,
      private wowService: NgwWowService,
      private meta: Meta,
      private title: Title
  )
  {
    this.title.setTitle( "▷ Vela de sombra Maestrale - proyectosxanadu.es ");
    this.meta.updateTag({ name: 'description', content: ' Sunsail de Corradi modelo Maestrale Velas de sombra Corradi con diseño italiano, versátiles y elegantes. Somos instaladores en Madrid y alrededores. ' });
    this.meta.updateTag({ name: 'keywords', content: ' Sunsail de Corradi modelo Maestrale Velas de sombra Corradi con diseño italiano, versátiles y elegantes. Somos instaladores en Madrid y alrededores.' });
    this.meta.updateTag({ name: 'title', content: '▷ Sunsail de Corradi modelo Maestrale ✅  Velas de sombra Corradi con diseño italiano, versátiles y elegantes. Somos instaladores en Madrid y alrededores.' });
  
    this.wowService.init();

    this.getTextosall();

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

  

  


 
   
  


  
}

    

