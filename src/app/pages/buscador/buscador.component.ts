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



@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html'

})


export class BuscadorComponent implements OnInit{

  @Output() menuPublic: EventEmitter<any> = new EventEmitter();
    
  

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
    // this.title.setTitle( "▷ Madguides");
    // this.meta.updateTag({ name: 'description', content: 'madguides visitas guiadas en Madrid' });
    // this.meta.updateTag({ name: 'author', content: 'madguides visitas guiadas en Madrid' });
    // this.meta.updateTag({ name: 'keywords', content: '▷ Madguides ✅ visitas guiadas en Madrid' });




  }
  

  ngOnInit() {

    //this.menuPublic.emit(0);

  }


  

  
  


 
   
  


  
}

    

