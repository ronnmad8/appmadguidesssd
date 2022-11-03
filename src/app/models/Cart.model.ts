
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { UserModel } from './User.model';
import { VisitasModel } from './Visitas.model';
import { VisitasResultadoModel } from './VisitasResultado.model';


export class CartModel{
    
    id: number;
    uuid: string;
    users_id: number;    
    taxamt: number ;
    total: number;
    totalfinal: number;
    created: Date;
    acabado: boolean;
    estado: string;
    estados_id: number;
    metodopagos_id: number;
    metodopago: string;
    moneda: string;
    codigoreserva: string;
    
    cliente: UserModel
    visitasPedido: VisitasResultadoModel[];
   
    constructor(){

        
        this.users_id = 0
        this.uuid = "";
        this.taxamt = 0.21;
        this.total = 0;
        this.totalfinal = 0;
        this.created = new Date();
        this.acabado = false;
        this.estado = "sin pagar";
        this.estados_id = 1;
        this.metodopagos_id =  1;
        this.moneda =  "EUR";
        this.visitasPedido = [];
        this.codigoreserva = "";
        this.cliente = new UserModel();
        
    }

}