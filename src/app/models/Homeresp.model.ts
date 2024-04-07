//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { ComentariosModel } from './Cometarios.model';
import { ImagenesModel } from './Imagenes.model';
import { LanguagesModel } from './Languages.model';
import { VisitasModel } from './Visitas.model';
import { VisitasResultadoModel } from './VisitasResultado.model';

export class HomerespModel {
    
    languages: LanguagesModel[];
    images: ImagenesModel[];
    recommended: VisitasResultadoModel[];
    comments: ComentariosModel[];

    constructor(){
        this.languages = [];
        this.images = [];
        this.recommended = [];
        this.comments = [];
    }

}