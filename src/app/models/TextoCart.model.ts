//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class TextoCartModel {
    
    search: string;
    cart: Cart ;

    constructor(){
        this.search = '';
        this.cart = new Cart();

    }

}


class Cart{
    actividades: string;
    finalizar: string;
    vacio: string;

    constructor(){
        this.actividades = '';
        this.finalizar = '';
        this.vacio = '';
    }
 }