
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { UserModel } from './User.model';
import { VisitasResultadoModel } from './VisitasResultado.model';
import { ReservationModel } from './Reservations.model';


export class CartModel{
    
    id: number;
    uuid: string;
    user_id: number;    
    total: number;
    totalfinal: number;
    created: Date;
    cliente: UserModel
    reservas: ReservationModel[];
   
    constructor(){

        
        this.uuid = "";
        this.user_id = 0
        this.total = 0;
        this.totalfinal = 0;
        this.created = new Date();
        this.cliente = new UserModel();
        this.reservas = [];
        
    }

}