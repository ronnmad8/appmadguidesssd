import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { BrowserStack } from 'protractor/built/driverProviders';
import { ImagenesModel } from 'src/app/models/imagenes.model';
import { ImagenesService } from '../../services/imagenes.service';

@Component({
  selector: 'app-proyecsd',
  templateUrl: './proyecsd.component.html'
})
export class ProyecsdComponent implements OnInit {

  @Input() enlace: number;
  @Input() tipo: number;
  @Input() texto: number;
  @Input() link: number;
  @Input() titulo: number;
  @Input() posicion: number;


  @Input() imagenapc;
  @Input() imagenamovil;
  @Input() imagenbpc;
  @Input() imagenbmovil;

  imagenes = [];
  
  constructor(
    private imagenesService: ImagenesService
  ) { }

  ngOnInit() {

    //this.getImagenes();
 
  }

  // getImagenes(){
  //   debugger
  //   this.imagenesService.getImagenesFiltpos(this.enlace , this.tipo, this.posicion)
  //   .subscribe( (resp :ImagenesModel[]) => {
  //       this.imagenes = resp;
    
  //       if(this.imagenes != null){
  //       this.imagenes.forEach( (el) =>{
            
  //         switch(el.posicion){
  //             case "1": 
  //               this.imagenapc = el.rutapc ;
  //               this.imagenamovil = el.rutamovil ;
  //               break;
  //             case "2": 
  //               this.imagenbpc = el.rutapc ;
  //               this.imagenbmovil = el.rutamovil ;
  //               break;
  //         }
  //       })
  //       console.log(this.imagenapc);
  //       console.log(this.imagenamovil);
  //       console.log(this.imagenbpc);
  //       console.log(this.imagenbmovil);
  //     }
  //   });
  // }


  cambiardoble(){
     let aux1 = "";
     let aux2 = "";
    
     aux1 = this.imagenbpc ;
     aux2 = this.imagenapc ;
     this.imagenapc = aux1;
     this.imagenbpc = aux2;

  }

}
