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
import { ResultadoModel } from '../models/Resultado.model';
import { RespuestaModel } from '../models/Respuesta.model';


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
    this.headers = this.getHeaders(this.clang, this.userToken);
  }

  getHeaders(clang: string, access_token: string) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      Language: clang,
      Authorization: 'Bearer ' + access_token,
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
    this.cleanLocalstorageUser()
    this.userToken = '';
    this.clang = localStorage.getItem('currentLanguage') ?? 'es';
    this.headers = this.getHeaders(this.clang, this.userToken);

    this.router.navigateByUrl('/home');
  }

  private guardarToken(lo: LoginModel) {
    localStorage.setItem('access_token', lo.access_token);
    localStorage.setItem('refresh_token', lo.refresh_token);
    localStorage.setItem('saludo', 'hola');
    this.userToken = lo.access_token;
  }


  leerToken() {
    if (localStorage.getItem('access_token')) {
      let access_token = localStorage.getItem('access_token');
      this.userToken = '';
      if (access_token != null) {
        this.userToken = access_token;

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
    let rec = localStorage.getItem('recordarme');
    if (rec != null) {
      recordarme = JSON.parse(rec) as RecordarmeModel;
    }
    return recordarme;
  }

  saveRecordarme(recordarme: RecordarmeModel) {
    localStorage.setItem('recordarme', JSON.stringify(recordarme));
  }


  isAuth(): void {
    if (this.leerToken() != null) {
      this.islogin$.next(true);
    }
    else {
      this.islogin$.next(false);
    }
  }

  noAuth(): boolean {
    let noesta = true;
    let token = this.leerToken();
    if (token != null) {
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
      telefono: user.telefono,
      country: user.country,
      state: user.state,
      city: user.city,
      number: user.number,
      address: user.address,
    };

    let endpoint = '/users';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos).pipe(
      map((res: any) => {
        return res;
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


  cleanLocalstorageUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
    localStorage.removeItem('saludo');
  }

  loginUser(user: UserModel) {
    let _datos = {
      username: user.email,
      password: user.password,
      client_id: environment.client_id_grant,
      client_secret: environment.client_secret_grant,
      grant_type: environment.grant_type,
    };

    let endpoint = '/login';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos).pipe(
      map((res) => {
        this.cleanLocalstorageUser();
        let login = res as LoginModel;
        let processok = false;
        if (login != null) {
          this.userToken = "";
          this.clang = localStorage.getItem('currentLanguage') ?? 'es';
          this.guardarToken(login);
          this.headers = this.getHeaders(this.clang, this.userToken);
          processok = true;
        }
        return processok;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }

  resetlogin() {
    let user = this.getUser();
    if (user != null) {
      this.loginUser(user);
    }
    else {
      this.logout();
    }
  }

  getMe() {
    let endpoint = '/me';
    this.url = this.apiurl + endpoint;
    let user: UserModel = new UserModel();
    return this.http.get(`${this.url}`).pipe(
      map((resp: any) => {
        if (resp != null && resp["data"] != null) {
          user = resp["data"] as UserModel;
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
      email: user.email,
      surname: user.surname,
      prefijo: user.prefijo,
      telefono: user.telefono,
      state: user.state,
      country: user.country,
      city: user.city,
      particular: user.particular,
      number: user.number,
      postalcode: user.postalcode,
      address: user.address

    };

    let endpoint = '/users/changedata';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos).pipe(
      map((res) => {
        let user = res as RespuestaModel;
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
      address: user.address,
      number: user.number,
      city: user.city,
      state: user.state,
      country: user.country
    };

    let endpoint = '/changedata';
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
