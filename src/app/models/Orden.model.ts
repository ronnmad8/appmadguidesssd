//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class OrdenModel{
    
    id: number;
    label: string;
    tipo: string;
    asc: string;

    constructor(){
        this.id = 0;
        this.label = "";
        this.tipo = "";
        this.asc = "asc";


    }


}