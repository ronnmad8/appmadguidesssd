//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { UserModel } from './User.model';


export class CompanionsPedidoModel {

    uuid: string;
    name: string;
    surname: string;
    old: number;
    email: string;
    sendmail: string;
    reservation_id: number;
    user: UserModel;
    
    constructor(){
            
        this.name = '';
        this.surname = '';
        this.old = 0;
        this.email = '';
        this.sendmail = '';
        this.reservation_id = 0;
        this.user = new UserModel();

    }

}


