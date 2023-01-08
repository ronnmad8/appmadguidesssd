//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class StatesModel{
    
    id: number;
    uuid: string;
    name: string;
    country_id: number;

    constructor(){
        this.id = 0;
        this.uuid = '';
        this.name = '';
        this.country_id = 0;

    }


}