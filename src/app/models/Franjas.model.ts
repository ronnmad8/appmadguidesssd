//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class FranjasModel {

    id: number;
    label: string;
    valueMin: number;
    valueMax: number;
    selected: boolean;

    constructor(){
        this.label = "";
        this.valueMin = 0;
        this.valueMax = 0;
        this.selected = false;
    }
}