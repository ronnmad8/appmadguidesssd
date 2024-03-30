//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class TextDataModel {

    nombre: string;
    contenido: string;
    uuid: string;
    idurl: number;
    typecontent: string;
    idlang: number;

    constructor(){
            
        this.nombre = "";
        this.contenido= "";
        this.uuid="";
        this.idurl= 1;
        this.typecontent ="";
        this.idlang=1;

    }

}