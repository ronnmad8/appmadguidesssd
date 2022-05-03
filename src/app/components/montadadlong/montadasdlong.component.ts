import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';

@Component({
  selector: 'app-montadasdlong',
  templateUrl: './montadasdlong.component.html'
})
export class MontadasdlongComponent implements OnInit {

  @Input() enlace: number;
  @Input() enlaceimagen1: string;
  @Input() enlaceimagen2: string;
  @Input() titulo: string;
  @Input() lema: string;
  @Input() link: string;
  @Input() enlaceimagenmovil: string;
  


  constructor(

  ) { 

  }

  ngOnInit() {
    
  }

}
