//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class FooterModel {
    
    menu1: Menu1;
    menu2: Menu2;

    constructor(){
        this.menu1 = new Menu1();
        this.menu2 = new Menu2();
    }

}

class Menu1{
    title: string;
    who: string;
    contact: string;
    blog: string;
    help: string;
    covid: string;
    constructor(){
        this.title = '';
        this.who = '';
        this.contact = '';
        this.blog = '';
        this.help = '';
        this.covid = '';
    
    }

}

class Menu2{
    title: string;
    policy: string;
    notice: string;
    cookie: string;
    purchase: string;
    constructor(){
        this.title = '';
        this.policy = '';
        this.notice = '';
        this.cookie = '';
        this.purchase = '';
    }
}