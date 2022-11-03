//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class UserModel {

    uuid: string;
    name: string;
    surname: string;
    email: string;
    prefijo: string;
    telefono: string;
    password: string;
    roles: Roles[];
    rol: string;

    namefacturacion: string;
    surnamefacturacion: string;
    tipoidentificacion: Identificacion;
    numeroidentificacion: string;
    direccion: string;
    codigopostal: string;
    ciudad: string;
    pais: string;
    particular: boolean;
    empresa: boolean;
    afiliado: string;

    constructor(){
            
        this.uuid = '';
        this.name = '';
        this.surname = '';
        this.email = '';
        this.prefijo = '';
        this.telefono = '';
        this.password = '';
        this.roles = [];
        this.rol = '';
        this.namefacturacion = '';
        this.surnamefacturacion = '';
        this.tipoidentificacion = new Identificacion();
        this.numeroidentificacion = '';
        this.direccion = '';
        this.codigopostal = '';
        this.ciudad = '';
        this.pais = '';
        this.particular = false;
        this.empresa = false;
        this.afiliado = '0'; 


    }

}

class Roles {
    id: number;
    name: string;
}
class Identificacion {
    id: number;
    name: string;
}