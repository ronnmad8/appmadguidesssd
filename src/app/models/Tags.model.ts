//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class TagsModel {
    id: number;
    uuid: string;
    name: string;
    selected: boolean;

    constructor(){
        this.id = 0;
        this.uuid = "";
        this.name = "";
        this.selected = false;
    }
}