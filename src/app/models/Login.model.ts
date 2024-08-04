//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { UserModel } from './User.model';

export class LoginModel {

    
    access_token: string;
    refresh_token: string;
    status: string
    user: UserModel;


    constructor(){
            
        this.access_token = '';
        this.refresh_token = '';
        this.status = '';
        this.user = new UserModel();


        

    }

}

