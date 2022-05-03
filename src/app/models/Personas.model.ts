import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { AcabadosModel } from './acabados.model';

export class PersonasModel{
    
    id: number;
    nombre: string;
    email: string;
    activo: string;
    iddepartamento: string;
    idlocal: string;
    idrol: string;
    horassemana: string;
    telefono: string;
    observaciones: string;

    imagen: string;
}