import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HomeService } from '../../services/home.service';
import { SwiperModule, SwiperComponent, SwiperConfigInterface, SwiperDirective, SwiperPaginationInterface, SwiperScrollbarInterface } from 'ngx-swiper-wrapper';
import { VisitaService } from 'src/app/services/visita.service';
import { VisitasResultadoModel } from 'src/app/models/VisitasResultado.model';
import { TextContentsModel } from 'src/app/models/TextContents.model';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-slidervisitasinteresar',
  templateUrl: './slidervisitasinteresar.component.html'
})
export class SlidervisitasinteresarComponent implements OnInit, AfterViewInit {
 
  @Input() relatedData: VisitasResultadoModel[] = [];
  @Input() textconts: TextContentsModel = new TextContentsModel();

  public show: boolean = true;
  public cargados: boolean = false;
 
  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private visitaService: VisitaService,
    private globalService: GlobalService,
  ) 
  {  
      this.wowService.init(); 
  }


  ngOnInit(): void {    
    
  }

  ngAfterViewInit() {
    
  }


  vertodascategoria(){
    
    this.router.navigate(['/buscador/category']);
  }

  verdetalle(visita: VisitasResultadoModel){
    this.router.navigateByUrl('/visita/'+ visita.id );
  }
  
  

}
