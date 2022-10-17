//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class LinksModel {

    active: boolean;  
    label: string;
    url: string;
    constructor(){
        this.active = false;
        this.label = "";
        this.url = "";
    }
}