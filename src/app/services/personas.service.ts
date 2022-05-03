import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonasModel } from '../models/Personas.model';
import { map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonasService {
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


  crearPersona( persona: PersonasModel ) {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/personas';
    this.url = this.apiurl + endpoint;
    persona.imagen = "https://proyectosxanadu.es/public/images/sinimagen.png";
    const personaData = {
      nombre:  persona.nombre,
      email: persona.email,
      iddepartamento: persona.iddepartamento,
      idlocal: persona.idlocal,
      idrol: persona.idrol,
      horassemana: persona.horassemana,
      telefono: persona.telefono,
      observaciones: persona.observaciones,
      imagen: persona.imagen

    };

    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });

    return this.http.post( `${this.url}`, personaData, {headers} );

  }

  modificarPersona( persona: PersonasModel ) {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/personas/modificar' ;
    this.url = this.apiurl + endpoint;

    const personaData = {
      id: persona.id,
      nombre:  persona.nombre,
      email: persona.email,
      iddepartamento: persona.iddepartamento,
      idlocal: persona.idlocal,
      idrol: persona.idrol,
      horassemana: persona.horassemana,
      telefono: persona.telefono,
      observaciones: persona.observaciones,
      imagen: persona.imagen

    };

    const headers = new HttpHeaders ({
      'Authorization': this.userToken
    });
    return this.http.post( `${this.url}`, personaData, {headers} );
    
  }



  getListaPersonas() {
    this.userToken = this.auth.leerToken();
    let endpoint =  '/personas/todos';
    this.url = this.apiurl + endpoint ;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers }  )
    .pipe(map( resp => {
        return resp;
    } ));
  }


  getPersonasFilt(nombr :string) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/personas/filt' ;
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


  getPersona(id) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/personas/'+ id ;
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`,  { headers }  )
    .pipe(map( resp => {
        return  resp;
    } ));
  }

  isAdmin(id) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/personas/'+ id ;
    this.url = this.apiurl + endpoint;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`,  { headers }  )
    .pipe(map( resp => {
        if(resp[0].idrol = '2'){ return  true; }
        return false;
    } ));
  }



  deletePersona(id) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/personas/eliminar/' + id ;
    this.url = this.apiurl +  endpoint ;
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.get( `${this.url}`, { headers }  )
    .pipe(map( resp => {
        return  resp;
    } ));
  }


  uploadFile( id, filetoupload: File ) {
    this.userToken = this.auth.leerToken();
    let endpoint = '/personas/imagen' ;
    this.url = this.apiurl +  endpoint ;

    var formData: FormData = new FormData();
    formData.append('image', filetoupload, filetoupload.name);
    formData.append('id', id);
  
    const headers = new HttpHeaders({ 'Authorization': this.userToken });
    return this.http.post( `${this.url}`, formData , { headers }  )
    .pipe(map( resp => {
        return  resp;
    } ));

  }



  // savePersona(persona: PersonasModel){
  //   var p = JSON.stringify(persona);
  //   localStorage.setItem('persona', p);

  // }

  deletePersonaLocal(){
    localStorage.setItem('persona', null);
    localStorage.setItem('isadmin', null);
    localStorage.setItem('token', null);

  }

  

}
