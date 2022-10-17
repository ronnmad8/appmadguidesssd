//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { ComentariosModel } from './Cometarios.model';
import { ImagenesModel } from './Imagenes.model';
import { LanguagesModel } from './Languages.model';
import { MessagesModel } from './Messages.model';
import { RecomendadasModel } from './Recomendadas.model';
import { TextosModel } from './Textos.model';
import { VisitasModel } from './Visitas.model';

export class HomerespModel {
    
    languages: LanguagesModel[];
    images: ImagenesModel[];
    messages: MessagesModel ;
    recommended: VisitasModel[];
    comments: ComentariosModel[];

    constructor(){
        this.languages = [];
        this.images = [];
        this.messages = new MessagesModel;
        this.recommended = [];
        this.comments = [];
    }

}