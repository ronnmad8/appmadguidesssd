import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import Swal from 'sweetalert2/dist/sweetalert2.js';
//import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';
import { ListasService } from '../../services/listas.service';
import { AlertasService } from '../../services/alertas.service';
import { TextosService } from '../../services/textos.service';
import { BlogarticulosService } from '../../services/blogarticulos.service';
import { TextosModel } from 'src/app/models/textos.model';
import { BlogarticulosModel } from 'src/app/models/blogarticulos.model';

@Component({
  selector: 'app-blogdetalle',
  templateUrl: './blogdetalle.component.html'
})
export class BlogdetalleComponent implements OnInit {

  idenlace: number = 88;
  idblog: number;
  idtipo: number = 5;
  idtipotexto: number = 2;
  texto1: string = "";
  posiciont1: number = 1;
  titulo1: string = "NUESTRO BLOG"; //NUESTRO BLOG
  idcategoria: number = 0;
  textosall: TextosModel[];
  articulo: BlogarticulosModel = new BlogarticulosModel();
  titulo: string = "";

  constructor(
      private ro: ActivatedRoute,
      private router: Router,
      private listasService: ListasService,
      private alertasService: AlertasService,
      private wowService: NgwWowService,
      private textosService: TextosService,
      private blogarticulosService: BlogarticulosService
  )
  {
    
     this.wowService.init();
     this.getTextosall();
  }

  ngOnInit() {
    this.ro.params.subscribe(
      (params: Params) => {
  
        this.idblog = params.id ;
        this.cargarimagen(Number(params.id));
      }
    );
    
  }

  cargarimagen(id){
    ////imagen
    this.blogarticulosService.getBlogarticulo(id)
    .subscribe( (resp :BlogarticulosModel) => {
        if(resp != undefined){
          this.articulo = resp;
        }
    });
  }


  setCategoria(n: number){
    this.idcategoria = n ;
  }
  

  getTextosall() {
    
    //// textos
    this.textosService
      .getTextosFiltnom(this.idenlace, 2)
      .subscribe((resp: TextosModel[]) => {
        this.textosall = resp;

        this.textosall.forEach((el) => {
          switch (el.posicion) {
            case "1":
              this.texto1 = el.texto;
              break;

          }
        });
      });
  }

  scrollToElement(element: Element): void {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  
  

  








}

    

