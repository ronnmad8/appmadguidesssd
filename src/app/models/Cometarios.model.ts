//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

import { VisitasResultadoModel } from './VisitasResultado.model';


export class ComentariosModel{
    
    id: number;
    uuid: string;
    content: string;
    titulo: string;
    name: string;
    image: string;
    language_id: string;
    visit_id: number;
    visit_uuid: string;
    visit_name: string;
    visit: VisitasResultadoModel;


    constructor(){
        
        this.uuid = "";
        this.content = "";
        this.titulo = "" ;
        this.name = "";
        this.image = "";
        this.language_id = "1";
        this.visit_id= 0;
        this.visit_uuid= "";
        this.visit_name= "";
        this.visit= new  VisitasResultadoModel(); 

    }


}