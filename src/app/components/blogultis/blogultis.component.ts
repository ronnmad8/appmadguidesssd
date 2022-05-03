import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { BrowserStack } from 'protractor/built/driverProviders';
import { BlogarticulosModel } from 'src/app/models/blogarticulos.model';
import { BlogarticulosService } from '../../services/blogarticulos.service';

@Component({
  selector: 'app-blogultis',
  templateUrl: './blogultis.component.html'
})
export class BlogultisComponent implements OnInit {

  @Input() titulo:string = "";

  blogarticulosultimos: BlogarticulosModel[] = [];


  constructor(
    private blogarticulosService: BlogarticulosService
  ) { }

  ngOnInit() {

    this.getArticulosBlog();
 
  }

  getArticulosBlog(){
    ////blog articulos
    
    this.blogarticulosService.getBlogarticuloshome()
    .subscribe( (resp: BlogarticulosModel[]) => {
      
      if(resp != undefined){
        this.blogarticulosultimos = resp ;
      }
    });
 }






}
