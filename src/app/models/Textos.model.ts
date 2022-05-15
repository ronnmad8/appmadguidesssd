//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class TextosModel{
    
    id: number;
    texto: string;
    tipo_id: number;
    enlace_id: number;
    posicion: string;

    constructor(){
        this.id = 0;
        this.texto = "";
        this.tipo_id = 0;
        this.enlace_id = 0;
        this.posicion = "";
    }

}