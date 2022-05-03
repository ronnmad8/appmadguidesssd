import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { BrowserStack } from 'protractor/built/driverProviders';
import { ImagenesModel } from 'src/app/models/imagenes.model';
import { ImagenesService } from '../../services/imagenes.service';

@Component({
  selector: 'app-triple',
  templateUrl: './triple.component.html'
})
export class TripleComponent implements OnInit {

  @Input() enlace: number;
  @Input() tipo: number;


  public imagenapc;
  public imagenamovil;
  public imagenbpc;
  public imagenbmovil;
  public imagencpc;
  public imagencmovil;
  public imagenes = [];

  constructor(
    private imagenesService: ImagenesService
  ) { }

  ngOnInit() {

    this.getImagenes();
 


  }

  getImagenes(){
    this.imagenesService.getImagenesFilt(this.enlace , this.tipo )
    .subscribe( (resp :ImagenesModel[]) => {
        this.imagenes = resp;
        if(this.imagenes != null){
        this.imagenes.forEach( (el) =>{
            
          switch(el.posicion){
              case "1": 
                this.imagenapc = el.rutapc ;
                this.imagenamovil = el.rutamovil ;
                break;
              case "2": 
                this.imagenbpc = el.rutapc ;
                this.imagenbmovil = el.rutamovil ;
                break;
              case "3": 
                this.imagencpc = el.rutapc ;
                this.imagencmovil = el.rutamovil ;
                break;
          }

        })
        }
    });
  }

  cambiartriple(n){
     let aux1 = "";
     let aux2 = "";
     if(n==1){
       aux1 = this.imagenbpc ;
       aux2 = this.imagenapc ;
       this.imagenapc = aux1;
       this.imagenbpc = aux2;
     }
     if(n==2){
       aux1 = this.imagencpc ;
       aux2 = this.imagenapc ;
       this.imagenapc = aux1;
       this.imagencpc = aux2;
     }
  }

}
