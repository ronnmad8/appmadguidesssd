//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { StatesModel } from './States.model';
import { CitiesModel } from './Cities.model';
import { CountriesModel } from './Countries.model';

export class AddressModel {

    uuid: string;
    city: CitiesModel;
    city_id: number;
    country: CountriesModel;
    country_id: number;
    cp: number;
    number: "1"
    state: StatesModel;
    state_id: number;
    street: string;
    
    constructor(){
            
        this.uuid = '';
        this.city = new CitiesModel();
        this.city_id = 0;
        this.country = new CountriesModel();
        this.country_id = 0;
        this.cp = 0;
        this.number = "1";
        this.state = new StatesModel();
        this.state_id = 0;
        this.street = '';

    }

}


