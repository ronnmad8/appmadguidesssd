import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';
import { EnlacesService } from '../../services/enlaces.service';
import { EnlacesModel } from 'src/app/models/enlaces.model';

@Component({
  selector: 'app-textocolecciones',
  templateUrl: './textocolecciones.component.html',
  styleUrls: ['./textocolecciones.component.css']
})
export class TextocoleccionesComponent implements OnInit {

  @Input() enlace: number;
  @Input() posicion: string;
  @Input() tipo: string;


  texto: string;
  titulo: string;
  loading: boolean = false;

  constructor(
    private imagenesService: ImagenesService,
    private textosService: TextosService,
    private enlacesService: EnlacesService
  ) { }

  ngOnInit() {

    this.getTextos();

  }

  getTextos(){
      ////texto
    this.loading = true
    this.textosService.getTextosFiltpos(this.enlace, parseInt(this.tipo), parseInt(this.posicion) )
    .subscribe( (resp :TextosModel) => {
        let texto = resp;
        if(texto.id != undefined){
          this.texto = texto.texto ;
        }
        setTimeout(() => {
          this.loading = false;
        }, 300);
    });
  }


}
