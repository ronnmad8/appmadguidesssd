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
import { BlogarticulosModel } from "src/app/models/blogarticulos.model";
import { CategoriasModel } from "src/app/models/categorias.model";
import { TextosModel } from "src/app/models/textos.model";
import { TipotextosModel } from "src/app/models/tipotextos.model";
import { TiposModel } from "src/app/models/tipos.model";
import { ListasService } from "../../services/listas.service";
import { BlogarticulosService } from "../../services/blogarticulos.service";
import { TextosService } from "../../services/textos.service";
import { AlertasService } from "../../services/alertas.service";
import { AuthService } from "src/app/services/auth.service";
import { EnlacesService } from "src/app/services/enlaces.service";


import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { EnlacesModel } from "src/app/models/enlaces.model";

@Component({
  selector: "app-tablablogarticulos",
  templateUrl: "./tablablogarticulos.component.html",
})
export class TablablogarticulosComponent implements OnInit {

  @Input() pagi: number;
  @Input() idenlace: number;

  @ViewChild('mymodaladminS', null) myModal;

  btactivado: boolean = false;
  formagaleriaI: FormGroup;
  rutaimagenblogarticulos: string =
  "https://proyectosxanadu.es/assets/blog/";
  modalI: NgbModalRef;
  formablogarticulos: FormGroup;

  modalOptions: NgbModalOptions;

  blogarticulo: BlogarticulosModel = new BlogarticulosModel();
  blogarticulosadmin: BlogarticulosModel[] = [];
  
  imagenIsel: string;
  imagenAIsel: string;
  imagenIMsel: string;
  imagenAIMsel: string;

  idsel: number = 0;
  titulosel: string = "";
  subtitulosel: string = "";
  textosel: string = "";
  subtextosel: string = "";
  categoriaidsel: string = "";
  metasel: string = "";
  altimagensel: string = "";
  
  categoriablogarticulos: CategoriasModel[] = [];
  file1: File = null;
  file2: File = null;
  rutabase: string = "";

  blogarticulofechainifiltrosel: string;
  blogarticulofechafinfiltrosel: string;
  blogarticulocategoriaidfiltrosel: string = "";
  blogarticulonombrefiltrosel: string = "";

  btactivadoI: boolean = false;

  loading: boolean = false;

  constructor(
    private ro: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private alertasService: AlertasService,
    private listasService: ListasService,
    private blogarticulosService: BlogarticulosService,
    private auth: AuthService,
    private textosService: TextosService,
    private enlacesService: EnlacesService
  ) {
    
    this.blogarticulo = new BlogarticulosModel();
  }

  ngOnInit() {
  
    this.Cargar();

    this.crearFormularioI();
    this.cambiosFormularioI();

    this.crearFormularioblogarticulo();
    this.cambiosFormularioblogarticulos();
  }

