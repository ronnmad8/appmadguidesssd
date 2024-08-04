//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class CompanionsModel {

    uuid: string;
    name: string;
    surname: string;
    old: number;
    email: string;
    sendmail: string;

    //pedido
    visit_id: string;
    visit_title: string;
    visit_time_uuid: string;
    orden: number;
    maxold: number; 
    
    constructor(){
            
        this.uuid = '';
        this.name = '';
        this.surname = '';
        this.old = 0;
        this.email = '';
        this.sendmail = '';
        this.visit_id = '';
        this.visit_time_uuid = ''; 
        this.orden = 0;
        this.maxold = 1000;


    }

}


