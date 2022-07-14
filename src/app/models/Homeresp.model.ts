//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { ComentariosModel } from './Cometarios.model';
import { RecomendadasModel } from './Recomendadas.model';

export class HomerespModel {
    
    languages: [] = [];
    images: [] = [];
    messages: [] = [];
    recommended: RecomendadasModel[] = [];
    comments: ComentariosModel[] = [];

}