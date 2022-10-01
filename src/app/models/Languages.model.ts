//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class LanguagesModel {
    id: number;
    uuid: string;
    iso: string;
    name_title: string;
    name_iso: string;
    
    
    constructor(){
        this.id = 0;
        this.uuid= "";
        this.iso= "";
        this.name_title= "";
        this.name_iso= "";
    

    }
}