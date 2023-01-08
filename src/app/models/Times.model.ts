//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { List_priceModel } from './List_price.model';

export class TimesModel {

    date: string;
    duration: number; 
    end: string;
    init: string;
    iso: string;
    min: number;
    max: number;
    uuid: string;
    precio_mayores: number;
    precio_menores: number;
    precio_pequenos: number;
    list_price: List_priceModel;
    price: number;

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
        this.list_price = new List_priceModel();
        this.price = 0;

     
    }
}
