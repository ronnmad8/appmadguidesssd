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
import { Router, ActivatedRoute, Params } from "@angular/router";
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
import { EnlacesService } from "src/app/services/enlaces.service";

import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { EnlacesModel } from "src/app/models/enlaces.model";

@Component({
  selector: "app-admintipo1",
  templateUrl: "./admintipo1.component.html",
})
export class Admintipo1Component implements OnInit {
  @Output() menuAdmin: EventEmitter<any> = new EventEmitter();

  editarRecursos: number = 1;
  tituloadmin = "_"; //tipo1
  idenlace: number; //tipo1
  pagi: number = 1;

  constructor(
    private ro: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private auth: AuthService,
    private enlacesService: EnlacesService
  ) {
    let autho = this.auth.leerRol();
    if (autho == "2") {
      this.menuAdmin.emit();
    } else {
      this.router.navigateByUrl("/homecliente");
    }

    


  }

  ngOnInit() {
     
    this.ro.params.subscribe(
      (params: Params) => {
        this.idenlace = params.idenlace ;
        this.getTitulo();
      }
    );
     
  }

  async getTitulo(){
    let resp = await  this.enlacesService.getTituloadmin(this.idenlace).toPromise().then() as EnlacesModel;
    this.tituloadmin = resp.nombre;
    
  }

  vertabla(n) {
    this.pagi = 1;
    this.editarRecursos = n;
  }


}
