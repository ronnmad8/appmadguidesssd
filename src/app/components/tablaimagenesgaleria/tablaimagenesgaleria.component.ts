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
import { ImagenesgaleriaModel } from "src/app/models/imagenesgaleria.model";
import { TextosModel } from "src/app/models/textos.model";
import { TipotextosModel } from "src/app/models/tipotextos.model";
import { TiposModel } from "src/app/models/tipos.model";
import { ListasService } from "../../services/listas.service";
import { ImagenesgaleriaService } from "../../services/imagenesgaleria.service";
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
  selector: "app-tablaimagenesgaleria",
  templateUrl: "./tablaimagenesgaleria.component.html",
})
export class TablaimagenesgaleriaComponent implements OnInit {
  @Input() idenlace: number;
  @Input() pagi: number;

  @ViewChild('mymodaladminG', null) myModal;

  btactivadoImagenes: boolean = false;
  formagaleriaI: FormGroup;

  modalI: NgbModalRef;
  formaimagenesgaleria: FormGroup;

  modalOptions: NgbModalOptions;

  imagen: ImagenesgaleriaModel;
  imagenesadmin: ImagenesgaleriaModel[] = [];
  imagenIsel: string;
  imagenAIsel: string;
  imagenIMsel: string;
  imagenAIMsel: string;

  imagenidsel: number = 0;
  imagennombresel: string = "";
  imagenenlaces_idsel = null;
  imagenposicionsel: string = "";
  imagentipos_idsel: string = "";
  imagentiposel: string = "";
  imagenrutapcsel: string = "";
  imagenrutamovilsel: string = "";
  imagenobservacionessel: string = "";
  imagendescripcionsel: string = "";
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
  idtipoimagen: string = "5"; //galeria
  rutabase: string = "";

  imagenfechainifiltrosel: string;
  imagenfechafinfiltrosel: string;
  imagennombrefiltrosel: string = "";
  btactivadoI: boolean = false;

  public loading: boolean = false;

  constructor(
    private ro: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private alertasService: AlertasService,
    private listasService: ListasService,
    private imagenesgaleriaService: ImagenesgaleriaService,
    private textosService: TextosService,
    private auth: AuthService,
    private enlacesService: EnlacesService
  ) {

    this.imagen = new ImagenesgaleriaModel();
  }

  ngOnInit() {
    this.ro.params.subscribe((params: Params) => {
      if (params.idenlace != undefined && params.idenlace != null) {
        this.idenlace = params.idenlace;
      }
      if (this.idenlace != undefined) {
        this.getRutabase(this.idenlace);
      }
      this.Cargar();
    });
  }

