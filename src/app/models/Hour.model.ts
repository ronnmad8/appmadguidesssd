//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class HourModel{
    
    id: number;
    hora: string;

    constructor(){
        this.id = 0;
        this.hora = '';

    }


}