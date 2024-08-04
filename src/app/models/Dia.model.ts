//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { List_priceModel } from './List_price.model';
import { VisitasResultadoModel } from './VisitasResultado.model';

export class DiaModel {

    visit_id: number; 
    fecha: string;
    
    constructor(){
        this.fecha = "" ;
    }
}
