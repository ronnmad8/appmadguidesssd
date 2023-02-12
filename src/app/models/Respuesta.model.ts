//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class RespuestaModel{
    
    status: string;
    message: string;

    constructor(){

        this.status = "";
        this.message = "";

    }


}