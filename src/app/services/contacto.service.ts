import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';


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

    



    

}