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
import { TextotourModel } from '../models/Textotour.model';
import { TextoiconsModel } from '../models/Textoicons.model';
import { TextorecomendadasModel } from '../models/Textorecomendadas.model';


@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  idUsuario: string = "";
  apiurl: string = "";
  url: string = "";

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;

    
  }

    

    getMessagesForm()  {

      let endpoint = '/assets/home/form?' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}`)
      .pipe(
        map( resp =>{
          var data = resp as MessagesFormModel;  
          return data;   
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    

}