//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class CountriesModel{
    
    id: number;
    uuid: string;
    name: string;
    iso: string;

    constructor(){
        this.id = 0;
        this.uuid = '';
        this.name = '';
        this.iso = '';


    }


}