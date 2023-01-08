import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientesModel } from '../models/Clientes.model';
import { UsuarioModel } from '../models/Usuario.model';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../models/User.model';
import { LoginModel } from '../models/Login.model';
import { RecordarmeModel } from '../models/Recordarme.model';
import { CountriesModel } from '../models/Countries.model';
import { StatesModel } from '../models/States.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = '';
  rolcliente: boolean = false;
  userToken: string;
  apiurl: string;
  cambiarMenu = new Subject<string>();
  cambiarMenuObservable = this.cambiarMenu.asObservable();
  headers: HttpHeaders = new HttpHeaders();
  clang: string = '';

  islogin$ = new Subject<boolean>();

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
    this.userToken = this.leerToken();
    this.clang = localStorage.getItem('currentLanguage') ?? 'es';
    this.headers =this.getHeaders(this.clang, this.userToken);
  }

  getHeaders(clang: string, token: string) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      Language: clang,
      Authorization: 'Bearer ' + token,
    });
    return headers;
  }

  setHeaders() {
    this.userToken = this.leerToken();
    this.clang = localStorage.getItem('currentLanguage') ?? 'es';
    this.headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      Language: this.clang,
      Authorization: 'Bearer ' + this.userToken,
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
    localStorage.removeItem('saludo');
    this.userToken = '';
    this.clang = localStorage.getItem('currentLanguage') ?? 'es';
    this.headers =this.getHeaders(this.clang, this.userToken);

    this.router.navigateByUrl('/home');
  }

  private guardarToken(lo: LoginModel) {
    localStorage.setItem('token', lo.token);
    localStorage.setItem('rol', lo.rol[0]);
    localStorage.setItem('saludo', 'hola');
    this.userToken = lo.token;
  }


  leerToken() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      this.userToken = '';
      if (token != null) {
        this.userToken = token;
        
        //if (this.noAuth()) this.router.navigateByUrl('/home');
      }
    }
    return this.userToken;
  }

  getUser() {
    let user: UserModel = new UserModel();
    if (localStorage.getItem('user')) {
      let res: string = localStorage.getItem('user') ?? '';
      user = JSON.parse(res) as UserModel;
    }
    return user;
  }

  leerRol() {
    if (localStorage.getItem('rol')) {
      var leerToken = localStorage.getItem('rol');
      return leerToken;
    } else {
      return '';
    }
  }

  leerRecordarme() {
    let recordarme: RecordarmeModel = new RecordarmeModel();
    let rec = localStorage.getItem('recordarme') ;
    if(rec != null){
      recordarme =  JSON.parse(rec) as RecordarmeModel;
    } 
    return recordarme;
  }

  saveRecordarme(recordarme: RecordarmeModel) {
    localStorage.setItem('recordarme', JSON.stringify(recordarme));
  }


  isAuth(): void{
    if (this.leerToken() != null){
      this.islogin$.next(true);
    }
    else{
      this.islogin$.next(false);
    }
  }

  noAuth(): boolean {
    let noesta = true;
    let token = this.leerToken();
    if (token != null){
      noesta = false;
    }
    return noesta;
  }


  registrarUser(user: UserModel) {

    let _datos = {
      second: user.password,
      name: user.name,
      email: user.email,
      surname: user.surname,
      password: user.password,
      prefijo: user.prefijo,
      phone: user.phone,
      privacity: true,
      particular: true,
      type_doc: user.type_doc,
      telefono: user.phone
    };

    let endpoint = '/register';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos).pipe(
      map((res) => {
        let login = res as LoginModel;
        return login;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }

  renovarPassword(user: UserModel) {
    let _datos = {
      email: user.email,
    };

    let endpoint = '/requirePass';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos).pipe(
      map((res) => {
        let respuesta = res;
        return respuesta;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }


  loginUser(user: UserModel) {
    let _datos = {
      email: user.email,
      password: user.password,
    };

    let endpoint = '/login';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos).pipe(
      map((res) => {
        
        let login = res as LoginModel;
        if(login.status == "success"){
          this.guardarToken(login);
        }
        return login.status;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }

  getMe() {

    let endpoint = '/me';
    this.url = this.apiurl + endpoint;
    let user: ClientesModel = new ClientesModel();
    return this.http.get(`${this.url}`).pipe(
      map((res) => {
        if(res != null){
      
          user = res["user"] as ClientesModel;
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      }),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    );
  }

  

  updateUserData(user: UserModel) {

    let _datos = {
      
      name: user.name,
      surname: user.surname,
      prefijo: user.prefijo,
      email: user.email,
      phone: user.phone,
      type_doc: user.type_doc,
      document: user.document,
      particular: true
    };
    
    let endpoint = '/changeData';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos).pipe(
      map((res) => {
        let user = res as UserModel;
        return user;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }


  updateUserAddress(user: UserModel) {

    let _datos = {
      uuid: user.uuid,
      street: user.street,
      number: user.number,
      postal: user.postal,
      city: user.city,
      state: user.state,
      country: user.country
      
    };
    
    let endpoint = '/changeAdrress';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos).pipe(
      map((res) => {
        let user = res as UserModel;
        return user;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }
}
