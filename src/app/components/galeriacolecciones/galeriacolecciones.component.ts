import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { ImagenesService } from 'src/app/services/imagenes.service';
import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { TextosService } from '../../services/textos.service';
import { ArticulocoleccionesModel } from 'src/app/models/articulocolecciones.model';
import { ArticulocoleccionesService } from '../../services/articulocolecciones.service';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-galeriacolecciones',
  templateUrl: './galeriacolecciones.component.html'
})
export class GaleriacoleccionesComponent implements OnInit {
  
  @Input() articulos: ArticulocoleccionesModel[] = [];
  @Input() idenlace: number;
  @Input() idcoleccion: number;

  hidarticulo:any = {};
  modal: NgbModalRef;
  modalOptions: NgbModalOptions;
  modalOptionsZoom: NgbModalOptions;
  desple: number = null;
  inic: number;
  acabadosarticulo = [];

  articuloscol: ArticulocoleccionesModel[] = [];

  constructor(
    private ro: ActivatedRoute,
      private router: Router,
      private imagenesService: ImagenesService,
      private textosService: TextosService,
      private articulocoleccionesService: ArticulocoleccionesService,
      private wowService: NgwWowService,
      private modalprovice: NgbModal,
  ) { 
    this.wowService.init();
  }

  ngOnInit() {
   
    this.getArticuloscol();


    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: false,
      windowClass : "myCustomModalClass"
    }
    this.modalOptionsZoom = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: true,
      windowClass : "myCustomModalClassAcabados"
    }

  }


  openmodal( content, ev) {
    this.hidarticulo = [];
    this.inic = (ev.posicion);
    this.modal = this.modalprovice.open(content, this.modalOptions);
  }


  openmodalzoom( content, ev, lista) {

    lista.forEach( (el, index) => {
      if(el.id == ev.id ){
        this.inic = index;
      }
    });
    this.acabadosarticulo = lista;
    this.modal = this.modalprovice.open(content, this.modalOptionsZoom);
  }


  cerrarmodal(){
    this.modal.dismiss();
  }


  hidart(n){

    if(n != this.desple && this.desple != null){
      this.hidarticulo = [];
    }
    this.hidarticulo[n] = !this.hidarticulo[n] ;
    this.desple = n;
  }


  getArticuloscol(){
  
    this.articulocoleccionesService.getarticulocoleccionesGallery(this.idcoleccion)
    .subscribe( (resp : ArticulocoleccionesModel[]) => {
       if(resp != undefined){
    
         if(resp != undefined){
           this.articuloscol = resp ;

           this.articuloscol.forEach( (el)=>{
             el.articulosacabados1 = el.acabados.filter(x=>x.acabadocategorias_id == 1);
             el.articulosacabados2 = el.acabados.filter(x=>x.acabadocategorias_id == 2);
             el.articulosacabados3 = el.acabados.filter(x=>x.acabadocategorias_id == 3);
           }) ; 
         }  
      }
    });
  }


}
