import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class UsuarioModel{
    id: BigInteger;
    email: string;
    nombre: string;
    telefono: string;
    mensaje: string;
    passw: string;
}