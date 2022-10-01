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


@Component({
  selector: 'app-slidervisitasinteresar',
  templateUrl: './slidervisitasinteresar.component.html'
})
export class SlidervisitasinteresarComponent implements OnInit, AfterViewInit {
 
  @Input() dataHome: any;

  public show: boolean = true;
  public cargados: boolean = false;
  public listavisitasrelacionadas: VisitasModel[] = [];

 
  constructor(
    private wowService: NgwWowService,
    private router: Router,
    private visitaService: VisitaService,
  ) 
  {  
      this.wowService.init(); 
  }


  ngOnInit(): void {    
    //this.getVisitashome();
    this.listavisitasrelacionadas = [];

    ///fake 4 visitas
  }
  ngAfterViewInit() {
    // this.message = this.child.message
  }


  getVisitasRelacionadas(){ 
      this.visitaService.getRelacionadas().subscribe( (resp ) =>{
        this.listavisitasrelacionadas = resp as VisitasModel[];
        this.cargados = true;
      } ) ; 
  }

  
  

}
