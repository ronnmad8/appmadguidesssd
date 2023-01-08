//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class CitiesModel{
    
    id: number;
    uuid: string;
    name: string;
    state_id: number;

    constructor(){
        this.id = 0;
        this.uuid = '';
        this.name = '';
        this.state_id = 0;
        

    }


}