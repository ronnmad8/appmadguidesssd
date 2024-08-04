//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { List_priceModel } from './List_price.model';
import { VisitasResultadoModel } from './VisitasResultado.model';

export class TimesSelModel {

    duration: number; 
    end: string;
    init: string;
    diasemana: number;
    date: string;
    hour: string;
    
    constructor(){

        this.init = '';
        this.end = '';
        this.diasemana = 0;
        this.date = "";
        this.hour = "";
        
     
    }
}
