import { HtmlParser } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';

@Component({
  selector: 'app-textosecciones',
  templateUrl: './textosecciones.component.html'
})
export class TextoseccionesComponent implements OnInit {

  @Input() enlace: number;
  @Input() posicion: string = "";
  @Input() titulo: string = "";
  @Input() link: string = "";
  @Input() tipo: string = "";
  @Input() conenlace: boolean;
  @Input() texto: string;


  constructor(

  ) { 

    
  }

  ngOnInit() {

    
      if(this.conenlace == null){
        this.conenlace = false;
      }
      if(!this.conenlace){
        this.link = null;
      }



  }



}
