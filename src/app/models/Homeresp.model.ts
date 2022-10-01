//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { ComentariosModel } from './Cometarios.model';
import { ImagenesModel } from './Imagenes.model';
import { LanguagesModel } from './Languages.model';
import { RecomendadasModel } from './Recomendadas.model';
import { TextosModel } from './Textos.model';

export class HomerespModel {
    
    languages: LanguagesModel[] = [];
    images: ImagenesModel[] = [];
    messages: TextosModel = new TextosModel();
    recommended: RecomendadasModel[] = [];
    comments: ComentariosModel[] = [];

    constructor(){
        this.languages = [];
        this.images = [];
        this.messages = new TextosModel();
        this.recommended = [];
        this.comments = [];
    }

}