//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class PrefixModel{
    
    id: number;
    uuid: string;
    code: string;
    country_id: number;

    constructor(){
        this.id = 0;
        this.uuid = '';
        this.code = '';
        this.country_id = 0;

    }


}