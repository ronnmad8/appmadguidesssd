import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class LogsModel{
    
    id: number;
    message: string;
    fecha: string;
    eventos_id: number;
    evento: string;

}