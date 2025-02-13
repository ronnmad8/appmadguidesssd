import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, ViewChild } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd, Params  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgwWowService } from 'ngx-wow';
import { AlertasService } from '../../services/alertas.service';
import { AuthService } from '../../services/auth.service';
import { HomeService } from '../../services/home.service';
import { PoliticasService } from '../../services/politicas.service';

import { Meta, Title } from '@angular/platform-browser';
import { ProviderService } from 'src/app/services/provider.service';



@Component({
  selector: 'app-medidascovid',
  templateUrl: './medidascovid.component.html'

})


export class MedidascovidComponent implements OnInit {

  
  

  

  constructor(
      private acro : ActivatedRoute,
      private router: Router,
      private alertasService: AlertasService,
      private homeService: HomeService,
      private politicasService: PoliticasService,
      private wowService: NgwWowService,
      private auth: AuthService,
      private meta: Meta,
      private title: Title,
      private providerService: ProviderService,

  )
  {
    // this.title.setTitle( "▷ Madguides");
    // this.meta.updateTag({ name: 'description', content: 'madguides visitas guiadas en Madrid' });
    // this.meta.updateTag({ name: 'author', content: 'madguides visitas guiadas en Madrid' });
    // this.meta.updateTag({ name: 'keywords', content: '▷ Madguides ✅ visitas guiadas en Madrid' });

    
  }
  

  ngOnInit() {
    this.providerService.setThrowHiddModales(true);

    
  }


  
}

    