  Cargar() {
    let arrayfechas = this.textosService.getFiltrosfechaini();
    this.imagenfechafinfiltrosel = arrayfechas[0];
    this.imagenfechainifiltrosel = arrayfechas[1];

    this.getImagenesgaleriaAdmin(
      this.imagenfechainifiltrosel,
      this.imagenfechafinfiltrosel,
      this.imagennombrefiltrosel
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

  getRutabase(idenlace: number) {
    this.loading = true;
    this.enlacesService
      .getRutabase(idenlace)
      .subscribe((resp: EnlacesModel) => {
        if (resp != undefined) {
          this.rutabase = resp.rutabase;
        }
        setTimeout(() => {
          this.loading = false;
        }, 300);
      });
  }

  getImagenesgaleriaAdmin(
    fechai: string,
    fechaf: string,
    nombre: string
  ) {
    this.loading = true;
    this.imagenesgaleriaService
      .getImagenesgaleriaFiltAdmin(
        this.idenlace,
        nombre,
        fechai,
        fechaf
      )
      .subscribe((resp: ImagenesgaleriaModel[]) => {
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
    this.formagaleriaI = this.fb.group(
      {
        imagenfechainifiltro: [
          this.imagenfechainifiltrosel,
          [Validators.required],
        ],
        imagenfechafinfiltro: [
          this.imagenfechafinfiltrosel,
          [Validators.required],
        ],
        imagennombrefiltro: [
          this.imagennombrefiltrosel
        ],
      },
      {
        validators: this.passConfirmarI(),
      }
    );
  }

  cambiosFormularioI() {
    this.formagaleriaI.valueChanges.subscribe((value) => {
      this.imagenfechainifiltrosel = this.formagaleriaI.get(
        "imagenfechainifiltro"
      ).value;
      this.imagenfechafinfiltrosel = this.formagaleriaI.get(
        "imagenfechafinfiltro"
      ).value;
      this.imagennombrefiltrosel = this.formagaleriaI.get(
        "imagennombrefiltro"
      ).value;
      if (this.formagaleriaI.status != "INVALID") {
        this.btactivadoI = true;
      }
    });
  }

  filtrarG() {
    
    this.getImagenesgaleriaAdmin(
      this.imagenfechainifiltrosel,
      this.imagenfechafinfiltrosel,
      this.imagennombrefiltrosel
    );
  }

  crearFormularioImagen() {
    this.formaimagenesgaleria = this.fb.group({
      imagenid: [this.imagenidsel, [Validators.required]],
      imagennombre: [this.imagennombresel, [Validators.required]],
      imagenobservaciones: [this.imagenobservacionessel],
      imagendescripcion: [this.imagendescripcionsel],
      imagenI: [this.imagenfile1sel],
      imagenIM: [this.imagenfile2sel],
    });
  }

  cambiosFormularioImagen() {
    this.formaimagenesgaleria.valueChanges.subscribe((value) => {
      this.imagennombresel =
        this.formaimagenesgaleria.get("imagennombre").value;
      this.imagenobservacionessel = this.formaimagenesgaleria.get(
        "imagenobservaciones"
      ).value;
      this.imagendescripcionsel = this.formaimagenesgaleria.get(
        "imagendescripcion"
      ).value;
      this.imagenIsel = this.formaimagenesgaleria.get("imagenI").value;
      this.imagenIMsel = this.formaimagenesgaleria.get("imagenIM").value;
      if (this.formaimagenesgaleria.status != "INVALID") {
        this.btactivadoImagenes = true;
      }
    });
  }


  nuevaimagengaleria() {
    this.imagen.enlaces_id = this.idenlace.toString();
    this.imagen.tipos_id = this.idtipoimagen;
    this.imagen.rutabase = this.rutabase ;

    this.imagenesgaleriaService
      .crearImagengaleria(this.imagen)
      .subscribe((resp: ImagenesgaleriaModel) => {
        if (resp != undefined) {
          let imagen: ImagenesgaleriaModel = resp ;
          if(this.myModal != undefined && imagen != undefined){
            this.openM(this.myModal,  imagen );
          }
        }
      });
}


  gestionarimagengaleria() {
    if (this.imagenidsel != null) {
      this.imagen.id = this.imagenidsel;
      this.imagen.nombre = this.imagennombresel;
      this.imagen.observaciones = this.imagenobservacionessel;
      this.imagen.descripcion = this.imagendescripcionsel;
      this.imagen.tipos_id = this.idtipoimagen;
      this.imagen.enlaces_id = this.idenlace.toString();
      this.imagen.rutabase = this.rutabase;

      if (this.imagen.id != 0) {
        this.loading = true;
        this.imagenesgaleriaService
          .modificarImagengaleria(this.imagen, this.file1, this.file2)
          .subscribe((resp) => {
            if (resp != undefined) {
              this.modalI.dismiss();
              this.alertasService
                .alertaOK("REGISTRADO", "se ha actualizado de la lista")
                .then(
                  this.getImagenesgaleriaAdmin(
                    this.imagenfechainifiltrosel,
                    this.imagenfechafinfiltrosel,
                    this.imagennombrefiltrosel
                  )
                );
            }
            setTimeout(() => {
              this.loading = false;
            }, 300);
          });
      } 
      
    }
    this.resetearImagenes();
  }



  cambiarimagen1(event) {
    let fi = event.target.files[0];
    if (fi.type == "image/jpeg" || fi.type == "image/png") {
      this.file1 = fi;
      this.formaimagenesgaleria.controls["imagenI"].setValue(fi ? fi.name : "");

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
      this.formaimagenesgaleria.controls["imagenIM"].setValue(
        fi ? fi.name : ""
      );

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
    this.getImagenesgaleriaAdmin(
      this.imagenfechainifiltrosel,
      this.imagenfechafinfiltrosel,
      this.imagennombrefiltrosel);
    this.modalI.dismiss();
  }

  
  resetearImagenes() {
    this.imagen.id = 0;
    this.imagen.nombre = "";
    this.imagen.posicion = "";
    this.imagen.tipo = "";
    this.imagen.rutapc = "";
    this.imagen.rutamovil = "";
    this.imagen.observaciones = "";
    this.imagen.descripcion = "";

    this.imagenidsel = 0;
    this.imagennombresel = null;
    this.imagenposicionsel = null;
    this.imagentiposel = null;
    this.imagenrutapcsel = null;
    this.imagenrutamovilsel = null;
    this.imagenobservacionessel = null;
    this.imagendescripcionsel = null;

    this.imagenIsel = "";
    this.imagenIMsel = "";
    this.imagenAIsel = "";
    this.imagenAIMsel = "";
    this.file1 = null;
    this.file2 = null;

    this.formaimagenesgaleria.controls["imagennombre"].setValue("");
    this.formaimagenesgaleria.controls["imagenobservaciones"].setValue("");
    this.formaimagenesgaleria.controls["imagendescripcion"].setValue("");
    this.formaimagenesgaleria.controls["imagenI"].setValue("");
    this.formaimagenesgaleria.controls["imagenIM"].setValue("");
    this.formaimagenesgaleria.controls["imagenid"].setValue(0);
  }

  filtrarenter(event) {
    var codigo = event.which || event.keyCode;
    if (codigo === 13) {
      this.filtrarG();
    }
  }

  openM(content, im: ImagenesgaleriaModel) {
    
    this.resetearImagenes();

    this.btactivadoImagenes = true;
    this.imagenidsel = im.id;
    this.imagennombresel = im.nombre;
    this.imagenobservacionessel = im.observaciones,
    this.imagendescripcionsel = im.descripcion,
    this.imagenposicionsel = im.posicion,
    this.imagentiposel = im.tipo,
    this.imagenrutapcsel = im.rutapc,
    this.imagenrutamovilsel = im.rutamovil,
    this.imagenIsel = im.rutapc != null ?  this.getNombrearchivo(im.rutapc) : "" ;
    this.imagenIMsel = im.rutamovil != null ?  this.getNombrearchivo(im.rutamovil) : "" ;
    this.imagenAIsel = im.rutapc;
    this.imagenAIMsel = im.rutamovil;

    this.imagen.id = im.id;
    this.imagen.nombre = im.nombre;
    this.imagen.enlaces_id = im.enlaces_id;
    this.imagen.posicion = im.posicion;
    this.imagen.tipos_id = im.tipos_id;
    this.imagen.rutapc = im.rutapc;
    this.imagen.rutamovil = im.rutamovil;
    this.imagen.observaciones = im.observaciones;
    this.imagen.descripcion = im.descripcion;
    this.imagen.enlace = im.enlace;
    this.imagen.destino = im.destino;
    this.imagen.enlaceppal = im.enlaceppal;

    this.formaimagenesgaleria.controls["imagenid"].setValue(im.id);
    this.formaimagenesgaleria.controls["imagennombre"].setValue(im.nombre);
    this.formaimagenesgaleria.controls["imagenobservaciones"].setValue(
      im.observaciones
    );
    this.formaimagenesgaleria.controls["imagendescripcion"].setValue(
      im.descripcion
    );
  
    this.modalI = this.modalService.open(content, this.modalOptions);
  }

  deleteimagen(im) {
    
    this.alertasService
      .alertaWarning("¿DESEA ELIMINAR?", "se eliminará de la lista")
      .then((resp) => {
        if (resp.value) {
          this.imagenesgaleriaService
            .deleteImagengaleria(im.id)
            .subscribe((resp) => {
              if (resp != undefined) {
                this.getImagenesgaleriaAdmin(
                  this.imagenfechainifiltrosel,
                  this.imagenfechafinfiltrosel,
                  this.imagennombrefiltrosel
                );
              }
            });
        }
      });
  }

  getNombrearchivo(ruta: string) {
    let arcname = "";
    if (ruta != undefined && ruta != null) {
      let rutaarc = ruta.replace(
        "https://proyectosxanadu.es/assets/images/",
        ""
      );
      let arcsep = rutaarc.split("/");
      arcsep.forEach((el) => {
        if (el.includes(".jpg") || el.includes(".png")) {
          arcname = el;
        }
      });
      return arcname;
    }
  }



}
