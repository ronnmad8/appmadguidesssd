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
import { AcabadosModel } from "src/app/models/acabados.model";
import { AcabadoscategoriasModel } from "src/app/models/acabadoscategorias.model";
import { TextosModel } from "src/app/models/textos.model";
import { TipotextosModel } from "src/app/models/tipotextos.model";
import { TiposModel } from "src/app/models/tipos.model";
import { ListasService } from "../../services/listas.service";
import { AcabadosService } from "../../services/acabados.service";
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
  selector: "app-tablaacabados",
  templateUrl: "./tablaacabados.component.html",
})
export class TablaacabadosComponent implements OnInit {
  @Input() idenlace: number;
  @Input() pagi: number;

  @ViewChild('mymodaladminS', null) myModal;

  btactivadoAcabados: boolean = false;
  formagaleriaI: FormGroup;

  modalI: NgbModalRef;
  formaacabados: FormGroup;

  modalOptions: NgbModalOptions;

  acabado: AcabadosModel;
  acabadosadmin: AcabadosModel[] = [];
  acabadoIsel: string;
  acabadoAIsel: string;

  acabadoidsel: number = 0;
  acabadonombresel: string = "";
  acabadoenlaces_idsel = null;
  acabadorutaimagensel: string = "";
  acabadocategorias_idsel: number = null;
  
  acabadoenlacesel: string = "";
  acabadofile1sel: string;
  
  acabadocreated_atsel: string = "";

  categoriaacabados: AcabadoscategoriasModel[] = [];
  file1: File = null;
  rutabase: string = "";

  acabadofechainifiltrosel: string;
  acabadofechafinfiltrosel: string;
  acabadonombrefiltrosel: string = "";
  btactivadoI: boolean = false;

  public loading: boolean;

  constructor(
    private ro: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private alertasService: AlertasService,
    private listasService: ListasService,
    private acabadosService: AcabadosService,
    private textosService: TextosService,
    private auth: AuthService,
    private enlacesService: EnlacesService
  ) {
    this.loading = false;

    this.acabado = new AcabadosModel();
  }

  ngOnInit() {
    this.ro.params.subscribe((params: Params) => {
      if (params.idenlace != undefined && params.idenlace != null) {
        this.idenlace = params.idenlace;
      }
      if (this.idenlace != undefined) {
          this.Cargar();
      }
    });

    this.crearFormularioI();
    this.cambiosFormularioI();

    this.crearFormularioAcabado();
    this.cambiosFormularioAcabados();
  }

