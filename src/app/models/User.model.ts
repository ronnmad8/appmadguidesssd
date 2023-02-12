//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { AddressModel } from './Address.model';

export class UserModel {

    uuid: string;
    name: string;
    surname: string;
    email: string;
    prefijo: string;
    prefix_phone_id: number;
    phone: string;
    password: string;
    roles: Roles[];
    rol: string;
    type: string;
    document: string;
    address: AddressModel[];
    street: string;
    number: string;
    postal: string;
    city: string;
    country: string;
    state: string;
    particular: boolean;
    social_login: string;
    social_name: string;
    afiliado: string;
    namefacturacion: string;
    surnamefacturacion: string;
    old: number;

    constructor(){
            
        this.uuid = '';
        this.name = '';
        this.surname = '';
        this.email = '';
        this.prefijo = '';
        this.prefix_phone_id = 0;
        this.phone = '';
        this.password = '';
        this.roles = [];
        this.rol = '';
        this.type = "";
        this.document = '';
        this.address = [];
        this.street = '';
        this.number = '';
        this.postal = '';
        this.city = '';
        this.country = '';
        this.state = '';
        this.particular = false;
        
        this.social_login = '';
        this.social_name = '';

        
        this.afiliado = '0'; 
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
