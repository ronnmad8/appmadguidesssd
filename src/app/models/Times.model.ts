//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { List_priceModel } from './List_price.model';
import { VisitasResultadoModel } from './VisitasResultado.model';

export class TimesModel {

    date: string;
    duration: number; 
    end: string;
    init: string;
    iso: string;
    min: number;
    max: number;
    uuid: string;
    list_price: List_priceModel;
    price: number;
    available: number;
    buy: number;
    horario_id: number;
    reservation_id: number;
    time_end: number;
    time_init: number;
    visit: VisitasResultadoModel;
    time: TimesModel[];

    constructor(){

        this.min = 0;
        this.max = 0;
        this.uuid = '';
        this.init = '';
        this.end = '';
        this.date = '';
        this.iso = '';
        this.duration = 0;
        this.list_price = new List_priceModel();
        this.price = 0;
        this.available = 0;
        this.buy = 0;
        this.horario_id = 0;
        this.reservation_id = 0;
        this.time_end = 0;
        this.time_init = 0;
        this.visit = new VisitasResultadoModel();
        this.time = [];

        
     
    }
}
