//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { LinksModel } from './Links.model';

import { VisitasModel } from './Visitas.model';
import { VisitasResultadoModel } from './VisitasResultado.model';
import { UserModel } from './User.model';

export class ResultadoModel {

    current_page: number;
    data: VisitasResultadoModel[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinksModel;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
    status: string;
    user: UserModel;
 

    constructor(){
        this.current_page = 1;
        this.data = [];
        this.first_page_url = "";
        this.from = 0;
        this.last_page = 0;
        this.last_page_url = "";
        this.links = new LinksModel();
        this.next_page_url = "";
        this.path = "";
        this.per_page = 0;
        this.prev_page_url = "";
        this.to = 0;
        this.total = 0;
        this.status = "";
        this.user = new UserModel();
        
        
    }
}