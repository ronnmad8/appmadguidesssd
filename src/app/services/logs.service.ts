import { Injectable } from "@angular/core";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PersonasModel } from "../models/Personas.model";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";
import { JsonPipe } from "@angular/common";
import { Observable } from "rxjs";
import { LogsModel } from "../models/logs.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LogsService {
  userToken: string;
  idUsuario: string;
  url: string;
  apiurl: string;

  constructor(
    private http: HttpClient, 
    private auth: AuthService,
    private router: Router
    ) 
  {
    this.apiurl = environment.apiurl;
  }

  getLogs() {
    this.userToken = this.auth.leerToken();
    let endpoint = "/logs/list";
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ Authorization: this.userToken });
    return this.http.get(`${this.url}`, { headers })
    .pipe(
      map( res => res as LogsModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }


  getLogsFilt(id: number) {
    this.userToken = this.auth.leerToken();
    let endpoint = "/logs/filt";
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ Authorization: this.userToken });
    const filtData = {
      eventos_id: id
    };
    return this.http.post(`${this.url}`, filtData, { headers })
    .pipe(
      map( res => res as LogsModel[]) ,
      catchError((err) => {
        console.error("Error " ,  err.error);
                return err.error;
      })
    );
  }


  getLog(id: number) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/logs/'+ id ;
    const headers = new HttpHeaders({ Authorization: this.userToken });
    this.url = this.apiurl + endpoint;
  
    return this.http.get( `${this.url}`, { headers } )
    .pipe(map( resp => {
        return  resp as LogsModel;
    } ));
  }








}
