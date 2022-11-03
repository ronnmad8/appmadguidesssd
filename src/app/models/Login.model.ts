//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { UserModel } from './User.model';

export class LoginModel {

    
    token: string;
    status: string
    user: UserModel;
    

    constructor(){
            
        this.token = '';
        this.status = '';
        this.user = new UserModel();

        

    }

}

