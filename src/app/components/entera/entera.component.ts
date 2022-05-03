import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';

@Component({
  selector: 'app-entera',
  templateUrl: './entera.component.html',
  styleUrls: ['./entera.component.css']
})
export class EnteraComponent implements OnInit {

  @Input() enlace: number;
  @Input() posicion1: number;
  @Input() tipo: number;
  @Input() link: string;


  public imagenpc;
  public imagenmovil;

  constructor(
    private imagenesService: ImagenesService,
    private textosService: TextosService
  ) { }

  ngOnInit() {


    ////imagen 1
    this.imagenesService.getImagenesFiltpos(this.enlace,  this.tipo , this.posicion1)
    .subscribe( (resp :ImagenesModel) => {
        let imagen = resp;
        if(imagen.id != undefined){
          this.imagenpc = imagen.rutapc ;
          this.imagenmovil = imagen.rutamovil ;
        }
    });

  }

}
