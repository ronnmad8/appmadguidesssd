//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class UsuarioModel{
    id: number;
    email: string;
    nombre: string;
    telefono: string;
    mensaje: string;
    passw: string;

    constructor(){
        this.id = 0;
        this.email = "";
        this.nombre = "";
        this.email= "";
        this.telefono = "";
        this.mensaje = "";
        this.passw = "";
    }
}