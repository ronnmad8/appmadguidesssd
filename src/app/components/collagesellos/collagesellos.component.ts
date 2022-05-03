import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import {
  SwiperComponent,
  SwiperConfigInterface,
  SwiperDirective,
  SwiperPaginationInterface,
  SwiperScrollbarInterface,
} from "ngx-swiper-wrapper";

import { ImagenesModel } from "src/app/models/imagenes.model";
import { TextosModel } from "src/app/models/textos.model";
import { ImagenesService } from "../../services/imagenes.service";
import { TextosService } from "../../services/textos.service";

@Component({
  selector: "app-collagesellos",
  templateUrl: "./collagesellos.component.html",
})
export class CollagesellosComponent implements OnInit {
  @Input() idenlace: number;

  public show: boolean = true;
  public imagenessellos: ImagenesModel[] = [];
  public idtipo: number;
  public selloscargados: boolean = false;

  constructor(private imagenesService: ImagenesService) {
    this.idtipo = 10; //tipo sellos
  }

  ngOnInit(): void {
    this.getImagenes();
  }

  getImagenes() {
    //imagenes
    this.imagenesService
      .getImagenesFilt(this.idenlace, this.idtipo)
      .subscribe((resp: ImagenesModel[]) => {
        if (resp != undefined) {
          this.imagenessellos = resp;
          this.selloscargados = true;
        }
      });
  }
}
