import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { HomeService } from '../../services/home.service';
import { MailService } from '../../services/mail.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";

import { TextContentsModel } from 'src/app/models/TextContents.model';



@Component({
  selector: 'app-zonacontacto',
  templateUrl: './zonacontacto.component.html'
})
export class ZonacontactoComponent implements OnInit {

  @Input() enlace: string = "";
  @Input() textconts: TextContentsModel = new TextContentsModel();

  
  show: boolean = true;
  forma: FormGroup;
  btactivadoT: boolean = false;
  nombresel: string = "";
  emailsel: string = "";
  mensajesel: string = "";
  image_message: string= "";


  constructor(
    private homeService: HomeService,
    private mailService: MailService,
    private fb: FormBuilder,

  ) {
    this.crearFormulario();    
    this.cambiosFormulario();
  }


  ngOnInit(): void {
  
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

  enviarMail(){
    this.mailService.sendMail(this.nombresel, this.emailsel, this.mensajesel).subscribe((resp)=>{
      console.log(resp);
    });
    this.forma.reset();
  }


}
