import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HomeService } from '../../services/home.service';
import { VisitasModel } from 'src/app/models/Visitas.model';
import { SwiperModule, SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';
import { VisitaService } from 'src/app/services/visita.service';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { MessagesModel } from 'src/app/models/Messages.model';
import { VisitaAssetsModel } from 'src/app/models/VisitaAssets.model';


@Component({
  selector: 'app-slidervisitasinteresar',
  templateUrl: './slidervisitasinteresar.component.html'
})
export class SlidervisitasinteresarComponent implements OnInit, AfterViewInit {
 
  @Input() messageData: VisitaAssetsModel = new  VisitaAssetsModel();
  @Input() relatedData: VisitasResultadoModel[] = [];

  public show: boolean = true;
  public cargados: boolean = false;
 
  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private visitaService: VisitaService,
  ) 
  {  
      this.wowService.init(); 
  }


  ngOnInit(): void {    
    
  }

  ngAfterViewInit() {
    
  }


  vertodascategoria(){
    let category_uuid = this.relatedData[0].category_lang_uuid;
    this.router.navigate(['/buscador/category', category_uuid]);
  }

  verdetalle(visita: VisitasResultadoModel){
    this.router.navigate(['/visita', visita.visit_lang_title , visita.visit_uuid]);
  }
  
  

}
