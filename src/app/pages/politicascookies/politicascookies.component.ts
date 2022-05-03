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


@Component({
  selector: 'app-politicascookies.',
  templateUrl: './politicascookies.component.html'

})


export class PoliticascookiesComponent implements OnInit{
    
  texto: string = "";
  titulo1: string = "POLITICAS DE COOKIES";
  idenlace: number = 87;

  constructor(
      private ro: ActivatedRoute,
      private router: Router,
      
      private wowService: NgwWowService,
      private activatedRoute:ActivatedRoute

  )
  {
  
    this.wowService.init();


  }

  ngOnInit() {
    

  }

  scrollToElement(element: Element): void {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  


 
   
  


  
}

    

