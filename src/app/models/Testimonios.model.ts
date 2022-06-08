//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class TestimoniosModel{
    
    id: number;
    titulo: string;
    texto: string;
    visita: string;
    urlimagen: string;
    alt: string;
    autor: string;
    
    constructor(){
        this.id = 0;
        this.titulo = "";
        this.texto = "";
        this.visita = "";
        this.urlimagen = "";
        this.alt = "";
        this.autor = "";
        

    }


}