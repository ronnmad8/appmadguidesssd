import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonasModel } from '../models/Personas.model';
import { map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TipotextosModel } from '../models/tipotextos.model';
import { AcabadoscategoriasModel } from '../models/Acabadoscategorias.model';
import { TiposModel } from '../models/tipos.model';


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
    .pipe(map( (resp: TiposModel[]) => {
        return  resp;
    } ));
  }

  getTipotextos() {
    this.userToken = this.auth.leerToken();
    let endpoint = '/tipotextos' ;
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers}  )
    .pipe(map( (resp: TipotextosModel[]) => {
        return  resp;
    } ));
  }

  getAcabadoscategorias() {
    this.userToken = this.auth.leerToken();
    let endpoint = '/acabadoscategorias' ;
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers}  )
    .pipe(map( (resp: AcabadoscategoriasModel[]) => {
        return  resp;
    } ));
  }




 

}
