import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { LanguagesModel } from '../models/Languages.model';


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
    let endpoint = '/categorias' ;
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers}  )
    .pipe(map( resp => {
        return  resp;
    } ));
  }

  getEnlaces() {
    this.userToken = this.auth.leerToken();
    let endpoint = '/enlaces' ;
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers}  )
    .pipe(map( resp => {
        return  resp;
    } ));
  }


  getPersonas() {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/personas';
    this.url = this.apiurl + endpoint ;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers }  )
    .pipe(map( resp => {
        return resp;
    } ));
  }


  getTipos() {
    this.userToken = this.auth.leerToken();
    let endpoint = '/tipos' ;
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers}  )
    .pipe(map( (resp) => {
        return  resp;
    } ));
  }

  getTipotextos() {
    this.userToken = this.auth.leerToken();
    let endpoint = '/tipotextos' ;
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers}  )
    .pipe(map( (resp) => {
        return  resp;
    } ));
  }

  getAcabadoscategorias() {
    this.userToken = this.auth.leerToken();
    let endpoint = '/acabadoscategorias' ;
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers}  )
    .pipe(map( (resp) => {
        return  resp;
    } ));
  }

  getIdiomas() {
    // this.userToken = this.auth.leerToken();
    // let endpoint = '/languages' ;
    // this.url = this.apiurl + endpoint;
    // const headers = new HttpHeaders({ 'Authorization': this.userToken });
    // return this.http.get( `${this.url}`, { headers}  )
    // .pipe(map( (resp) => {
    //     return  resp;
    // } ));
 
    let lang1  = new LanguagesModel();
    lang1.iso = "es";
    lang1.name_iso = "es";
    lang1.name_title = "español";
    let lang2  = new LanguagesModel();
    lang2.iso = "en";
    lang2.name_iso = "en";
    lang2.name_title = "english";
    let lang3  = new LanguagesModel();
    lang3.iso = "fr";
    lang3.name_iso = "fr";
    lang3.name_title = "français";

    let lista = [lang1, lang2, lang3];
    return lista;


  }




 

}
