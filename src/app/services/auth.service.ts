import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientesModel } from '../models/Clientes.model';
import { UsuarioModel } from '../models/Usuario.model';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "";
  rolcliente: boolean = false;
  userToken: string;
  apiurl: string;
  cambiarMenu = new Subject<string>();
  cambiarMenuObservable = this.cambiarMenu.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router
  )
  {
      this.apiurl = environment.apiurl;
      this.userToken = this.leerToken();
  }

  logout() {
    // localStorage.removeItem('token')
    // localStorage.removeItem('idrol');
    // localStorage.removeItem('nombre');
    // localStorage.removeItem('saludo');
    this.userToken = "";
    this.router.navigateByUrl('/homecliente');
  }


  ///////////////////////homecliente
  login(usuario: UsuarioModel) {
    let endpoint = '/signin' ;
    this.url = this.apiurl + endpoint;
    
    const authData = { email: usuario.email, passw: usuario.passw };
    return this.http.post( `${this.url}`, authData
    ).pipe(
      map( resp => {
           if(resp != null){
             let token: any = resp;
             this.guardarToken(token['token'], token['idrol'], token['id'], token['nombre']);
             let idrol = token['idrol'];
             this.cambiarMenu.next(idrol) ;

             return resp;
           }
           return null
    }) );
    
  }


  /////////////////////registro
  nuevoUsuario(cliente: ClientesModel) {
      let endpoint =  '/regist'; 
      this.url = this.apiurl + endpoint ;
      
      const authData = {
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        email: cliente.email,
        passw: cliente.passw,

      };
      return this.http.post(`${this.url}`, authData);

}


  private guardarToken(idToken: string, idrol: string, id: string, nombre: string) {
    // localStorage.setItem('token', idToken);
    // localStorage.setItem('idrol', idrol);
    // localStorage.setItem('nombre', nombre);
    // localStorage.setItem('saludo', '');
    this.userToken = idToken;
  }


  leerToken() {
    
      // if (localStorage.getItem('token')) {
      //     let token = localStorage.getItem('token');
      //     this.userToken = "";
      //     if(token != null ){
      //       this.userToken = token;
      //       if (this.noAuth()) 
      //           this.router.navigateByUrl('/homecliente');
      //       }
      //     }  
      return this.userToken  ;
  }

  leerIdUsuario() {
    // if (localStorage.getItem('id')) {
    //     return localStorage.getItem('id');
    // }
    // else {
    //     return  '';
    // }
  }
  
  leerNombre() {
    // if (localStorage.getItem('nombre')) {
    //     var leerToken = localStorage.getItem('nombre');
    //     return leerToken;
    // }
    // else {
    //     return  '';
    // }
  }

  leerRol() {
    // if (localStorage.getItem('idrol')) {
    //     var leerToken = localStorage.getItem('idrol');
    //     return leerToken;
    // }
    // else {
    //     return  '';
    // }
  }

  leerReordarme() {
    if (localStorage.getItem('recordarme')) {
        return localStorage.getItem('recordarme');
    }
    else {
        return  '';
    }
  }


    noAuth(): boolean {
    let noesta = true;
    if( this.userToken.length > 2  && this.nocaduc(this.userToken) ) { noesta = false;  }
    return noesta;
    }

    nocaduc(tok: any) {
      let endpoint = '/nocaduc' ;
      this.url = this.apiurl + endpoint;
      const authData = { token: tok };
      return this.http.post( `${this.url}`, authData
      ).pipe(map( (resp) => {
          return resp;
        })
      );
    }



}
