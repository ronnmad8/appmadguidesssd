//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class SelectModel {
    id: number;
    title: string;
    description: string;
    value: string;
    uuid: string;
    iso: string;
    name: string;
   
    selected: boolean;
    
    constructor(){
        
        this.id = 0;
        this.title = "";
        this.description= "";
        this.value = "";
        this.uuid = "";
        this.name= "";
        this.iso= "";

        this.selected= false;

    }
}