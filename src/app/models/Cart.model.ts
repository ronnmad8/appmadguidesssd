
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { VisitasPedidoModel } from './VisitasPedido.model';



export class CartModel{
    
    
    id: number;
    clientes_id: number;    
    cliente: string;    
    taxamt: number ;
    total: number;
    totalfinal: number;
    created: Date;
    acabado: boolean;
    estado: string;
    estados_id: number;
    metodopagos_id: number;
    moneda: string;
    

    visitasPedido: VisitasPedidoModel[];
    currentproduct: string;
    constructor(){

        this.clientes_id = 0
        this.cliente = "";
        this.taxamt = 0;
        this.total = 0;
        this.totalfinal = 0;
        this.created = new Date();
        this.acabado = false;
        this.estado = "";
        this.estados_id = 0;
        this.metodopagos_id =  0;
        this.moneda =  "EUR";

    }

}