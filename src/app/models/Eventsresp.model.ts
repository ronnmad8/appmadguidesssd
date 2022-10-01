//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { ComentariosModel } from './Cometarios.model';
import { RecomendadasModel } from './Recomendadas.model';
import { TagsModel } from './Tags.model';
import { VisitasModel } from './Visitas.model';

export class EventsrespModel {
    
    current_page: number;
    data: VisitasModel[];
    from: number;
    last_page: number;
    links: any[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
    categories: any[];
    tags: TagsModel[];
    prince: number[];
    duration: number[];


}