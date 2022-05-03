import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class ClientesModel {
    id: BigInteger;
    email: string;
    nombre: string;
    passw: string;
    passw2: string;
    mensaje: string;
    telefono: string;
    fecha: string;

    apitoken: string;
    apitokenexpiration: Date;
}