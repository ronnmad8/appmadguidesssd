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
import { ArticulocoleccionesModel } from "src/app/models/articulocolecciones.model";
import { TextosModel } from "src/app/models/textos.model";
import { TipotextosModel } from "src/app/models/tipotextos.model";
import { TiposModel } from "src/app/models/tipos.model";
import { AcabadosModel } from "src/app/models/acabados.model";
import { AcabadoscoleccionesModel } from "src/app/models/acabadoscolecciones.model";
import { ImagenesModel } from "src/app/models/imagenes.model";
import { ListasService } from "../../services/listas.service";
import { ArticulocoleccionesService } from "../../services/articulocolecciones.service";
import { AcabadosService } from "../../services/acabados.service";
import { TextosService } from "../../services/textos.service";
import { ImagenesService } from "../../services/imagenes.service";
import { AlertasService } from "../../services/alertas.service";
import { ClientesService } from "src/app/services/clientes.service";
import { AuthService } from "src/app/services/auth.service";
import { EnlacesService } from "src/app/services/enlaces.service";


import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { ifStmt } from "@angular/compiler/src/output/output_ast";
import { EnlacesModel } from "src/app/models/enlaces.model";

@Component({
  selector: "app-tablaarticulos",
  templateUrl: "./tablaarticulos.component.html",
})
export class TablaarticulosComponent implements OnInit {

  @Input() idenlace: number;
  @Input() coleccionenlace: string;
  @Input() pagi: number;

  @ViewChild('mymodaladminAr', null) myModal;

  idcoleccion: number;
  bactivadoArticulo: boolean = false;
  formaA: FormGroup;

  modalAr: NgbModalRef;
  formaarticulos: FormGroup;

  modalOptions: NgbModalOptions;

  rutaimagencolecciones: string =
    "https://proyectosxanadu.es/assets/colecciones/";
  rutaimagenfinal: string;
  articulo: ArticulocoleccionesModel;
  articulosadmin: ArticulocoleccionesModel[] = [];
  imagenIsel: string;
  imagenAIsel: string;
  imagenIMsel: string;
  imagenAIMsel: string;

  acabados1: AcabadosModel[] = [];
  acabados2: AcabadosModel[] = [];
  acabados3: AcabadosModel[] = [];
  acabados: AcabadosModel[] = [];
  acabadostouch: string = "false";

  articuloidsel: number;
  articulocoleccionsel: string;
  articulonombresel: string = "";
  articulocolecciones_idsel = null;
  articuloposicionsel: string = "";
  articulopreciosel: string = "";
  articulodimensionessel: string = "";
  articulorutaimagensel: string = "";
  articuloacabados1sel: string = "";
  articuloacabados2sel: string = "";
  articuloacabados3sel: string = "";

  acabados1sel: AcabadosModel[] = [];
  acabados2sel: AcabadosModel[] = [];
  acabados3sel: AcabadosModel[] = [];

  file1: File = null;
  file2: File = null;
  rutabase: string = "";

  articulofechainifiltrosel: string;
  articulofechafinfiltrosel: string;
  articulonombrefiltrosel: string = "";

  btactivadoI: boolean = false;
  btactivadoArticulo: boolean = false;

  public loading: boolean;