  Cargar() {

    this.getRutabase(this.idenlace);

    let arrayfechas = this.textosService.getFiltrosfechaini();
    this.acabadofechafinfiltrosel = arrayfechas[0];
    this.acabadofechainifiltrosel = arrayfechas[1];

    this.getAcabadosAdmin(
      this.acabadofechainifiltrosel,
      this.acabadofechafinfiltrosel,
      this.acabadonombrefiltrosel
    );

    this.getCategoriasall();

    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      centered: true,
      size: "lg",
    };
    
  }

  getRutabase(idenlace: number) {
    this.enlacesService
      .getRutabase(idenlace)
      .subscribe((resp: EnlacesModel) => {
        if (resp != undefined) {
          this.rutabase = resp.rutabase;
        }
      });
  }

  getAcabadosAdmin(
    fechai: string,
    fechaf: string,
    nombre: string
  ) {
    this.loading = true;
    this.acabadosService
      .getAcabadosFiltAdmin(
        this.idenlace,
        nombre,
        fechai,
        fechaf
      )
      .subscribe((resp: AcabadosModel[]) => {
        this.acabadosadmin = resp;

        setTimeout(() => {
          this.loading = false;
        }, 300);
      });
  }

  ////listado
  getCategoriasall() {

    this.listasService.getAcabadoscategorias().subscribe((resp: AcabadoscategoriasModel[]) => {
      if (resp) {
        this.categoriaacabados = resp;
      }
    });
  }

  passConfirmarI() {
    return (formGroup: FormGroup) => {
      const fi = formGroup.controls["acabadofechainifiltro"];
      const ff = formGroup.controls["acabadofechafinfiltro"];
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
        acabadofechainifiltro: [
          this.acabadofechainifiltrosel,
          [Validators.required],
        ],
        acabadofechafinfiltro: [
          this.acabadofechafinfiltrosel,
          [Validators.required],
        ],
        acabadonombrefiltro: [
          this.acabadonombrefiltrosel
        ],
      },
      {
        validators: this.passConfirmarI(),
      }
    );
  }

  cambiosFormularioI() {
    this.formagaleriaI.valueChanges.subscribe((value) => {
      this.acabadofechainifiltrosel = this.formagaleriaI.get(
        "acabadofechainifiltro"
      ).value;
      this.acabadofechafinfiltrosel = this.formagaleriaI.get(
        "acabadofechafinfiltro"
      ).value;
      this.acabadonombrefiltrosel = this.formagaleriaI.get(
        "acabadonombrefiltro"
      ).value;
      if (this.formagaleriaI.status != "INVALID") {
        this.btactivadoI = true;
      }
    });
  }

  filtrarG() {
    
    this.getAcabadosAdmin(
      this.acabadofechainifiltrosel,
      this.acabadofechafinfiltrosel,
      this.acabadonombrefiltrosel
    );
  }

  crearFormularioAcabado() {
    this.formaacabados = this.fb.group({
      acabadoid: [this.acabadoidsel, [Validators.required]],
      acabadonombre: [this.acabadonombresel, [Validators.required]],
      acabadoI: [this.acabadofile1sel],
      acabadocategorias_id: [this.acabadocategorias_idsel]
    });
  }

  cambiosFormularioAcabados() {
    this.formaacabados.valueChanges.subscribe((value) => {
      this.acabadonombresel = this.formaacabados.get("acabadonombre").value;
      this.acabadocategorias_idsel = this.formaacabados.get("acabadocategorias_id").value;
      this.acabadoIsel = this.formaacabados.get("acabadoI").value;
 

      if (this.formaacabados.status != "INVALID") {
        this.btactivadoAcabados = true;
      }
    });
  }


  nuevoacabado() {

    this.acabado.enlaces_id = this.idenlace;
    this.acabado.rutabase = this.rutabase ;
    
    this.acabadosService
      .crearAcabado(this.acabado)
      .subscribe((resp: AcabadosModel) => {
        if (resp != undefined) {
          let acabado: AcabadosModel = resp ;
          acabado.nombre = "";
          acabado.acabadocategorias_id = 0;
          acabado.rutaimagen = "";

          if(this.myModal != undefined && acabado != undefined){
            this.openM(this.myModal,  acabado );
          }
        }
      });
}


  gestionaracabado() {
    if (this.acabadoidsel != null) {
      this.acabado.id = this.acabadoidsel;
      this.acabado.nombre = this.acabadonombresel;
      this.acabado.acabadocategorias_id = this.acabadocategorias_idsel;
      this.acabado.enlaces_id = this.idenlace;
      this.acabado.rutabase = this.rutabase;

      if (this.acabado.id != 0) {
        this.acabadosService
          .modificarAcabados(this.acabado, this.file1)
          .subscribe((resp) => {
            if (resp != undefined) {
              this.modalI.dismiss();
              this.alertasService
                .alertaOK("REGISTRADO", "se ha actualizado de la lista")
                .then(
                  this.getAcabadosAdmin(
                    this.acabadofechainifiltrosel,
                    this.acabadofechafinfiltrosel,
                    this.acabadonombrefiltrosel
                  )
                );
            }
          });
      } 
    }
    this.resetearAcabados();
  }



  cambiarimagen1(event) {
    let fi = event.target.files[0];
    if (fi.type == "image/jpeg" || fi.type == "image/png") {
      this.file1 = fi;
      this.formaacabados.controls["acabadoI"].setValue(fi ? fi.name : "");

      this.acabadoIsel = this.file1.name;

      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.acabadoAIsel = e.target.result;
        this.acabadoIsel = fi.name;
      };
      reader.readAsDataURL(fi);
    }
  }


  
  cerrarmodalI(content) {
    this.resetearAcabados();
    this.getAcabadosAdmin(
      this.acabadofechainifiltrosel,
      this.acabadofechafinfiltrosel,
      this.acabadonombrefiltrosel);
    this.modalI.dismiss();
  }

 
  resetearAcabados() {
    this.acabado.id = 0;
    this.acabado.nombre = "";

    this.acabadoidsel = 0;
    this.acabadonombresel = null;
    this.acabadocategorias_idsel = 0;
    this.acabadoIsel = "";
    this.acabadoAIsel = "";
    this.file1 = null;

    this.formaacabados.controls["acabadonombre"].setValue("");
    this.formaacabados.controls["acabadoI"].setValue("");
    this.formaacabados.controls["acabadoid"].setValue(0);
    this.formaacabados.controls["acabadocategorias_id"].setValue(0);
  }

  filtrarenter(event) {
    var codigo = event.which || event.keyCode;
    if (codigo === 13) {
      this.filtrarG();
    }
  }

  openM(content, ac: AcabadosModel) {
    this.resetearAcabados();
    
    this.btactivadoAcabados = true;
    this.acabadoidsel = ac.id;
    this.acabadonombresel = ac.nombre;
    this.acabadocategorias_idsel = ac.acabadocategorias_id;  
    this.acabadoIsel = ac.rutaimagen != null ?  this.getNombrearchivo(ac.rutaimagen) : "" ;
    this.acabadoAIsel = ac.rutaimagen;

    this.acabado.id = ac.id;
    this.acabado.nombre = ac.nombre;
    this.acabado.enlaces_id = ac.enlaces_id;
    this.acabado.acabadocategorias_id = ac.acabadocategorias_id;
    this.acabado.rutaimagen = ac.rutaimagen;

    this.formaacabados.controls["acabadoid"].setValue(ac.id);
    this.formaacabados.controls["acabadonombre"].setValue(ac.nombre);
    this.formaacabados.controls["acabadocategorias_id"].setValue(ac.acabadocategorias_id);
  
    this.modalI = this.modalService.open(content, this.modalOptions);
  }

  deleteacabado(ac) {
    this.alertasService
      .alertaWarning("¿DESEA ELIMINAR?", "se eliminará de la lista")
      .then((resp) => {
        if (resp.value) {
          this.acabadosService
            .deleteAcabado(ac.id)
            .subscribe((resp) => {
              if (resp != undefined) {
                this.getAcabadosAdmin(
                  this.acabadofechainifiltrosel,
                  this.acabadofechafinfiltrosel,
                  this.acabadonombrefiltrosel
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
