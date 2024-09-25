//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

import { CompanionsModel } from './Companions.model';
import { UserModel } from './User.model';
import { CompanionsPedidoModel } from './CompanionsPedido.model';
import { TimesModel } from './Times.model';
import { VisitasResultadoModel } from './VisitasResultado.model';
import { GlobalService } from '../services/global.service';

export class ReservationModel {

    private globalService: GlobalService;

    //////reservation
    id: number;
    uuid: string;
    users: UserModel[]; //users
    language_id;
    fecha: string;
    visit_hours_id: number;
    adults: number;
    children: number;
    total: number;
    private: number;
    persons: number;
    visit_id: number;
    user_id: number;
    status: number;
    nombreidioma: string;
    mediafile: string;
    titulo: string;
    descripcion: string;
    hora: string;
    visit: VisitasResultadoModel;
    
    constructor(
        

    ){
        
        this.uuid = "";
        this.user_id = 0;
        this.language_id = 1;
        this.fecha = new Date().toISOString();
        this.visit_hours_id = 0;
        this.persons = 0;
        this.children = 0;
        this.adults = 0;
        this.private = 0;
        this.status= 1;
        this.visit = new VisitasResultadoModel();
        this.users =  [];
        this.nombreidioma = "";
        this.mediafile = "";
        this.titulo = "";
        this.descripcion = "";
        this.hora = "";
    }

    getPrecio(duracionmin: number, preciohora: number){
        let precio = preciohora * ( duracionmin /60 );
        return precio;
    }

    getHora(horaid: number){
        let hora = "";
        this.globalService.listahoras.forEach(element => { 
           if(element.id == horaid){
              hora = element.nombre;
           }
         });
        return hora;
    }

    getLanguage(languageid: number){
        let language = "";
        this.globalService.listaidlangs.forEach(element => { 
           if(element.id == languageid   ){
              language = element.name;
           }
         });
        return language;
    }


}




