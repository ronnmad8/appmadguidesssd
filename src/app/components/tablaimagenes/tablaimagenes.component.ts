import {
  Component,
  ElementRef,
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

import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-tablaimagenes",
  templateUrl: "./tablaimagenes.component.html",
})
export class TablaimagenesComponent implements OnInit {
  @Input() idenlace: number;
  @Input() pagi: number;

  btactivadoImagenes: boolean = false;
  formaI: FormGroup;

  modalI: NgbModalRef;
  formaimagenes: FormGroup;

  modalOptions: NgbModalOptions;

  imagen: ImagenesModel;
  imagenesadmin: ImagenesModel[] = [];
  imagenIsel: string;
  imagenAIsel: string;
  imagenIMsel: string;
  imagenAIMsel: string;

  imagenidsel: number;
  imagennombresel: string = "";
  imagenenlaces_idsel = null;
  imagenposicionsel: string = "";
  imagentipos_idsel: string = "";
  imagentiposel: string = "";
  imagenrutapcsel: string = "";
  imagenrutamovilsel: string = "";
  imagenobservacionessel: string = "";
  imagenenlacesel: string = "";
  imagengaleriafiltros_idsel: string = null;
  imagendestinosel: string = "";
  imagenenlaceppalsel: string = "";
  imagencreated_atsel: string = "";
  imagenfile1sel: string;
  imagenfile2sel: string;

  tipoimagenes: TiposModel[] = [];
  file1: File = null;
  file2: File = null;
  idtipoimagen: string;

  imagenfechainifiltrosel: string;
  imagenfechafinfiltrosel: string;
  imagentipoimagenfiltrosel: string = "0";
  btactivadoI: boolean = false;

  public loading: boolean = false;

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

