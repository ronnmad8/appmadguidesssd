//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class VisitasModel{
    
    id: number;
    titulo: string;
    texto: string;
    urlpc: string;
    urlmovil: string;
    alt: string;
    precioPersona: number;
    duracion: number;
    
    constructor(){
        this.id = 0;
        this.titulo = "";
        this.texto = "";
        this.urlpc = "";
        this.urlmovil = "";
        this.alt = "";
        this.precioPersona = 0;
        this.duracion = 0;
        

    }


}