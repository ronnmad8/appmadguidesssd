import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { LanguagesModel } from '../models/Languages.model';
import { CategoriasModel } from '../models/Categorias.model';
import { TagsModel } from '../models/Tags.model';
import { SelectModel } from '../models/Select.model';


@Injectable({
  providedIn: 'root'
})
export class ListasService {
  userToken: string;
  idUsuario: string;
  url: string;
  apiurl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.apiurl = environment.apiurl;
  }


  getCategorias() {
    this.userToken = this.auth.leerToken();
    let endpoint = '/select/category/parent/child' ;
    this.url = this.apiurl + endpoint;
    return this.http.get( `${this.url}` )
    .pipe(map( resp => {
        return  resp ;
    } ));
  }



  getTags() {
    this.userToken = this.auth.leerToken();
    let endpoint = '/select/tags' ;
    this.url = this.apiurl + endpoint;
    return this.http.get( `${this.url}`)
    .pipe(map( (resp) => {
        let tags = resp as TagsModel[];
        return tags;
    } ));
  }


  getIdiomas() {
    this.userToken = this.auth.leerToken();
    let endpoint = '/select/language' ;
    this.url = this.apiurl + endpoint;
    
    return this.http.get( `${this.url}`)
    .pipe(map( (resp) => {
        let idiomas = resp as LanguagesModel[];
        return idiomas;
    } ));
 
  }




 

}
