//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class RecomendadasModel{
    
    id: number;
    min: number;
    max: number;
    uuid: string;
    time_init: number;
    time_end: number;
    date:string;
    precio: number;
    iso: string;
    duration: number;
    visit_uuid: string;
    visit_refundable: boolean;
    visit_privada: boolean;
    visit_temporada: number;
    visit_accesibility: boolean;
    visit_iso: string;
    visit_title: string;
    
    visit_description: string;
    visit_metadata: string;
    visit_image_uuid: string;
    visit_image_url: string;
    visit_image_url_movil: string;
    visit_image_url_gallery: string;
    visit_image_name: string;
    visit_image_iso: string;
    visit_image_title: string;
    visit_image_description: string;
    recommended: boolean;
    category_uuid: string;
    category_iso: string;
    category_title: string;
    category_description: string;
    category_parent_uuid: string;
    category_parent_iso: string;
    category_parent_title: string;
    category_parent_description : string;

    feature_include: FeaturesModel[];
    feature_exclude: FeaturesModel[];
    tags: TagsModel[];

    constructor(){
        this.id = 0;
        this.min = 0;
        this.max = 0;
        this.uuid = "";
        this.time_init = 0;
        this.time_end = 0;
        this.date= "";
        this.precio = 0;
        this.iso= "";
        this.duration = 0;
        this.visit_uuid = "";
        this.visit_refundable = false;
        this.visit_privada = false;
        this.visit_temporada = 0;
        this.visit_accesibility = false;
        this.visit_iso = "";
        this.visit_title = "";   ;

        this.visit_description = "";
        this.visit_metadata = "";
        this.visit_image_uuid = "";
        this.visit_image_url = "";
        this.visit_image_url_movil;
        this.visit_image_url_gallery = "";
        this.visit_image_name = "";
        this.visit_image_iso = "";
        this.visit_image_title = "";
        this.visit_image_description = "";
        this.recommended = false;
        this.category_uuid = "";
        this.category_iso = "";
        this.category_title = "";
        this.category_description = "";
        this.category_parent_uuid = "";
        this.category_parent_iso = "";
        this.category_parent_title = "";
        this.category_parent_description = "";
    }


}