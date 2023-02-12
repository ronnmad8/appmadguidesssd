//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { StatesModel } from './States.model';
import { CitiesModel } from './Cities.model';
import { CountriesModel } from './Countries.model';
import { CompanionsModel } from './Companions.model';
import { UserModel } from './User.model';
import { CompanionsPedidoModel } from './CompanionsPedido.model';
import { TimesModel } from './Times.model';

export class ReservationModel {

    //////reservation
    uuid: string; //uuid
    private: number;
    user_id: number;
    reservation_status_id: number;
    status: Status;
    user: UserModel;
    users: CompanionsPedidoModel[]; //users

    paymentMethod: string;
    time: TimesModel;

    
    constructor(){
        
        this.uuid = '';
        this.private = 0;
        this.user_id = 0;
        this.reservation_status_id = 0;
        this.status = new Status();
        this.user = new UserModel();
        this.time = new TimesModel();
        this.users = [];
        


    }

    
}

class Status{
    uuid: number;
    name: string;
    language: Language;

}

class Language{
    uuid: number;
    description: string;
    name: string;
    title: string;
    language_id: number;
    reservation_status_id: number;

}