    this.imagen = new ImagenesModel();
  }

  ngOnInit() {

    this.ro.params.subscribe((params: Params) => {
      if(params.idenlace != undefined && params.idenlace != null ){
        this.idenlace = params.idenlace;
      }
      this.Cargar();
      
    });
    
  }


  Cargar(){

    let arrayfechas = this.textosService.getFiltrosfechaini();
    this.imagenfechafinfiltrosel = arrayfechas[0];
    this.imagenfechainifiltrosel = arrayfechas[1];

    this.getImagenesAdmin(
      this.imagenfechainifiltrosel,
      this.imagenfechafinfiltrosel,
      this.imagentipoimagenfiltrosel
    );

    this.getTipoimagenesall();

    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      centered: true,
      size: "lg",
    };
    this.crearFormularioI();
    this.cambiosFormularioI();

    this.crearFormularioImagen();
    this.cambiosFormularioImagen();

    
  }


  getImagenesAdmin(fechai: string, fechaf: string, idtipoimagen: string) {
    this.loading = true;
    this.imagenesService
      .getImagenesFiltAdmin(
        this.idenlace,
        parseInt(idtipoimagen),
        fechai,
        fechaf
      )
      .subscribe((resp: ImagenesModel[]) => {
        this.imagenesadmin = resp;

        setTimeout(() => {
          this.loading = false;
        }, 300);
      });
  }

  ////listado
  getTipoimagenesall() {
    this.listasService.getTipos().subscribe((resp: TiposModel[]) => {
      if (resp) {
        this.tipoimagenes = resp;
      }
    });
  }

  passConfirmarI() {
    return (formGroup: FormGroup) => {
      const fi = formGroup.controls["imagenfechainifiltro"];
      const ff = formGroup.controls["imagenfechafinfiltro"];
      let ffi = Date.parse(fi.value);
      let fff = Date.parse(ff.value);

      this.btactivadoI = true;
      ff.setErrors({ no: false });
      if (ffi > fff) {
        this.btactivadoI = false;
        ff.setErrors({ no: true });
      }
    };
  }

  crearFormularioI() {
    this.formaI = this.fb.group(
      {
        imagenfechainifiltro: [
          this.imagenfechainifiltrosel,
          [Validators.required],
        ],
        imagenfechafinfiltro: [
          this.imagenfechafinfiltrosel,
          [Validators.required],
        ],
        imagentiposimagenfiltro: [
          this.imagentipoimagenfiltrosel,
          [Validators.required],
        ],
      },
      {
        validators: this.passConfirmarI(),
      }
    );
  }

  cambiosFormularioI() {
    this.formaI.valueChanges.subscribe((value) => {
      this.imagenfechainifiltrosel = this.formaI.get(
        "imagenfechainifiltro"
      ).value;
      this.imagenfechafinfiltrosel = this.formaI.get(
        "imagenfechafinfiltro"
      ).value;
      this.imagentipoimagenfiltrosel = this.formaI.get(
        "imagentiposimagenfiltro"
      ).value;
      if (this.formaI.status != "INVALID") {
        this.btactivadoI = true;
      }
    });
  }

  filtrarI() {
    this.getImagenesAdmin(
      this.imagenfechainifiltrosel,
      this.imagenfechafinfiltrosel,
      this.imagentipoimagenfiltrosel
    );
  }

  crearFormularioImagen() {
    this.formaimagenes = this.fb.group({
      imagenid: [this.imagenidsel, [Validators.required]],
      imagennombre: [this.imagennombresel, [Validators.required]],
      imagenobservaciones: [this.imagenobservacionessel],
      imagenI: [this.imagenfile1sel],
      imagenIM: [this.imagenfile2sel],
    });
  }

  cambiosFormularioImagen() {
    this.formaimagenes.valueChanges.subscribe((value) => {
      this.imagennombresel = this.formaimagenes.get("imagennombre").value;
      this.imagenobservacionessel = this.formaimagenes.get("imagenobservaciones").value;
      this.imagenIsel = this.formaimagenes.get("imagenI").value;
      this.imagenIMsel = this.formaimagenes.get("imagenIM").value;
      if (this.formaimagenes.status != "INVALID") {
        this.btactivadoImagenes = true;
      }
    });
  }

  modificarimagen() {
    
    if (this.imagenidsel != null) {
      this.imagen.id = this.imagenidsel;
      this.imagen.nombre = this.imagennombresel;
      this.imagen.observaciones = this.imagenobservacionessel;
      this.imagenesService
        .modificarImagen(this.imagen, this.file1, this.file2)
        .subscribe((resp) => {
          if (resp) {
            this.modalI.dismiss();
            this.alertasService
              .alertaOK("REGISTRADO", "se ha actualizado de la lista")
              .then(
                this.getImagenesAdmin(
                  this.imagenfechainifiltrosel,
                  this.imagenfechafinfiltrosel,
                  this.imagentipoimagenfiltrosel
                )
              );
          }
        });
    }
    this.resetearImagenes();
  }

  cambiarimagen1(event) {
    let fi = event.target.files[0];
    if (fi.type == "image/jpeg" || fi.type == "image/png") {
      this.file1 = fi;
      this.formaimagenes.controls["imagenI"].setValue(fi ? fi.name : "");

      this.imagenIsel = this.file1.name;

      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenAIsel = e.target.result;
        this.imagenIsel = fi.name;
      };
      reader.readAsDataURL(fi);
    }
  }

  cambiarimagen2(event) {
    let fi = event.target.files[0];
    if (fi.type == "image/jpeg" || fi.type == "image/png") {
      this.file2 = fi;
      this.formaimagenes.controls["imagenIM"].setValue(fi ? fi.name : "");

      this.imagenIMsel = this.file2.name;

      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenAIMsel = e.target.result;
        this.imagenIMsel = fi.name;
      };
      reader.readAsDataURL(fi);
    }
  }

  cerrarmodalI(content) {
    this.resetearImagenes();
    this.modalI.dismiss();
  }

  resetearImagenes() {

    this.imagen.id = null;
    this.imagen.nombre = "";
    this.imagen.posicion = "";
    this.imagen.tipo = "";
    this.imagen.rutapc = "";
    this.imagen.rutamovil = "";
    this.imagen.observaciones = "";

    this.imagenidsel = null;
    this.imagennombresel = null;
    this.imagenposicionsel = null;
    this.imagentiposel = null;
    this.imagenrutapcsel = null;
    this.imagenrutamovilsel = null;
    this.imagenobservacionessel = null;

    this.imagenIsel = "";
    this.imagenIMsel = "";
    this.imagenAIsel = "";
    this.imagenAIMsel = "";
    this.file1 = null;
    this.file2 = null;
 
    this.formaimagenes.controls["imagennombre"].setValue('');
    this.formaimagenes.controls["imagenobservaciones"].setValue('');
    this.formaimagenes.controls["imagenI"].setValue('');
    this.formaimagenes.controls["imagenIM"].setValue('');
    this.formaimagenes.controls["imagenid"].setValue(null);

  }

  filtrarenter(event) {
    var codigo = event.which || event.keyCode;
    if (codigo === 13) {
      this.filtrarI();
    }
  }

  openI(content, im: ImagenesModel) {
    this.btactivadoImagenes = true;
    this.imagenidsel = im.id;
    this.imagennombresel = im.nombre;
    this.imagenobservacionessel = im.observaciones,
    this.imagenposicionsel = im.posicion,
    this.imagentiposel = im.tipo,
    this.imagenrutapcsel = im.rutapc,
    this.imagenrutamovilsel = im.rutamovil,
    this.imagenIsel = im.rutapc != null ?  this.getNombrearchivo(im.rutapc) : "" ;
    this.imagenIMsel = im.rutamovil != null ? this.getNombrearchivo(im.rutamovil) : "";
    this.imagenAIsel = im.rutapc ;
    this.imagenAIMsel = im.rutamovil ;

    this.imagen.id = im.id;
    this.imagen.nombre = im.nombre;
    this.imagen.enlaces_id = im.enlaces_id;
    this.imagen.posicion = im.posicion;
    this.imagen.tipos_id = im.tipos_id;
    this.imagen.rutapc = im.rutapc;
    this.imagen.rutamovil = im.rutamovil;
    this.imagen.observaciones = im.observaciones;
    this.imagen.enlace = im.enlace;
    this.imagen.destino = im.destino;
    this.imagen.enlaceppal = im.enlaceppal;

    this.formaimagenes.controls["imagenid"].setValue(im.id);
    this.formaimagenes.controls["imagennombre"].setValue(im.nombre);
    this.formaimagenes.controls["imagenobservaciones"].setValue(im.observaciones);
    this.modalI = this.modalService.open(content, this.modalOptions);
  }

  getNombrearchivo(ruta: string) {
    let rutaarc = ruta.replace("https://proyectosxanadu.es/assets/images/", "");
    let arcsep = rutaarc.split("/");
    let arcname = "";
    arcsep.forEach((el) => {
      if (el.includes(".jpg") || el.includes(".png")) {
        arcname = el;
      }
    });
    return arcname;
  }

  
}
