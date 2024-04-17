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
import { GlobalService } from './global.service';
import { IsolanguagesModel } from '../models/Isolanguages.model';

@Injectable({
  providedIn: 'root'
})
export class ListasService {
  userToken: string;
  idUsuario: string;
  url: string;
  apiurl: string;
  clang: string = 'es';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private globalService: GlobalService,
  ) {
    this.apiurl = environment.apiurl;
    this.clang = this.globalService.getLanguage();
  }


  getCategorias() {
    let endpoint = '/categoriestext/'+this.globalService.idlang ;
    this.url = this.apiurl + endpoint;
    return this.http.get( `${this.url}` )
    .pipe(map( resp => {
        return  resp["data"] as CategoriasModel[] ;
    } ));
  }


  getTags() {

    let endpoint = '/tags' ;
    this.url = this.apiurl + endpoint;
    return this.http.get( `${this.url}` )
    .pipe(map( (resp) => {
        return resp["data"] as TagsModel[];
    } ));
  }


  getIdiomas() {

    return this.globalService.listaidlangs as LanguagesModel[];
    // let endpoint = '/isolanguages'+ ;
    // this.url = this.apiurl + endpoint;
    
    // return this.http.get( `${this.url}` )
    // .pipe(map( (resp) => {
    //     let idiomas = resp as LanguagesModel[];
    //     return idiomas;
    // } ));
 
  }

  getIsolanguages(iso: string = "es") {

    let endpoint = '/isolanguages/'+ iso;
    this.url = this.apiurl + endpoint;
    return this.http.get( `${this.url}` )
    .pipe(map( (resp) => {
        return resp["data"] as IsolanguagesModel[];
    } ));
 
  }




 

}
