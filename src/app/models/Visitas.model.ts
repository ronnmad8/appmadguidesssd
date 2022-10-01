//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';


export class VisitasModel{
    
    id: number;
    uuid: string;
    min: number;
    max: number;
    metadata: string;
    refundable: boolean;
    title: string;
    description: string;
    iso: string;
    category_parent_title: string;
    category_parent_description: string;
    category_title: string;
    category_description: string;
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
       
    }


}