  Cargar() {

    let arrayfechas = this.textosService.getFiltrosfechaini();
    this.blogarticulofechafinfiltrosel = arrayfechas[0];
    this.blogarticulofechainifiltrosel = arrayfechas[1];

    this.getblogarticulosAdmin(
      this.blogarticulonombrefiltrosel,
      this.blogarticulocategoriaidfiltrosel,
      this.blogarticulofechainifiltrosel,
      this.blogarticulofechafinfiltrosel,
    );

    this.getCategoriasall();

    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      centered: true,
      size: "lg",
    };
    
  }

  
  getblogarticulosAdmin(
    nombre: string,
    idcategoria: string,
    fechai: string,
    fechaf: string,
  ) {
    
    this.blogarticulosService
      .getblogarticulosFiltadmin(
        nombre,
        idcategoria,
        fechai,
        fechaf
      )
      .subscribe((resp: BlogarticulosModel[]) => {
        if(resp != undefined){
          this.blogarticulosadmin = resp;
        }


      });
  }

  
  ////listado
  getCategoriasall() {

    this.listasService.getCategorias().subscribe((resp: CategoriasModel[]) => {
      if (resp != undefined) {
        this.categoriablogarticulos = resp;
      }

    });
  }

  passConfirmarI() {
    return (formGroup: FormGroup) => {
      const fi = formGroup.controls["blogarticulofechainifiltro"];
      const ff = formGroup.controls["blogarticulofechafinfiltro"];
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
        blogarticulofechainifiltro: [
          this.blogarticulofechainifiltrosel,
          [Validators.required],
        ],
        blogarticulofechafinfiltro: [
          this.blogarticulofechafinfiltrosel,
          [Validators.required],
        ],
        blogarticulocategoriaidfiltro: [
          this.blogarticulocategoriaidfiltrosel
        ],
        blogarticulonombrefiltro: [
          this.blogarticulonombrefiltrosel
        ],
      },
      {
        validators: this.passConfirmarI(),
      }
    );
  }

  cambiosFormularioI() {
    this.formagaleriaI.valueChanges.subscribe((value) => {
      this.blogarticulofechainifiltrosel = this.formagaleriaI.get(
        "blogarticulofechainifiltro"
      ).value;
      this.blogarticulofechafinfiltrosel = this.formagaleriaI.get(
        "blogarticulofechafinfiltro"
      ).value;
      this.blogarticulocategoriaidfiltrosel = this.formagaleriaI.get(
        "blogarticulocategoriaidfiltro"
      ).value;
      this.blogarticulonombrefiltrosel = this.formagaleriaI.get(
        "blogarticulonombrefiltro"
      ).value;
      if (this.formagaleriaI.status != "INVALID") {
        this.btactivadoI = true;
      }
    });
  }

  filtrarG() {
    
    this.getblogarticulosAdmin(
      this.blogarticulonombrefiltrosel,
      this.blogarticulocategoriaidfiltrosel,
      this.blogarticulofechainifiltrosel,
      this.blogarticulofechafinfiltrosel
    );
  }

  crearFormularioblogarticulo() {
    this.formablogarticulos = this.fb.group({
      id: [this.idsel, [Validators.required]],
      categoriaid: [this.categoriaidsel, [Validators.required]],
      titulo: [this.titulosel, [Validators.required]],
      subtitulo: [this.subtitulosel],
      texto: [this.textosel, [Validators.required]],
      subtexto: [this.subtextosel],
      meta: [this.metasel],
      altimagen: [this.altimagensel],
      
      imagenI: [this.imagenIsel],
      imagenIM: [this.imagenIMsel],
      
    });
  }

  cambiosFormularioblogarticulos() {
    this.formablogarticulos.valueChanges.subscribe((value) => {
      
      this.idsel = this.formablogarticulos.get("id").value;
      this.categoriaidsel = this.formablogarticulos.get("categoriaid").value;
      this.titulosel = this.formablogarticulos.get("titulo").value;
      this.subtitulosel = this.formablogarticulos.get("subtitulo").value;
      this.textosel = this.formablogarticulos.get("texto").value;
      this.subtextosel = this.formablogarticulos.get("subtexto").value;
      this.metasel = this.formablogarticulos.get("meta").value;
      this.altimagensel = this.formablogarticulos.get("altimagen").value;
      this.imagenIsel = this.formablogarticulos.get("imagenI").value;

      this.imagenIsel = this.formablogarticulos.get("imagenI").value;
      //this.imagenIMsel = this.formablogarticulos.get("imagenIM").value;
 
      if (this.formablogarticulos.status != "INVALID") {
        this.btactivado = true;
      }
    });
  }


  nuevoblogarticulo() {

    this.blogarticulosService.crearBlogArticulo()
      .subscribe((resp: BlogarticulosModel) => {
        if (resp != undefined) {
          let blogarti: BlogarticulosModel = resp ;

          if(this.myModal != undefined && blogarti != undefined){
            this.openM(this.myModal, blogarti );
          }
        }
      });
  }


  gestionarblogarticulo() {
    if (this.idsel != null) {
      this.blogarticulo.id = this.idsel;
      this.blogarticulo.titulo = this.titulosel;
      this.blogarticulo.subtitulo = this.subtitulosel;
      this.blogarticulo.texto = this.textosel;
      this.blogarticulo.subtexto = this.subtextosel;
      this.blogarticulo.categorias_id = this.categoriaidsel;
      this.blogarticulo.altimagen = this.altimagensel;
      this.blogarticulo.meta = this.metasel;
      
      if (this.blogarticulo.id != 0) {
        this.blogarticulosService.modificarBlogarticulo(this.blogarticulo, this.file1, this.file2)
          .subscribe((resp) => {
        
            if (resp != undefined) {
              this.modalI.dismiss();
              this.alertasService
                .alertaOK("REGISTRADO", "se ha actualizado de la lista")
                .then(
                  this.getblogarticulosAdmin(
                    this.blogarticulonombrefiltrosel,
                    this.blogarticulocategoriaidfiltrosel,
                    this.blogarticulofechainifiltrosel,
                    this.blogarticulofechafinfiltrosel,
                  )
                );
            }
            else{
              this.modalI.dismiss();
              this.resetearblogarticulos();
            }
          });
      } 
    }
    this.resetearblogarticulos();
  }


  open(){
    if(this.myModal != undefined && this.blogarticulo != null){
      this.openM(this.myModal,  this.blogarticulo );
    }
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


  cambiarimagen1(event) {
    let fi = event.target.files[0];
    if (fi.type == "image/jpeg" || fi.type == "image/png") {
      this.file1 = fi;
      this.formablogarticulos.controls["imagenI"].setValue(fi ? fi.name : "");
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
      this.formablogarticulos.controls["imagenIM"].setValue(fi ? fi.name : "");
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
    this.resetearblogarticulos();
    this.getblogarticulosAdmin(
      this.blogarticulonombrefiltrosel,
      this.blogarticulocategoriaidfiltrosel,
      this.blogarticulofechainifiltrosel,
      this.blogarticulofechafinfiltrosel
    );

    this.modalI.dismiss();
  }

 
  resetearblogarticulos() {

    this.blogarticulo.id = 0;
    this.blogarticulo.titulo = "";
    this.blogarticulo.subtitulo = "";
    this.blogarticulo.texto = "";
    this.blogarticulo.subtexto = "";
    this.blogarticulo.categorias_id = "";
    this.blogarticulo.altimagen = "";
    this.blogarticulo.meta = "";

    this.idsel = 0;
    this.titulosel = "";
    this.subtitulosel = "";
    this.textosel = "";
    this.subtextosel = "";
    this.categoriaidsel = "";
    this.altimagensel = "";
    this.metasel = "";

    this.imagenIsel = "";
    this.imagenAIsel = "";
    this.imagenIMsel = "";
    this.imagenAIMsel = "";
    this.file1 = null;
    this.file2 = null;

    this.formablogarticulos.controls["id"].setValue(0);
    this.formablogarticulos.controls["titulo"].setValue("");
    this.formablogarticulos.controls["subtitulo"].setValue("");
    this.formablogarticulos.controls["texto"].setValue("");
    this.formablogarticulos.controls["subtexto"].setValue("");
    this.formablogarticulos.controls["meta"].setValue(0);
    this.formablogarticulos.controls["altimagen"].setValue(0);
    this.formablogarticulos.controls["categoriaid"].setValue(0);
    
    // this.formablogarticulos.controls["imagenI"].setValue("");
    // this.formablogarticulos.controls["imagenIM"].setValue("");
  }

  filtrarenter(event) {
    var codigo = event.which || event.keyCode;
    if (codigo === 13) {
      this.filtrarG();
    }
  }

  openM(content, ac: BlogarticulosModel) {
   
    this.resetearblogarticulos();
    this.btactivado = true;
    
    this.idsel = ac.id;
    this.metasel = ac.meta;
    this.altimagensel = ac.altimagen;
    this.categoriaidsel = ac.categorias_id;
    this.titulosel = ac.titulo;
    this.textosel = ac.texto;
    this.subtitulosel = ac.subtitulo;
    this.subtextosel = ac.subtexto;
    
    this.imagenIsel = ac.rutaimagen != null ?  this.getNombrearchivo(ac.rutaimagen) : "" ;
    this.imagenAIsel = ac.rutaimagen;
    this.imagenIMsel = ac.rutaimagenmovil != null ?  this.getNombrearchivo(ac.rutaimagenmovil) : "" ;
    this.imagenAIMsel = ac.rutaimagenmovil;
    
    this.blogarticulo.id = ac.id;
    this.blogarticulo.meta = ac.meta;
    this.blogarticulo.altimagen = ac.altimagen;  
    this.blogarticulo.categorias_id = ac.categorias_id;  
    this.blogarticulo.titulo = ac.titulo; 
    this.blogarticulo.subtitulo = ac.subtitulo; 
    this.blogarticulo.texto = ac.texto; 
    this.blogarticulo.subtexto = ac.subtexto;
    
    this.formablogarticulos.controls["id"].setValue(ac.id);
    this.formablogarticulos.controls["meta"].setValue(ac.meta);
    this.formablogarticulos.controls["altimagen"].setValue(ac.altimagen);
    this.formablogarticulos.controls["categoriaid"].setValue(ac.categorias_id);
    this.formablogarticulos.controls["titulo"].setValue(ac.titulo);
    this.formablogarticulos.controls["subtitulo"].setValue(ac.subtitulo);
    this.formablogarticulos.controls["texto"].setValue(ac.texto);
    this.formablogarticulos.controls["subtexto"].setValue(ac.subtexto);
  
    this.modalI = this.modalService.open(content, this.modalOptions);
  }

  deleteblogarticulo(ac) {
    this.alertasService
      .alertaWarning("¿DESEA ELIMINAR?", "se eliminará de la lista")
      .then((resp) => {
        if (resp.value) {
          this.blogarticulosService.deleteBlogarticulo(ac.id)
            .subscribe((resp) => {
              if (resp != undefined) {
                this.getblogarticulosAdmin(
                  this.blogarticulonombrefiltrosel,
                  this.blogarticulocategoriaidfiltrosel,
                  this.blogarticulofechainifiltrosel,
                  this.blogarticulofechafinfiltrosel,
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
