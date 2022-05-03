import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject } from "rxjs";

import Swal from "sweetalert2/dist/sweetalert2.js";
import { ImagenesModel } from "src/app/models/imagenes.model";
import { TextosModel } from "src/app/models/textos.model";
import { TipotextosModel } from "src/app/models/tipotextos.model";
import { TiposModel } from "src/app/models/tipos.model";
import { ListasService } from "../../services/listas.service";
import { ImagenesService } from "../../services/imagenes.service";
import { TextosService } from "../../services/textos.service";
import { AlertasService } from "../../services/alertas.service";
import { ClientesService } from "src/app/services/clientes.service";
import { AuthService } from "src/app/services/auth.service";

import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-admincontacto",
  templateUrl: "./admincontacto.component.html",
})
export class AdmincontactoComponent implements OnInit {
  
  @Output() menuAdmin: EventEmitter<any> = new EventEmitter();

  editarRecursos: number = 1;
  tituloadmin = "CONTACTO"; //home
  idenlace: number; //home
  pagi: number = 1;

  constructor(
    private ro: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private alertasService: AlertasService,
    private listasService: ListasService,
    private imagenesService: ImagenesService,
    private textosService: TextosService,
    private auth: AuthService
  ) {
    let autho = this.auth.leerRol();
    if (autho == "2") {
      this.menuAdmin.emit();
    } else {
      this.router.navigateByUrl("/homecliente");
    }
  }

  ngOnInit() {
    this.idenlace = 31; //CONTACTO
  }

  vertabla(n) {
    this.pagi = 1;
    this.editarRecursos = n;
  }
}
