import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'
import { ImagenesModel } from 'src/app/models/Imagenes.model';
 

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit, AfterViewInit {

  @Input() enlace: string = "";
  @Input() bannerurl: string = "assets/images/sinimagen.png";

  

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
