import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { ImagenesModel } from 'src/app/models/imagenes.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosModel } from 'src/app/models/textos.model';
import { TextosService } from '../../services/textos.service';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-galeria3',
  templateUrl: './galeria3.component.html'
})


export class Galeria3Component implements OnInit{
    
  modal: NgbModalRef;
  modalOptions: NgbModalOptions;

  inic: number;
  imagenesgallery:ImagenesModel[] = [];

  idenlace: number = 9;
  idtipo: number = 5;
  idtipotexto: number = 7;
  public cargados: boolean = false;


  constructor(
      private ro: ActivatedRoute,
      private router: Router,
      private imagenesService: ImagenesService,
      private textosService: TextosService,
      private wowService: NgwWowService,
      private modalprovice: NgbModal,
  )
  {
  
    this.wowService.init();

  }

  ngOnInit() {
    
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      centered: false,
      windowClass : "myCustomModalClass"
    }

    this.getImagenes();

  }

  getImagenes(){
    this.imagenesService.getImagenesFilt(this.idenlace , this.idtipo)
    .subscribe( (resp :ImagenesModel[]) => {
       if(resp){
 
         this.imagenesgallery = resp 
         this.cargados = true;
         
       }
    });
  }

  scrollToElement(element: Element): void {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  openmodal( content, ev) {
   
    this.inic = ev.id;
    this.modal = this.modalprovice.open(content, this.modalOptions);

  }

  cerrarmodal(){
    this.modal.dismiss();
  }
  


 
   
  


  
}

    

