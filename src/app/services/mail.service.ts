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




@Injectable({
  providedIn: 'root'
})
export class MailService {
 
  url: string = "";
  apiurl: string;
  
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
  }

  
    sendMail(name: string, email: string, message: string) {
      let _datos = {
        name: name,
        email: email,
        message: message
      };
      
      let endpoint = '/contact' ;
      this.url = this.apiurl + endpoint ;
      return this.http.post( `${this.url}`, _datos ).pipe(
        map( resp =>{
    
          let respuesta = resp as String ;
          return respuesta;

        } ) ,
        catchError((err) => {
          
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    
    


}