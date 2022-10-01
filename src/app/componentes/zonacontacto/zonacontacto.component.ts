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

  image_message: string= "Madrid único para viajeros únicos";
  form_title: string= "Ponte en contacto con nosotros";
  form_name: string= "Nombre";
  form_email: string= "Email";
  form_message: string= "Mensaje";
  form_policy: string= "Acepto la ";
  form_link: string= "Política de privacidad";
  form_button: string= "Enviar";

  constructor(
    private homeService: HomeService,
    private fb: FormBuilder,

  ) {
    this.crearFormulario();    
    this.cambiosFormulario();
  }


  ngOnInit(): void {
    
    this.imagenzonacontacto = new ImagenesModel();
    this.imagenzonacontacto.url =  "../../assets/images/imagen-footer.jpg";
    this.imagenzonacontacto.url_movil = "";
    //imagen  zonacontacto
    
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

  getImagenBanner(bannerbottom: ImagenesModel){
    this.imagenzonacontacto = bannerbottom ;
  }


  getTextos(textos: TextosModel){
    
    
    this.image_message = textos.image.message;
    this.form_title = textos.form.title;
    this.form_name = textos.form.name;
    this.form_email = textos.form.email;
    this.form_message = textos.form.message;
    this.form_policy = textos.form.policy;
    this.form_link = textos.form.link;
    this.form_button = textos.form.button;

  } 


  
  

}
