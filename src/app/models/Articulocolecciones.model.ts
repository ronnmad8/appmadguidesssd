import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { AcabadosModel } from './acabados.model';
import { AcabadoscoleccionesModel } from './acabadoscolecciones.model';

export class ArticulocoleccionesModel {
    
    id: number;
    nombre: string;
    colecciones_id: number;
    coleccion: string;
    posicion: string;
    precio: string;
    acabado: string;
    dimensiones: string;
    rutaimagen: string;
    acabados: AcabadosModel[] = [];
    articulosacabados1: AcabadosModel[] = [];
    articulosacabados2: AcabadosModel[] = [];
    articulosacabados3: AcabadosModel[] = [];
    acabadostouch: string;
    rutabase: string;

    
    
    
}