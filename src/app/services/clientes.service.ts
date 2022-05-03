import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientesModel } from '../models/Clientes.model';
import { map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { PersonasModel } from '../models/Personas.model';
//import { jsonpCallbackContext } from '@angular/common/http/src/module';
// import { routerNgProbeToken } from '@angular/router/src/router_module';



@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  userToken: string;
  idUsuario: string;
  url: string;
  apiurl: string;

  constructor (
    private http: HttpClient,
    private auth: AuthService
  )
  {
    this.apiurl = environment.apiurl;
  }


  getClientes() {
      this.userToken = this.auth.leerToken();
      let endpoint = '/clientes/list' ;
      this.url = this.apiurl + endpoint;
      const headers = new HttpHeaders({ 'Authorization': this.userToken });
      return this.http.get( `${this.url}`, { headers }  )
      .pipe(map( resp => {
          return  resp;
      } ));
  }


  getClientesFilt(nombr: string) {

    this.userToken = this.auth.leerToken();
    let endpoint = '/clientes/filt' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      nombre: nombr
    };
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.post( `${this.url}`, filtData,  { headers }  )
    .pipe(map( resp => {
        return  resp;
    } ));
  }


  modificarUsuario(cliente: ClientesModel) {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/clientes/modificar';
    this.url = this.apiurl + endpoint ;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    const clienteData = {
      id: cliente.id,
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
    };
    
    return this.http.post( `${this.url}`, clienteData, {headers} );
}



  deleteClientes(id) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/clientes/eliminar/' + id ;
    this.url = this.apiurl +  endpoint ;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers }  )
    .pipe(map( resp => {
        return  resp;
    } ));
  }

  saveCliente(cliente: ClientesModel){
    //create update localstorage
    var c = JSON.stringify(cliente);
    localStorage.setItem('cliente', c);

  }

  

  


  enviarcontacto(cliente: ClientesModel) {

    let endpoint =  '/clientes/contacto';
    this.url = this.apiurl + endpoint ;
    const clienteData = {
      
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      mensaje: cliente.mensaje
    };
    return this.http.post( `${this.url}`, clienteData );
  }


}

