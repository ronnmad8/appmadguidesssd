//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class IsolanguagesModel {
    id: number;
    title: string;
    language_id: string;
    iso: string;
    selected: boolean;
    disabled: boolean;
    
    constructor(){
        
        this.id = 0;
        this.title= "";
        this.language_id= "";
        this.iso = "";
        this.selected= false;
        this.disabled= false;

    }
}