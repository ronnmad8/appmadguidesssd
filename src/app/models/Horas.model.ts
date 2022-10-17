//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class HorasModel{
    
    uuid: string;
    min: number;
    max: number;
    time_init: number;
    time_end: number;
    date: string;
    value: string;

    constructor(){
        this.uuid = '';
        this.min = 0;
        this.max = 0;
        this.time_init = 0;
        this.time_end = 0;
        this.date = '';
        this.value = '';


    }


}