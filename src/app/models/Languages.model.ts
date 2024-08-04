//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class LanguagesModel {
    id: number;
    language_id: number;
    iso: string;
    uuid: string;
    iso_code: string;
    name: string;
    selected: boolean;
    disabled: boolean;
    
    constructor(){
        
        this.id = 0;
        this.language_id = 0;
        this.iso = "";
        this.iso_code = "";
        this.uuid = "";
        this.name= "";
        this.selected= false;
        this.disabled= false;

    }
}