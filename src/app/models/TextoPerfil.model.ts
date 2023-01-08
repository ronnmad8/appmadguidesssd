//import { StringifyOptions } from 'querystring';

import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class TextoPerfilModel {
    
    
    menu: Menu;
    account: string;
    avatar: string;
    staff: string;
    titles: Titles 
    buttons: Buttons;
    link: string;
    invoice: Invoice;
    confirm: string;
    pendiente: string;
    now: string;
    cancel: Cancel;


}

class Menu{
    account: string;
    reservation: string;
    help: string;
    close: string;
    reservations: string;

   
}

class Titles{
    name: string;
    prefix: string;
    phone: string;
    surname: string;
    email: string;
    separator: string;
    
    documentation: string;
    number: string;
    address: string;
    postal: string;
    city: string;
    country: string;


}

class Buttons{
    change: string;

}

class Invoice{
    title: string;
    options: Options;
    titles: Titles;

}

class Options{
    option1: string;
    option2: string;

}

class Cancel{
    title: string;
    message: string;
    button: string;
    link: string;
    success: Success;

}

class Success{
    title: string;
    message: string;
    button: string;

}



