import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { HomeService } from '../../services/home.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";



@Component({
  selector: 'app-zonacontacto',
  templateUrl: './zonacontacto.component.html'
})
export class ZonacontactoComponent implements OnInit {

  @Input() enlace: string = "";

  show: boolean = true;
  textozonacontacto :TextosModel = new TextosModel() ;
  imagenzonacontacto: ImagenesModel = new ImagenesModel();
  
  forma: FormGroup;
  btactivadoT: boolean = false;
  nombresel: string = "";
  emailsel: string = "";
  mensajesel: string = "";

  constructor(
    private homeService: HomeService,
    private fb: FormBuilder,

  ) {
    this.crearFormulario();    
    this.cambiosFormulario();
  }


  ngOnInit(): void {
    
    this.imagenzonacontacto = new ImagenesModel();
    this.imagenzonacontacto.rutapc = "";
    this.imagenzonacontacto.rutamovil = "";
    //imagen  zonacontacto
    this.getImagenBanner(this.enlace);
  }


  crearFormulario() {
    this.forma = this.fb.group(
      {
        nombre: [ '',[Validators.required,Validators.minLength(2)]],
        email: [ '',[Validators.required, Validators.email]],
        mensaje: [ '',[Validators.required,Validators.minLength(2)]],
        aceptacion: [ '',[Validators.required,Validators.requiredTrue ]],
      }
    );
  }

  cambiosFormulario() {
    this.forma.valueChanges.subscribe((value) => {
      this.nombresel = this.forma.get('nombre')?.value;
      this.emailsel = this.forma.get('email')?.value;
      this.mensajesel = this.forma.get("mensaje")?.value;
      this.btactivadoT = false;
      if (this.forma.status != "INVALID") {
        this.btactivadoT = true;
      }
    });
  }

  getImagenBanner(idenlace: string){

    let tipotexto = 1;//tipo titulo ppal
    let resp = this.homeService.getImagenZonacontactoHome();
       if(resp != null){
         this.imagenzonacontacto = resp as ImagenesModel ;
       }
  
  }


  

  
  

}
