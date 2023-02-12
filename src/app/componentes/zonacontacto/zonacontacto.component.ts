import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { HomeService } from '../../services/home.service';
import { MailService } from '../../services/mail.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { MessagesModel } from 'src/app/models/Messages.model';
import { MessagesImageModel } from 'src/app/models/MessagesImage.model';
import { MessagesFormModel } from 'src/app/models/MessageseForm.model';



@Component({
  selector: 'app-zonacontacto',
  templateUrl: './zonacontacto.component.html'
})
export class ZonacontactoComponent implements OnInit {

  @Input() enlace: string = "";
  @Input() messageFormData: MessagesFormModel = new MessagesFormModel();
  @Input() messageImageData: MessagesImageModel = new MessagesImageModel();
  @Input() bannerbottomData: ImagenesModel = new ImagenesModel;
  
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
