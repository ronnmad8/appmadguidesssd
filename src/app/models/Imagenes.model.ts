//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class ImagenesModel{
    
    id: number;
    nombre: string;
    enlace_id: number;
    rutapc: string;
    rutamovil: string;
    posicion: string;
    tipo_id: number;
    alt: string;
    
    constructor(){
        this.id = 0;
        this.nombre = "";
        this.enlace_id = 0;
        this.rutapc = "";
        this.rutamovil = "";
        this.posicion = "";
        this.tipo_id = 0;
        this.alt = "";

    }


}