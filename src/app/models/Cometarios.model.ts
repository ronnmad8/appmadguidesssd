//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class ComentariosModel{
    
    id: number;
    uuid: string;
    name: string;
    image: string;
    lang_iso: string;
    lang_title: string;
    lang_description: string;
    lang_uuid: string;
    visit_uuid: string;
    visit_refundable: boolean;
    visit_temporada: number;
    visit_image_uuid: string;
    visit_image_url: string;
    visit_image_url_movil: string;
    visit_image_url_gallery: string;
    visit_image_name: string;
    visit_lang_iso: string;
    visit_lang_title: string;
    visit_lang_description: string;
    visit_lang_uuid: string;
    visit_lang_metadata: string;

    constructor(){
        this.id = 0;
        this.name = "";
        this.uuid = "";
        this.image = "";
        this.lang_iso = "";
        this.lang_title = "";
        this.lang_description = "";
        this.lang_uuid = "";
        this.visit_uuid = "";
        this.visit_refundable = false;
        this.visit_temporada = 0;
        this.visit_image_uuid = "";
        this.visit_image_url = "";
        this.visit_image_url_movil = "";
        this.visit_image_url_gallery = "";
        this.visit_image_name = "";
        this.visit_lang_iso = "";
        this.visit_lang_title = "";
        this.visit_lang_description = "";
        this.visit_lang_uuid = "";
        this.visit_lang_metadata = "";

    }


}