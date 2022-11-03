//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class RecordarmeModel{
    email: string;
    password: string;

    constructor(){
        this.email = "";
        this.password = "";
    }
}