//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { StatesModel } from './States.model';
import { CitiesModel } from './Cities.model';
import { CountriesModel } from './Countries.model';
import { CompanionsModel } from './Companions.model';
import { CompanionsPedidoModel } from './CompanionsPedido.model';

export class ContractModel {

    //////operation/buy
    users: CompanionsPedidoModel[]; //users
    token: string; //token user
    uuid: string; //visit_time uuid
    paymentMethod: string; //redsys solo en un inicio
    private: boolean;
    country_id: number;
    address: string; //uuid address user
    
    constructor(){
        
        this.users = [];
        this.token = '';
        this.uuid = '';
        this.paymentMethod = 'redsys';
        this.private = false;
        this.country_id = 0;
        this.address = '';



    }

}


