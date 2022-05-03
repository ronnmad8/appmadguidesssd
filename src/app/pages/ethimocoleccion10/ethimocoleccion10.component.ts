import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { NgwWowService } from "ngx-wow";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { ImagenesService } from "src/app/services/imagenes.service";
import { ImagenesModel } from "src/app/models/imagenes.model";
import { TextosModel } from "src/app/models/textos.model";
import { TextosService } from "../../services/textos.service";
import { ArticulocoleccionesModel } from "src/app/models/articulocolecciones.model";
import { ArticulocoleccionesService } from "../../services/articulocolecciones.service";
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import * as internal from "assert";
import { SafeMethodCall } from "@angular/compiler";

@Component({
  selector: "app-ethimocoleccion10",
  templateUrl: "./ethimocoleccion10.component.html",
})
export class Ethimocoleccion10Component implements OnInit {
  idenlace: number = 37;
  idtipo: number = 5;
  idtipotexto: number = 7;
  idcoleccion: number = 10;
  cargados: boolean = false;
  textosall = [];
  texto1: string = "";
  texto2: string = "";
  titulo1: string = "Colección";
  titulo2: string = "Colección";

  constructor(
    private ro: ActivatedRoute,
    private router: Router,
    private imagenesService: ImagenesService,
    private textosService: TextosService,
    private articulocoleccionesService: ArticulocoleccionesService,
    private wowService: NgwWowService
  ) {
    this.wowService.init();

    this.getTextosall();
    this.getTitulosall();
  }

  ngOnInit() {}

  scrollToElement(element: Element): void {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }

  getTextosall() {
    this.textosService
      .getTextosFiltnom(this.idenlace, 2)
      .subscribe((resp: TextosModel[]) => {
        let textos = resp;

        if (resp != null) {
          textos.forEach((el) => {
            switch (el.posicion) {
              case "1":
                this.texto1 = el.texto;
                break;
              case "2":
                this.texto2 = el.texto;
                break;
            }
          });
        }
      });
  }

  getTitulosall() {
    this.textosService
      .getTextosFiltnom(this.idenlace, 1)
      .subscribe((resp: TextosModel[]) => {
        let titulos = resp;
        if (resp != null) {
          titulos.forEach((el) => {
            switch (el.posicion) {
              case "1":
                this.titulo1 = el.texto;
                break;
              case "2":
                this.titulo2 = el.texto;
                break;
            }
          });
        }
      });
  }


  
}
