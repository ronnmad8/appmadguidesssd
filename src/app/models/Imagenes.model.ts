//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class ImagenesModel{
    
    id: number;
    uuid: string;
    url: string;
    url_movil: string;
    url_galleria: string;
    name: string;

    title: string;
    description: string;
    alt: string;
    iso: string;
    sel: boolean;
    
    constructor(){
        this.id = 0;
        this.uuid = "";
        this.url = "";
        this.url_galleria = "";
        this.name = "";
        
        this.title = "";
        this.description = "";
        this.alt = "";
        this.iso = "";
        this.sel = false;
    

    }


}