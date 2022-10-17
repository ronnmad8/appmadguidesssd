//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { ImagenesModel } from './Imagenes.model';
import { TagsModel } from './Tags.model';


export class VisitasModel{
    
    id: number;
    uuid: string;
    refundable: boolean;
    lang: string;
    min: number;
    max: number;
    metadata: string;
    title: string;
    description: string;
    iso: string;
    category_parent_title: string;
    category_parent_description: string;
    category_title: string;
    category_description: string;
    category_uuid: string;
    image_uuid: string;
    url: string;
    url_movil: string;
    url_gallery: string;
    image_name: string;
    image_alt: string;
    image_title: string;
    image_description: string;
    price: number;
    time_init: number;
    time_end: number;
    time_date: string;
    duration: number;

    feature_include: FeaturesModel[];
    feature_exclude: FeaturesModel[];
    tags: TagsModel[];

    idiomas: any[];

    ///R
    adultos: number;
    ninos: number;
    menores: number;
    maximopersonas: number;
    imagenes: ImagenesModel[];
    
    constructor(){
        this.id = 0;
        this.uuid = "";
        this.min = 0;
        this.max = 0;
        this.metadata= "";
        this.refundable = false;
        this.title= "";
        this.description= "";
        this.iso= "";
        this.category_parent_title= "";
        this.category_parent_description= "";
        this.category_title= "";
        this.category_description= "";
        this.category_uuid= "";
        this.image_uuid= "";
        this.url= "";
        this.url_movil= "";
        this.url_gallery= "";
        this.image_name= "";
        this.image_alt= "";
        this.image_title= "";
        this.image_description= "";
        this.price = 0;
        this.time_init = 0;
        this.time_end = 0;
        this.time_date= "";
        this.duration = 0;
        this.feature_include = [];
        this.feature_exclude = [];

     
        ///R
        this.adultos = 0;
        this.ninos = 0;
        this.menores = 0;
        this.maximopersonas = 0;
        this.imagenes = [];

    }


}