
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { UserModel } from './User.model';
import { VisitasResultadoModel } from './VisitasResultado.model';
import { ReservationModel } from './Reservations.model';


export class CartModel{
    
    id: number;
    uuid: string;
    users_id: number;    
    impuesto: number ;
    total: number;
    totalfinal: number;
    created: Date;
    status: boolean;
    metodopagos_id: number;
    metodopago: string;
    monedas_id: number;
    moneda: string;
    codigoreserva: string;
    cliente: UserModel
    visitasPedido: VisitasResultadoModel[];
    reservas: ReservationModel[];
   
    constructor(){

        
        this.uuid = "";
        this.users_id = 0
        this.impuesto = 0.21;
        this.total = 0;
        this.totalfinal = 0;
        this.created = new Date();
        this.status = false;
        this.metodopagos_id =  1;
        this.metodopago =  "";
        this.monedas_id =  0;
        this.moneda =  "EUR";
        this.codigoreserva = "";
        this.cliente = new UserModel();
        this.visitasPedido = [];
        this.reservas = [];
        
    }

}