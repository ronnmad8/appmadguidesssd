import { NullTemplateVisitor } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { AlertasService } from 'src/app/services/alertas.service';
import { HomeService } from 'src/app/services/home.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesModel } from 'src/app/models/Messages.model';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    
  })
  export class FooterComponent implements OnInit {

    //@ViewChild(LoginComponent, null) loginentrar;
    @Input() nomostrarenlacesfooter:boolean  = false;

    message: MessagesModel = new MessagesModel();
    adminactive: boolean;
    widg1show = false;
    widg2show = false;

    constructor(
      private auth: AuthService,
      private alertasService: AlertasService,
      private homeService: HomeService,
      private router: Router
    ) {
      //leer persona
      this.adminactive = false;
    }

    ngOnInit() {
      this.getMessageFooter();
      //this.loginadmin();
    }

    getMessageFooter(){
 
        this.homeService.getMessagesHome().subscribe( (resp) => {
          let respuesta: any =  resp ;
          
          this.message = respuesta[1] ;

        } );
    
    }

    identificar(){
      //this.loginentrar.login();
    }

    loginadmin() {
      let personalocal= localStorage.getItem('persona');
      if(personalocal != null){
        this.adminactive = true;
      }
    }

    loginadminout() {
      this.logout();
    }

    logout() {
      this.adminactive = false;
      this.auth.logout();
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