//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { GuialanguagesModel } from './Guialanguages.model';

export class DisponibilityModel {

    id: number; 
    user_id: number; 
    franjahoraria_id: number;
    init_hours_id: number;
    end_hours_id: number;
    guialanguages: number[];

    constructor(){
        this.guialanguages = [];
    }
}
