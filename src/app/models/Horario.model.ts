//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { VisitResult } from 'typescript';
import { List_priceModel } from './List_price.model';
import { VisitasResultadoModel } from './VisitasResultado.model';
import { TimesModel } from './Times.model';
import { UserModel } from './User.model';

export class HorarioModel {

    date: string;
    id: number;
    uuid: number;
    reservation_id: number;
    horario_id: number;
    time: any;
    users: UserModel[];
    
    constructor(){

        this.date = '';
        this.id = 0;
        this.uuid = 0;
        this.reservation_id = 0;
        this.horario_id = 0;
        this.time = new TimesModel();
        this.users = [];
        

     
    }
}

class Time{

      uuid: number;
      time_init: string;
      time_end: string;
      date: string;
      price: number;
      max: number;
      min: number;

      iso: string;
      duration: number;
      list_price: Listprice;
      available: number;
      buy: number;
      visit: VisitasResultadoModel;

}

class Listprice{
    price: number;
    second: number;
}
