import { Injectable } from "@angular/core";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PersonasModel } from "../models/Personas.model";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";
import { JsonPipe } from "@angular/common";
import { Observable } from "rxjs";
import { ColeccionesModel } from "../models/colecciones.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ColeccionesService {
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

  getColecciones() {

    let endpoint = "/colecciones/list";
    this.url = this.apiurl + endpoint;
    return this.http.get(`${this.url}`)
    .pipe(
      map( res => res as ColeccionesModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }


  getTitulos() {
    
    let endpoint = "/colecciones/titulos";
    this.url = this.apiurl + endpoint;

    return this.http.get(`${this.url}`)
    .pipe(
      map( res => res as ColeccionesModel[]) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }


  getIdColeccion(id) {
    this.userToken = this.auth.leerToken();
    let endpoint = "/colecciones/idcoleccion/"+id;
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


  




}
