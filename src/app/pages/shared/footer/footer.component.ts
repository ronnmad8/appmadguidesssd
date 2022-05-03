import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AlertasService } from 'src/app/services/alertas.service';
import { AuthService } from 'src/app/services/auth.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    
  })
  export class FooterComponent implements OnInit {

    @ViewChild(LoginComponent, null) loginentrar;

    adminactive: boolean;

    constructor(
      private auth: AuthService,
      private personasService: PersonasService,
      private alertasService: AlertasService,
      private router: Router
    ) {
      //leer persona
      this.adminactive = false;
    }

    ngOnInit() {
      this.loginadmin();
    }

    identificar(){
      this.loginentrar.login();
    }

    loginadmin() {
      let personalocal= localStorage.getItem('persona');
      if(personalocal != null){
        this.adminactive = true;
      }
    }

    loginadminout() {
      this.personasService.deletePersonaLocal();
      this.logout();
    }

    logout() {
      this.adminactive = false;
      this.auth.logout();
    }

      
  }