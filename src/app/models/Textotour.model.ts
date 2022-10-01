//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class TextotourModel {
    
    title: string;
    message1: string;
    message2: string;
    input: string;
    button: string;

    constructor(){

        this.title = "";
        this.message1 = "";
        this.message2 = "";
        this.input = "";
        this.button = "";

    }
}