//import { StringifyOptions } from 'querystring';
import { NumberSymbol } from '@angular/common';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class ImagenesModel{

    
    id: number;
    uuid: string;
    visit_id: number;
    path: string;
    filename: string;
    type: string;
    order: number;
    url: string;
    

    
    constructor(){

        this.uuid = "";
        this.visit_id = 0;
        this.path = "";
        this.filename = "";
        this.type="";
        this.order=0;

    }

    getUrl(imagen: ImagenesModel){
      return  imagen.path+ "/" + imagen.filename;
    }


}