//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class UserModel {

    id: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    prefijo: string;
    telefono: string;
    state: string;
    country: string;
    city: string;
    particular: number;
    postalcode: string;
    number: string;
    address: string;
    rol_id: string;
    afiliado: string;

    document: string;
    namefacturacion: string;
    surnamefacturacion: string;
    old: number;

    constructor(){
            
        this.id = '';
        this.email = '';
        this.password = '';
        this.name = '';
        this.surname = '';
        this.prefijo = '';
        this.telefono = '';
        this.state = '';
        this.country = '';
        this.city = '';
        this.postalcode = '';
        this.particular = 0;
        this.number = '';
        this.address = '';
        this.afiliado = '0'; 
        this.rol_id = '';
        
        this.document = '';
        this.namefacturacion = '';
        this.surnamefacturacion = '';
        this.old = 0;

    }

}

class Roles {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
}
class Identificacion {
    id: number;
    name: string;
}
