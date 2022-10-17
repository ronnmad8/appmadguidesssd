//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class DuracionesModel {

    id: number;
    label: string;
    valueMin: number;
    valueMax: number;
    value: string;
    selected: boolean;

    constructor(){
        this.label = "";
        this.valueMin = 0;
        this.valueMax = 0;
        this.selected = false;
        this.value = "";
        this.id = 0;



    }
}