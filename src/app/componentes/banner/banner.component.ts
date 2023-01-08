import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'

import { ImagenesModel } from 'src/app/models/Imagenes.model';
import { TextosModel } from 'src/app/models/Textos.model';
 



@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit, AfterViewInit {

  @Input() enlace: string = "";
  @Input() bannerData: ImagenesModel;

  

  constructor(
      

  ) {

    
  }


  ngOnInit(): void {
     ///
  }

  ngAfterViewInit(){
    ///
  }



  

  
  

}