  constructor(
    private ro: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private alertasService: AlertasService,
    private listasService: ListasService,
    private articulosService: ArticulocoleccionesService,
    private acabadosService: AcabadosService,
    private auth: AuthService,
    private enlacesService: EnlacesService,
    private textosService: TextosService
  ) {
    this.loading = false;
    this.articulo = new ArticulocoleccionesModel();
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

    this.getRutabase(this.idenlace);

    let arrayfechas = this.textosService.getFiltrosfechaini();
    this.articulofechafinfiltrosel = arrayfechas[0];
    this.articulofechainifiltrosel = arrayfechas[1];

    this.crearFormularioI();
    this.cambiosFormularioI();

    this.crearFormularioArticulo();
    this.cambiosFormularioArticulo();

    this.enlacesService.getIdColeccion(this.idenlace).subscribe( (resp: EnlacesModel)=>{
      if(resp != undefined){
        this.idcoleccion = resp.idcoleccion;
        this.getArticulosAdmin(
          this.articulofechainifiltrosel,
          this.articulofechafinfiltrosel,
          this.articulonombrefiltrosel
        );
      }
    });

    this.getAcabadosEnlace();

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


  removeacabado(id, pos) {
    this.acabadostouch = "true";
    let ele: AcabadosModel;

    switch(pos){
      case 1:
        if(this.acabados1sel != null && this.acabados1 != null ){

          this.acabados1sel.forEach((el) => {
            if (el.id == id) {
              ele = el;
            }
          });

          this.acabados1.forEach((el) => {
            if (el.id == id) {
              el.active = false;
            }
          });
          this.acabados1.map((x) => x.id == id);
          this.acabados1sel = this.acabados1sel.filter((x) => x.id != ele.id);

        }

        break;
      case 2:
        if(this.acabados2sel != null && this.acabados2 != null ){

        this.acabados2sel.forEach((el) => {
          if (el.id == id) {
            ele = el;
          }
        });
        this.acabados2.forEach((el) => {
          if (el.id == id) {
            el.active = false;
          }
        });
        this.acabados2.map((x) => x.id == id);
        this.acabados2sel = this.acabados2sel.filter((x) => x.id != ele.id);
      
        }
        break;
      case 3:
        if(this.acabados3sel != null && this.acabados3 != null ){

        this.acabados3sel.forEach((el) => {
          if (el.id == id) {
            ele = el;
          }
        });
        this.acabados3.forEach((el) => {
          if (el.id == id) {
            el.active = false;
          }
        });
        this.acabados3.map((x) => x.id == id);
        this.acabados3sel = this.acabados3sel.filter((x) => x.id != ele.id);
        break;
      
        }

    }
  }



  addacabado(id, pos) {
    
    this.acabadostouch = "true";
    var ele: AcabadosModel;
    this.acabados.forEach((el, inde) => {
      if (el.id == id) {
        ele = el;
        el.active = true;
      }

    });
    
    switch(pos){
      case 1:
        if(this.acabados1sel != null){
          this.acabados1sel.push(ele);
        }
        this.acabados1.forEach((el) => {
          if (el.id == id) {
            el.active = true;
          }
        });
        break;
      case 2:
        if(this.acabados2sel != null){
          this.acabados2sel.push(ele);
        }
        this.acabados2.forEach((el) => {
          if (el.id == id) {
            el.active = true;
          }
        });
        break;
      case 3:
        if(this.acabados3sel != null){
          this.acabados3sel.push(ele);
        }
        this.acabados3.forEach((el) => {
          if (el.id == id) {
            el.active = true;
          }
        });
        break;
    }
   
  }

  getArticulosAdmin(fechai: string, fechaf: string, nombre: string) {
    this.loading = true;
    this.acabadosService
      .getAcabadosEnlace(this.idenlace)
      .subscribe((resp: AcabadosModel[]) => {
        if (resp) {
          this.acabados = resp;
        }

        this.articulosService
          .getarticulocoleccionesFiltadmin(
            this.idcoleccion,
            nombre,
            fechai,
            fechaf
          )
          .subscribe(async (resp: ArticulocoleccionesModel[]) => {
            this.articulosadmin = resp;
            this.articulosadmin.forEach((el: ArticulocoleccionesModel) => {
        
              if (el.acabados.length > 0) {
                el.articulosacabados1 = [];
                el.articulosacabados2 = [];
                el.articulosacabados3 = [];
                el.acabados.forEach((it) => {
                   let ite =  it.acabadocategorias_id.toString();
                   switch(ite){
                     case "1":
                       el.articulosacabados1.push(it);
                       break;
                     case "2":
                       el.articulosacabados2.push(it);
                       break;
                     case "3":
                       el.articulosacabados3.push(it);
                       break;
                   }
                });
              }
            });

            setTimeout(() => {
              this.loading = false;
            }, 300);
          });
      });
  }

  
  getAcabadosEnlace() {
    
    this.acabadosService
      .getAcabadosEnlace(this.idenlace)
      .subscribe((resp: AcabadosModel[]) => {
  
        if (resp != undefined) {
    
          this.acabados = resp;
          this.acabados.forEach((el) => {
            if (el.acabadocategorias_id == 1) {
              this.acabados1.push(el);
            }
            if (el.acabadocategorias_id == 2) {
              this.acabados2.push(el);
            }
            if (el.acabadocategorias_id == 3) {
              this.acabados3.push(el);
            }
          });
        }

      });
  }

  passConfirmarI() {
    return (formGroup: FormGroup) => {
      const fi = formGroup.controls["articulofechainifiltro"];
      const ff = formGroup.controls["articulofechafinfiltro"];
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
    this.formaA = this.fb.group(
      {
        articulofechainifiltro: [
          this.articulofechainifiltrosel,
          [Validators.required],
        ],
        articulofechafinfiltro: [
          this.articulofechafinfiltrosel,
          [Validators.required],
        ],
        articulonombrefiltro: [
          this.articulonombrefiltrosel,
          [Validators.required],
        ],
      },
      {
        validators: this.passConfirmarI(),
      }
    );
  }

  cambiosFormularioI() {
    this.formaA.valueChanges.subscribe((value) => {
      this.articulofechainifiltrosel = this.formaA.get(
        "articulofechainifiltro"
      ).value;
      this.articulofechafinfiltrosel = this.formaA.get(
        "articulofechafinfiltro"
      ).value;
      this.articulonombrefiltrosel = this.formaA.get(
        "articulonombrefiltro"
      ).value;
      if (this.formaA.status != "INVALID") {
        this.btactivadoI = true;
      }
    });
  }

  filtrarAr() {
    this.getArticulosAdmin(
      this.articulofechainifiltrosel,
      this.articulofechafinfiltrosel,
      this.articulonombrefiltrosel
    );
  }

  crearFormularioArticulo() {
    this.formaarticulos = this.fb.group({
      articuloid: [this.articuloidsel, [Validators.required]],
      articulonombre: [this.articulonombresel, [Validators.required]],
      articulodimensiones: [this.articulodimensionessel, [Validators.required]],
      articuloprecio: [this.articulopreciosel, [Validators.required]],
      articulorutaimagen: [this.articulorutaimagensel],
      imagenI: [this.imagenIsel],
    });
  }

  cambiosFormularioArticulo() {
    this.formaarticulos.valueChanges.subscribe((value) => {
      this.articulonombresel = this.formaarticulos.get("articulonombre").value;
      this.articulopreciosel = this.formaarticulos.get("articuloprecio").value;
      this.articulodimensionessel = this.formaarticulos.get(
        "articulodimensiones"
      ).value;
      this.articulorutaimagensel =
        this.formaarticulos.get("articulorutaimagen").value;
      this.imagenIsel = this.formaarticulos.get("imagenI").value;

      if (this.formaarticulos.status != "INVALID") {
        this.bactivadoArticulo = true;
      }
    });
  }

  creararticulo() {
   
    this.articulo.colecciones_id = this.idcoleccion;
    this.articulo.rutabase = this.rutabase;

    this.articulosService
      .crearArticulocolecciones(this.articulo)
      .subscribe((resp: ArticulocoleccionesModel) => {
        if (resp != undefined) {
          let articulo: ArticulocoleccionesModel = resp ;
          articulo.nombre = "";
          articulo.dimensiones = "";
          articulo.precio = "";
          articulo.rutaimagen = "";

          if(this.myModal != undefined && articulo != undefined){
            this.openA(this.myModal,  articulo );
          }
        }
      });
  }

  gestionararticulo() {

    if (this.articuloidsel != null) {
      this.articulo.id = this.articuloidsel;
      this.articulo.nombre = this.articulonombresel;
      this.articulo.dimensiones = this.articulodimensionessel;
      this.articulo.precio = this.articulopreciosel;
      this.articulo.articulosacabados1 = this.acabados1sel;
      this.articulo.articulosacabados2 = this.acabados2sel;
      this.articulo.articulosacabados3 = this.acabados3sel;
      this.articulo.acabadostouch = this.acabadostouch;
      this.articulo.rutabase = this.rutabase;

      if (this.articulo.id != 0) {
      this.articulosService
        .modificararticulo(this.articulo, this.file1)
        .subscribe((resp) => {
            if (resp != undefined) {
            this.modalAr.dismiss();
            this.alertasService
              .alertaOK("REGISTRADO", "se ha actualizado de la lista")
              .then(
                this.getArticulosAdmin(
                  this.articulofechainifiltrosel,
                  this.articulofechafinfiltrosel,
                  this.articulonombrefiltrosel
                )
              );
            }
        
        });
      }
    }
    this.resetearArticulos();
  }

  cambiarimagen1(event) {
    let fi = event.target.files[0];
    if (fi.type == "image/jpeg" || fi.type == "image/png") {
      this.file1 = fi;
      this.formaarticulos.controls["imagenI"].setValue(fi ? fi.name : "");

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
      this.formaarticulos.controls["imagenI"].setValue(fi ? fi.name : "");

      this.imagenIMsel = this.file1.name;

      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenAIMsel = e.target.result;
        this.imagenIMsel = fi.name;
      };
      reader.readAsDataURL(fi);
    }
  }

  cerrarmodalAr(content) {
    this.resetearArticulos();
    this.modalAr.dismiss();
  }


  resetearArticulos() {
    this.acabados1sel = [];
    this.acabados2sel = [];
    this.acabados3sel = [];
    this.acabados1.forEach((el) => {
      el.active = false;
    });
    this.acabados2.forEach((el) => {
      el.active = false;
    });
    this.acabados3.forEach((el) => {
      el.active = false;
    });

    this.articuloidsel = null;
    this.articulo.id = null;
    this.articulo.nombre = "";
    this.articulo.posicion = "";
    this.articulo.precio = "";
    this.articulo.rutaimagen = "";
    this.articulo.dimensiones = "";
    this.articulo.articulosacabados1 = [];
    this.articulo.articulosacabados2 = [];
    this.articulo.articulosacabados3 = [];
    this.articulo.rutaimagen = "";

    this.articuloidsel = 0;
    this.articulonombresel = null;
    this.articuloacabados1sel = "";
    this.articuloacabados2sel = "";
    this.articuloacabados3sel = "";

    this.articulocoleccionsel = null;
    this.articulodimensionessel = null;
    this.articulorutaimagensel = null;

    this.imagenIsel = "";
    this.imagenAIsel = "";
    this.file1 = null;

    this.formaarticulos.controls["articuloid"].setValue("");
    this.formaarticulos.controls["articulonombre"].setValue("");
    this.formaarticulos.controls["articuloprecio"].setValue("");
    this.formaarticulos.controls["articulodimensiones"].setValue("");
    this.formaarticulos.controls["articulorutaimagen"].setValue("");
  }

  filtrarenter(event) {
    var codigo = event.which || event.keyCode;
    if (codigo === 13) {
      this.filtrarAr();
    }
  }

  openA(content, ar: ArticulocoleccionesModel) {
    this.resetearArticulos();

    this.acabadostouch = "false";
    this.bactivadoArticulo = true;
    this.articuloidsel = ar.id;
    this.articulonombresel = ar.nombre;
    this.articuloposicionsel = ar.posicion;
    this.articulocolecciones_idsel = ar.colecciones_id;
    this.articulorutaimagensel = ar.rutaimagen;
    this.articulopreciosel = ar.precio;
    this.articulocoleccionsel = ar.coleccion;
    this.articulodimensionessel = ar.dimensiones;
    this.articulorutaimagensel = ar.rutaimagen;
    this.imagenIsel =  ar.rutaimagen != null ?   this.getNombrearchivo(ar.rutaimagen) : ""  ;
    this.imagenAIsel = ar.rutaimagen;

    if (ar.articulosacabados1 != null) {
      this.acabados1sel = ar.articulosacabados1;
    }
    if (ar.articulosacabados2 != null) {
      this.acabados2sel = ar.articulosacabados2;
    }
    if (ar.articulosacabados3 != null) {
      this.acabados3sel = ar.articulosacabados3;
    }
    if(this.acabados1 != null && this.acabados1sel != null ){
      this.acabados1.forEach((el) => {
        el.active = false;
        this.acabados1sel.forEach((it) => {
          if (it.id == el.id) {
            el.active = true;
          }
        });
      });
    }
    if(this.acabados2 != null && this.acabados2sel != null ){
    this.acabados2.forEach((el) => {
      el.active = false;
      this.acabados2sel.forEach((it) => {
        if (it.id == el.id) {
          el.active = true;
        }
      });
    });
    }
    if(this.acabados3 != null && this.acabados3sel != null ){
    this.acabados3.forEach((el) => {
      el.active = false;
      this.acabados3sel.forEach((it) => {
        if (it.id == el.id) {
          el.active = true;
        }
      });
    });
    }

  
    this.articulo.id = ar.id;
    this.articulo.nombre = ar.nombre;
    this.articulo.colecciones_id = ar.colecciones_id;
    this.articulo.posicion = ar.posicion;
    this.articulo.precio = ar.precio;
    this.articulo.rutaimagen = ar.rutaimagen;
    this.articulo.articulosacabados1 = ar.articulosacabados1;
    this.articulo.articulosacabados2 = ar.articulosacabados2;
    this.articulo.articulosacabados3 = ar.articulosacabados3;

    this.formaarticulos.controls["articuloid"].setValue(ar.id);
    this.formaarticulos.controls["articulonombre"].setValue(ar.nombre);
    this.formaarticulos.controls["articuloprecio"].setValue(ar.precio);
    this.formaarticulos.controls["articulodimensiones"].setValue(
      ar.dimensiones
    );
    this.formaarticulos.controls["articulorutaimagen"].setValue(ar.rutaimagen);

    this.modalAr = this.modalService.open(content, this.modalOptions);
  }

  deletearticulo(ac) {
    this.alertasService
      .alertaWarning("¿DESEA ELIMINAR?", "se eliminará de la lista")
      .then((resp) => {
        if (resp.value) {
          this.articulosService
            .deletearticulo(ac.id)
            .subscribe((resp) => {
              if (resp != undefined) {
                this.getArticulosAdmin(
                  this.articulofechainifiltrosel,
                  this.articulofechafinfiltrosel,
                  this.articulonombrefiltrosel
                );
              }
            });
        }
      });
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
