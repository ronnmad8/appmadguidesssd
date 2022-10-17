//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class TagsModel {
    id: number;
    description: string;
    title: string;
    value: string;
    selected: boolean;

    constructor(){
        this.id = 0;
        this.description = "";
        this.title = "";
        this.value = "";
        this.selected = false;
    }
}