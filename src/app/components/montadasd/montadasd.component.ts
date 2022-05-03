import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';

@Component({
  selector: 'app-montadasd',
  templateUrl: './montadasd.component.html',
  styleUrls: ['./montadasd.component.css']
})
export class MontadasdComponent implements OnInit {


  @Input() enlaceimagen1: string;
  @Input() enlaceimagen2: string;
  @Input() enlaceimagenmovil: string;
  @Input() link1: string = null;
  @Input() link2: string = null;


  constructor(

  ) { }

  ngOnInit() {

  }

}