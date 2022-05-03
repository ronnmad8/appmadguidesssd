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
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-tablatextos",
  templateUrl: "./tablatextos.component.html",
})
export class TablatextosComponent implements OnInit {
  @Input() idenlace: number;
  @Input() pagi: number;

  Editor = ClassicEditor;

  btactivadoTextos: boolean = false;
  formaT: FormGroup;
  modalT: NgbModalRef;
  formatextos: FormGroup;
  modalOptions: NgbModalOptions;
  texto: TextosModel;
  textosadmin: TextosModel[] = [];

  textoidsel: number;
  textotextosel: string = "";
  textoobservacionessel: string = "";
  textoenlacessel: string = "";
  textoposicionsel: string = "";
  textotipotextosel: string = "";
  textodestinoenlacesel: string = "";
  tipotextos: TipotextosModel[] = [];

  idtipotexto: string;
  textofechainifiltrosel: string;
  textofechafinfiltrosel: string;
  textotipotextofiltrosel: string = "0";
  btactivadoT: boolean = false;
  esdescripcion: boolean = false;

  public loading: boolean;

  constructor(
    private ro: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private alertasService: AlertasService,
    private listasService: ListasService,
    private textosService: TextosService,
    private auth: AuthService
  ) {
    this.loading = false;

    this.texto = new TextosModel();
  }

  ngOnInit() {
    this.ro.params.subscribe((params: Params) => {
      if(params.idenlace != undefined && params.idenlace != null ){
        this.idenlace = params.idenlace;
      }
      this.Cargar();
    });
  }

  Cargar() {
    
    let arrayfechas = this.textosService.getFiltrosfechaini();
    this.textofechafinfiltrosel = arrayfechas[0];
    this.textofechainifiltrosel = arrayfechas[1];

    this.crearFormularioT();
    this.cambiosFormularioT();
    this.crearFormularioTexto();
    this.cambiosFormularioTexto();

    this.getTextosAdmin(
      this.textofechainifiltrosel,
      this.textofechafinfiltrosel,
      this.textotipotextofiltrosel
    );

    this.getTipotextosall();

    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      centered: true,
      size: "lg",
    };
  }

  getTextosAdmin(fechai: string, fechaf: string, idtipotexto: string) {
    this.loading = true;
    this.textosService
      .getTextosFiltAdmin(this.idenlace, parseInt(idtipotexto), fechai, fechaf)
      .subscribe((resp: TextosModel[]) => {
        this.textosadmin = resp;

        setTimeout(() => {
          this.loading = false;
        }, 300);
      });
  }

  getTipotextosall() {
    this.listasService.getTipotextos().subscribe((resp: TipotextosModel[]) => {
      if (resp) {
        this.tipotextos = resp;
      }
    });
  }

  passConfirmarT() {
    return (formGroup: FormGroup) => {
      const fi = formGroup.controls["textofechainifiltro"];
      const ff = formGroup.controls["textofechafinfiltro"];
      let ffi = Date.parse(fi.value);
      let fff = Date.parse(ff.value);

      this.btactivadoT = true;
      ff.setErrors({ no: false });
      if (ffi > fff) {
        this.btactivadoT = false;
        ff.setErrors({ no: true });
      }
    };
  }

  crearFormularioT() {
    this.formaT = this.fb.group(
      {
        textofechainifiltro: [
          this.textofechainifiltrosel,
          [Validators.required],
        ],
        textofechafinfiltro: [
          this.textofechafinfiltrosel,
          [Validators.required],
        ],
        textotipotextofiltro: [
          this.textotipotextofiltrosel,
          [Validators.required],
        ],
      },
      {
        validators: this.passConfirmarT(),
      }
    );
  }

  cambiosFormularioT() {
    this.formaT.valueChanges.subscribe((value) => {
      this.textofechainifiltrosel = this.formaT.get(
        "textofechainifiltro"
      ).value;
      this.textofechafinfiltrosel = this.formaT.get(
        "textofechafinfiltro"
      ).value;
      this.textotipotextofiltrosel = this.formaT.get(
        "textotipotextofiltro"
      ).value;

      if (this.formaT.status != "INVALID") {
        this.btactivadoT = true;
      }
    });
  }

  filtrarT() {
    this.getTextosAdmin(
      this.textofechainifiltrosel,
      this.textofechafinfiltrosel,
      this.textotipotextofiltrosel
    );
  }

  crearFormularioTexto() {
    this.formatextos = this.fb.group({
      textoid: [this.textoidsel, [Validators.required]],
      textotexto: [this.textotextosel, [Validators.required]],
      textoobservaciones: [this.textoobservacionessel],
    });
  }

  cambiosFormularioTexto() {
    this.formatextos.valueChanges.subscribe((value) => {
      this.textotextosel = this.formatextos.get("textotexto").value;
      this.textoobservacionessel =
        this.formatextos.get("textoobservaciones").value;
      if (this.formatextos.status != "INVALID") {
        this.btactivadoTextos = true;
      }
    });
  }

  modificartexto() {
    if (this.textoidsel != null) {
      this.texto.id = this.textoidsel;
      this.texto.texto = this.textotextosel;
      this.texto.observaciones = this.textoobservacionessel;

      this.textosService.modificarTexto(this.texto).subscribe((resp) => {
        if (resp) {
          this.modalT.dismiss();
          this.alertasService
            .alertaOK("REGISTRADO", "se ha actualizado de la lista")
            .then(
              this.getTextosAdmin(
                this.textofechainifiltrosel,
                this.textofechafinfiltrosel,
                this.textotipotextofiltrosel
              )
            );
        }
      });
    }
  }

  cerrarmodalT(content) {
    this.resetearTextos();
    this.modalT.dismiss();
  }

  resetearTextos() {
    this.textoidsel = null;

    this.texto.id = null;
    this.texto.texto = "";
    this.texto.observaciones = "";
    this.texto.posicion = "";
    this.texto.tipotexto = "";
  }

  openT(content, te: TextosModel) {
    this.btactivadoTextos = true;

    this.textoidsel = te.id;
    this.textotextosel = te.texto;
    this.textoobservacionessel = te.observaciones;
    this.textoposicionsel = te.posicion;
    this.textotipotextosel = te.tipotexto;

    this.texto.id = te.id;
    this.texto.texto = te.texto;
    this.texto.observaciones = te.observaciones;
    this.texto.destinoenlaces_id = te.destinoenlaces_id;
    this.texto.enlaces_id = te.enlaces_id;
    this.texto.posicion = te.posicion;
    this.texto.tipotexto = te.tipotexto;
    this.texto.tipotextos_id = te.tipotextos_id;
  
    this.esdescripcion = false;
    if(te.tipotextos_id == '2'){
      this.esdescripcion = true;
    }

    this.formatextos.controls["textoid"].setValue(te.id);
    this.formatextos.controls["textotexto"].setValue(te.texto);
    this.formatextos.controls["textoobservaciones"].setValue(te.observaciones);

    this.modalT = this.modalService.open(content, this.modalOptions);
  }
}
