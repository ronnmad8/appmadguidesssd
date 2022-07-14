//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class ComentariosModel{
    
    id: number;
    name: string;
    image: string;
    title: string;
    description: string;
    iso: string;

    constructor(){
        this.id = 0;
        this.name = "";
        this.image = "";
        this.title= "";
        this.description= "";
        this.iso = "";

    }


}