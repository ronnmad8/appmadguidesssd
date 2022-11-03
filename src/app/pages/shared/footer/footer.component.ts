import { NullTemplateVisitor } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { AlertasService } from 'src/app/services/alertas.service';
import { HomeService } from 'src/app/services/home.service';
import { AuthService } from 'src/app/services/auth.service';
import { HeadfooterService } from 'src/app/services/headfooter.service';
import { MessagesModel } from 'src/app/models/Messages.model';
import { FooterModel } from 'src/app/models/Footer.model';
import { ImagenesModel } from 'src/app/models/Imagenes.model';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    
  })
  export class FooterComponent implements OnInit {

    //@ViewChild(LoginComponent, null) loginentrar;
    @Input() nomostrarenlacesfooter:boolean  = false;

    messageFooter: FooterModel = new FooterModel();
    logoFooter: ImagenesModel = new ImagenesModel();
    adminactive: boolean;
    widg1show = false;
    widg2show = false;

    constructor(
      private auth: AuthService,
      private alertasService: AlertasService,
      private homeService: HomeService,
      private headfooterService: HeadfooterService,
      private router: Router
    ) {
      //leer persona
      this.adminactive = false;
    }

    ngOnInit() {
      this.getMessageFooter();
      this.getLogoFooter();
      //this.loginadmin();
    }

    getMessageFooter(){
        this.headfooterService.getMessagesFooter().subscribe( (resp) => {
          this.messageFooter = resp as FooterModel ;
        } );
    }


    getLogoFooter(){
      this.headfooterService.getLogoFooter().subscribe( (resp) => {
        this.logoFooter = resp as ImagenesModel;
      } );
    }




    showwidg1(){
      this.widg1show = !this.widg1show;
      this.widg2show = false;
    }
    showwidg2(){
      this.widg2show = !this.widg2show;
      this.widg1show = false;
    }

      
  }