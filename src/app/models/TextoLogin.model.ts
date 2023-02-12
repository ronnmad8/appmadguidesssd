//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class TextoLoginModel {
    
    title: string;
    subtitle: string;
    placeholder: Placeholder;
    remember: string;
    session: string;
    forgot: string;
    accede: string;
    cuenta: string;
    register: string;
    have: string;
    login: string;

    constructor(){
        this.title = "";
        this.subtitle = "";
        this.placeholder = new Placeholder();
        this.remember = "";
        this.session = "";
        this.forgot = "";
        this.accede = "";
        this.cuenta = "";
        this.register = "";
        this.have = "";
        this.login = "";


    }

}

class Placeholder{
    email: string;
    password: string;
}

