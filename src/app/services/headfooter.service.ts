import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VisitasModel } from '../models/Visitas.model';
import { HomerespModel } from '../models/Homeresp.model';
import { ComentariosModel } from '../models/Cometarios.model';
import { TextosModel } from '../models/Textos.model';
import { MessagesModel } from '../models/Messages.model';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { ResultadoModel } from '../models/Resultado.model';
import { MessagesFormModel} from '../models/MessageseForm.model';
import { MessagesImageModel} from '../models/MessagesImage.model';
import { utf8Encode } from '@angular/compiler/src/util';
import { MenuModel } from '../models/Menu.model';
import { FooterModel } from '../models/Footer.model';
import { TextoLoginModel } from '../models/TextoLogin.model';
import { TextoCartModel } from '../models/TextoCart.model';



@Injectable({
  providedIn: 'root'
})
export class HeadfooterService {
  clang: string = 'es';
  userToken: string = "";
  url: string = "";
  apiurl: string;
  

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
    this.clang = this.globalService.getLanguage();
  }

  
    getMessagesMenu()  {

      let endpoint = '/assets/header/menu?' ;
      this.url = this.apiurl + endpoint ;
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
    
          let menu: MenuModel = resp as MenuModel;
          return menu;

        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getMessagesLogin()  {

      let endpoint = '/assets/login?' ;
      this.url = this.apiurl + endpoint;
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
    
          let textologin : TextoLoginModel = resp as TextoLoginModel;
          return textologin;

        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }

    getMessagesCart()  {

      let endpoint = '/assets/messages?' ;
      this.url = this.apiurl + endpoint;
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
    
          let textocart : TextoCartModel = resp as TextoCartModel;
          return textocart;

        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getMessagesFooter()  {

      let endpoint = '/assets/footer?' ;
      this.url = this.apiurl + endpoint;
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
    
          var menu: FooterModel = resp as FooterModel;
          return menu;

        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }



    getLogoMenu()  {

      let endpoint = '/assets/find?file=logo-madguides' ;
      this.url = this.apiurl + endpoint;
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          let imagenes:ImagenesModel[] = resp as ImagenesModel[]; ;
          let imagen = imagenes[0];
          return imagen;

        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }

    getLogoFooter()  {
       
      let endpoint = '/assets/find?file=logo-madguides-vertical' ;
      this.url = this.apiurl + endpoint;
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
    
          let imagenes:ImagenesModel[] = resp as ImagenesModel[]; ;
          let imagen = imagenes[0];
          return imagen;

        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    


}