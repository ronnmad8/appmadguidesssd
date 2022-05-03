import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';

import { ImagenesModel } from 'src/app/models/imagenes.model';
import { TextosModel } from 'src/app/models/textos.model';
import { FiltrosModel } from 'src/app/models/Filtros.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';
import { AlertasService } from '../../services/alertas.service';
import { BlogarticulosService } from '../../services/blogarticulos.service';
import { ClientesService } from '../../services/clientes.service';
import { BlogarticulosModel } from 'src/app/models/blogarticulos.model';
import { UsuarioModel } from 'src/app/models/Usuario.model';
import { ClientesModel } from 'src/app/models/Clientes.model';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html'

})


export class ContactoComponent implements OnInit{
    
  tipotextoseccion: number = 2;
  link1: string = "/";
  posiciont1: number = 1;
  titulo1: string = "Donde estamos en Madrid";
  texto1: string = "";
  idenlace: number = 31;

  textosall: TextosModel[];

  private map;

  forma: FormGroup;
  btactivado: boolean = false ;
  cliente: ClientesModel = new ClientesModel();
  imagenes :ImagenesModel[] = [];
  idtipo: number = 1;
  idtipotexto: number = 1;

  constructor(
      private ro: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      private imagenesService: ImagenesService,
      private textosService: TextosService,
      private blogarticulosService: BlogarticulosService,
      private alertasService: AlertasService,
      private clientesService: ClientesService,
      private wowService: NgwWowService,
      private activatedRoute:ActivatedRoute,
      private meta: Meta,
      private title: Title

  )
  {
    this.title.setTitle( "▷ CONTACTO PROYECTOS XANADU - proyectosxanadu.es");
    this.meta.updateTag({ name: 'description', content: ' Ven a visitarnos a nuestro showroom en Las Rozas de Madrid Si lo deseas también puedes consultarnos vía email o por teléfono ' });
    this.meta.updateTag({ name: 'keywords', content: 'Ven a visitarnos a nuestro showroom en Las Rozas de Madrid Si lo deseas también puedes consultarnos vía email o por teléfono ' });
    this.meta.updateTag({ name: 'title', content: ' ▷ Ven a visitarnos a nuestro showroom en Las Rozas de Madrid ✅ Si lo deseas también puedes consultarnos vía email o por teléfono' });
  
    this.wowService.init();

    this.crearFormulario();
    this.cambiosFormulario();

    this.getTextosall();
  }

  ngOnInit() {
    

  }

  getTextosall() {
    //// textos
    this.textosService
      .getTextosFiltnom(this.idenlace, this.tipotextoseccion )
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

  crearFormulario() {
    this.forma = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(6)]],
      nombre: [''],
      aceptacion: [ '', [Validators.requiredTrue] ],
      mensaje: ['', [Validators.required, Validators.minLength(2)]]
      
    });
  }

  cambiosFormulario() {

    ///// statuChanges
    this.forma.valueChanges.subscribe( value => {
        this.btactivado = false;
        this.cliente.nombre = this.forma.get('nombre').value ;
        this.cliente.email  = this.forma.get('email').value ;
        this.cliente.telefono = this.forma.get('telefono').value ;
        this.cliente.mensaje = this.forma.get('mensaje').value ;

        if ( this.forma.status != "INVALID") {
          this.btactivado = true ;
        }

    });
  }

  enviar() {
    if (!this.forma.invalid) {
        
          this.clientesService.enviarcontacto(this.cliente)
          .subscribe( resp => {
             if (resp) {
              this.alertasService.alertaOK("ENVÍO REALIZADO","atenderemos su solicitud en breve");
              }
              else {
                this.alertasService.alertaKO("ENVÍO NO REALIZADO","pruebe de nuevo");
              }
              setTimeout(() => {
                this.reset()
              }, 2500);
        
          },
          (err) => {
            this.alertasService.alertaKO("ENVÍO NO REALIZADO","pruebe de nuevo");
          });
        }
    }
  


 reset(){

  this.forma.get('nombre').setValue('');
  this.forma.get('email').setValue('');
  this.forma.get('telefono').setValue('');
  this.forma.get('mensaje').setValue('');
  this.forma.get('aceptacion').setValue(false);
  this.router.navigateByUrl('/homecliente');

 }
   
  


  
}

    

