//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class CategoriasModel{
    
    id: number;
    category_id: number;
    language_id: number;
    uuid: string;
    content: string;
    name: string;
    selected: boolean;

    constructor(){
        this.category_id = 0;
        this.language_id = 1;
        this.uuid = "";
        this.content = "";
        this.name = "";
        this.selected = false;

    }


}