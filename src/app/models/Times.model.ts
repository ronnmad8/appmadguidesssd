//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class TimesModel {

    min: number;
    max: number;
    uuid: string;
    init: string;
    end: string;
    date: string;
    precio_mayores: number;
    precio_menores: number;
    precio_pequenos: number;
    iso: string;
    duration: number; 
    constructor(){

        this.min = 0;
        this.max = 0;
        this.uuid = '';
        this.init = '';
        this.end = '';
        this.date = '';
        this.precio_mayores = 0;
        this.precio_menores = 0;
        this.precio_pequenos = 0;
        this.iso = '';
        this.duration = 0;
     
    }
}