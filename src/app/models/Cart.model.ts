
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { UserModel } from './User.model';
import { VisitasResultadoModel } from './VisitasResultado.model';
import { ReservationModel } from './Reservations.model';


export class CartModel{
    
    id: number;
    user_id: number;    
    total: number;
    totalfinal: number;
    fecha: Date;
    cliente: UserModel;
    paymentmethod: string;
    reservas: ReservationModel[];
   
    constructor(){

        //this.uuid = "";
        this.user_id = 0
        this.total = 0;
        this.totalfinal = 0;
        this.fecha = new Date();
        this.cliente = new UserModel();
        this.reservas = [];
        
    }

}