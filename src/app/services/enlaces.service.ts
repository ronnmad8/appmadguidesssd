import { Injectable } from "@angular/core";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PersonasModel } from "../models/Personas.model";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";
import { JsonPipe } from "@angular/common";
import { Observable } from "rxjs";
import { EnlacesModel } from "../models/enlaces.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class EnlacesService {
  userToken: string;
  idUsuario: string;
  url: string;
  apiurl: string;

  constructor(
    private http: HttpClient, 
    private auth: AuthService,
    private router: Router
    ) {
    this.apiurl = environment.apiurl;
  }

  getEnlaces() {
    this.userToken = this.auth.leerToken();
    let endpoint = "/enlaces/list";
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ Authorization: this.userToken });
    return this.http.get(`${this.url}`, { headers })
    .pipe(
      map( res => res as EnlacesModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }


  getTituloadmin(id: number) {
    this.userToken = this.auth.leerToken();
    let endpoint = "/enlaces/tituloadmin/"+id;
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ Authorization: this.userToken });
    return this.http.get(`${this.url}`, { headers })
    .pipe(
      map( res => res as EnlacesModel) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }


  getIdColeccion(id) {
    this.userToken = this.auth.leerToken();
    let endpoint = "/enlaces/idcoleccion/"+id;
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ Authorization: this.userToken });
    return this.http.get(`${this.url}`, { headers })
    .pipe(
      map( res => res) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }


  getEnlacesFilt(idenlaceppal: number) {
    let endpoint = "/enlaces/filt";
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaceppal_id: idenlaceppal
    };
    return this.http.post(`${this.url}`, filtData)
    .pipe(
      map( res => res as EnlacesModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }

  getEnlacesOrden(idenlaceppal: number) {
    let endpoint = "/enlaces/orden";
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaceppal_id: idenlaceppal
    };
    return this.http.post(`${this.url}`, filtData)
    .pipe(
      map( res => res as EnlacesModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }


  getEnlace(id: number) {
    let endpoint = '/enlaces/'+ id ;
    this.url = this.apiurl + endpoint;
    return this.http.get( `${this.url}` )
    .pipe(map( resp => {
        return  resp as EnlacesModel;
    } ));
  }

  getEnlacesByppal(id: number) {
    let endpoint = '/enlaces/byppal/'+ id ;
    this.url = this.apiurl + endpoint;
    return this.http.get( `${this.url}` )
    .pipe(
      map( res => res as EnlacesModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }


  getEnlacePpal(nombre: string) {
    let endpoint = "/enlaces/ppal";
    this.url = this.apiurl + endpoint;
    const filtData = {
      nombre: nombre
    };

    return this.http.post(`${this.url}`, filtData)
    .pipe(
      map( res => res as EnlacesModel) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }

  getRutabase(id: number) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/enlaces/rutabase/'+ id ;
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`,  { headers }  )
    .pipe(
      map( res => res as EnlacesModel) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }


  getTitulos(nombre: string) {
    let endpoint = "/enlaces/ppal";
    this.url = this.apiurl + endpoint;
    const filtData = {
      nombre: nombre
    };

    return this.http.post(`${this.url}`, filtData)
    .pipe(
      map( res => res as EnlacesModel) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }




}
