import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';

import { UsuarioModel } from 'src/app/models/Usuario.model';
import { ClientesModel } from 'src/app/models/Clientes.model';
import { ImagenesService } from '../../services/imagenes.service';
import { TextosService } from '../../services/textos.service';
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';

import { Meta, Title } from '@angular/platform-browser';
import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
import { BannerhomeComponent } from 'src/app/componentes/bannerhome/bannerhome.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'

})


export class HomeComponent implements OnInit{

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
    
  imagenbanner: ImagenesModel;
  cliente: ClientesModel = new ClientesModel();
  imagenes :ImagenesModel[] = [];
  idenlace: number ;
  enlacedestacado: string = "";
  texto1: string = "";
  texto2: string = "";

  textosall: TextosModel[] = [];
  tiposeccion: number = 2;
  tipotextoseccion: number = 1;
  mostrarmodalbuscador: boolean = true;

  ////1
  // posiciona1: number = 1;
  // link1: string = "";
  // posiciont1: number = 1;
  // titulo1: string = "";
  // imagenlacea1: string = "";
  // imagenlaceamovil1: string = "";
  // linka1: string = "";


  constructor(
      private router: Router,
      private imagenesService: ImagenesService,
      private textosService: TextosService,
      private alertasService: AlertasService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private activatedRoute: ActivatedRoute,
      private meta: Meta,
      private title: Title

  )
  {
    this.title.setTitle( "▷ Madguides");
    this.meta.updateTag({ name: 'description', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'author', content: 'madguides visitas guiadas en Madrid' });
    this.meta.updateTag({ name: 'keywords', content: '▷ Madguides ✅ visitas guiadas en Madrid' });

    this.wowService.init();
    //ids para home
    this.idenlace = 1;
    
  }
  

  ngOnInit() {

    this.menuPublic.emit(0);

  }


  getImageneBanner(){
    
    this.imagenesService.getImagenesFilt(this.idenlace, 1).subscribe( (resp ) =>{
      this.imagenbanner = resp as ImagenesModel;
    
    })
    
  }

  scrollToElement(element: Element): void {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  

  
  


  
}

    

