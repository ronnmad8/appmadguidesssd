//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class CategoriasModel{
    
    id: number;
    value: string;
    title: string;
    description: string;
    childs: CategoriasModel[];
    parent_value: string;
    parent_title: string;
    parent_description: string;
    selected: boolean;

    constructor(){
        this.id = 0;
        this.value = "";
        this.title = "";
        this.description = "";
        this.childs = [];
        this.parent_value = "";
        this.parent_title = "";
        this.parent_description = "";
        this.selected = false;

    }


}