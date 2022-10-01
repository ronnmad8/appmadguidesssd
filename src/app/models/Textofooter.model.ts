//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { Menu1Model } from './Menu1.model';
import { Menu2Model } from './Menu2.model';

export class TextofooterModel {
    
    menu1: Menu1Model;
    menu2: Menu2Model;
    
    constructor(){
        this.menu1 = new Menu1Model();
        this.menu2 = new Menu2Model();
    }
}