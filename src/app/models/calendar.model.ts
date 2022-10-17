//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class CalendarModel {

    indexWeek: number;  
    name: string;
    value: number;
    year: string;
    selected: boolean;
    month: string;
    constructor(){
        this.indexWeek = 0;
        this.name = '';
        this.value = 0;
        this.year = '';
        this.selected = false;
    }
}