//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class LanguagesModel {
    id: number;
    iso: string;
    title: string;
    description: string;
    uuid: string;
    name: string;
    current_iso: string;
    selected: boolean;
    disabled: boolean;
    
    constructor(){
        
        this.id = 0;
        this.iso = "";
        this.title = "";
        this.description= "";
        this.uuid = "";
        this.name= "";
        this.current_iso= "";
        this.selected= false;
        this.disabled= false;

    }
}