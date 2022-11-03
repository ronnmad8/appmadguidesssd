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

  constructor(private http: HttpClient, private router: Router) {
    this.apiurl = environment.apiurl;
    this.userToken = this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
    localStorage.removeItem('saludo');
    this.userToken = '';
    this.router.navigateByUrl('/home');
  }

  private guardarToken(lo: LoginModel) {
    localStorage.setItem('token', lo.token);
    localStorage.setItem('rol', lo.user.rol);
    localStorage.setItem('user', JSON.stringify(lo.user));
    localStorage.setItem('saludo', '');
    this.userToken = lo.token;
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      this.userToken = '';
      if (token != null) {
        this.userToken = token;
        if (this.noAuth()) this.router.navigateByUrl('/home');
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


  noAuth(): boolean {
    let noesta = true;
    if (this.userToken == null){
      noesta = false;
    }
    return noesta;
  }


  registrarUser(user: UserModel) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    });

    let _datos = {
      second: user.password,
      name: user.name,
      email: user.email,
      surname: user.surname,
      password: user.password,
      prefijo: user.prefijo,
      telefono: user.telefono,
      privacity: true,
    };
    JSON.stringify(_datos);
    let endpoint = '/register';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos, { headers }).pipe(
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
    JSON.stringify(_datos);
    let endpoint = '/forgotpassword';
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
    JSON.stringify(_datos);
    let endpoint = '/login';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos).pipe(
      map((res) => {
        let login = res as LoginModel;
        this.guardarToken(login);
        return login;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }

  updateUser(user: UserModel) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + this.userToken,
    });

    let _datos = {
      name: user.name,
      email: user.email,
      surname: user.surname,
      prefijo: user.prefijo,
      telefono: user.telefono,
      privacity: true,
    };
    //JSON.stringify(_datos);
    let endpoint = '/register';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos, { headers }).pipe(
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
