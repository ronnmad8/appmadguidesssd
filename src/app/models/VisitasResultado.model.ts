//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';
import { TimesModel } from './Times.model';
import { List_priceModel } from './List_price.model';
import { ImagenesModel } from './Imagenes.model';
import { ImagenesVisitaModel } from './ImagenesVisita.model';
import { CompanionsModel } from './Companions.model';


export class VisitasResultadoModel{
    
    id: number;
    
    category_lang_description: string;
    category_lang_iso: string;
    category_lang_title: string;
    category_lang_uuid: string;
    category_parent_lang_description: string;
    category_parent_lang_iso: string;
    category_parent_lang_title: string;
    category_parent_uuid: string;
    category_uuid: string;
    recommended: boolean;
    visit_accessibility: boolean;
    visit_feature_include: FeaturesModel[];
    visit_feature_exclude: FeaturesModel[];
    visit_image_description: string;
    visit_image_iso: string;
    visit_image_name: string;
    visit_image_title: string;
    visit_image_url: string;
    visit_image_url_gallery: string;
    visit_image_url_movil: string;
    visit_image_uuid: string;
    visit_lang_description: string;
    visit_lang_iso: string;
    visit_lang_metadata: string;
    visit_lang_title: string;
    visit_lang_uuid: string;
    visit_privada: boolean;
    visit_refundable: boolean;
    visit_tags: TagsModel[];
    visit_temporada: number;
    visit_time_date: string;
    visit_time_duration: number;
    visit_time_end: string;
    visit_time_init: string;
    visit_time_iso: string;
    visit_time_max: number;
    visit_time_min: number;
    visit_time_uuid: string;
    visit_uuid: string;
    visit_time_precio_mayores: number;
    visit_time_precio_menores: number;
    visit_time_precio_pequenos: number;
    visit_time: TimesModel[] = [];

    visit_encuentro: string;
    iso_disponible: string[];

    image: ImagenesModel;
    status: string;

    
    ///recomendadas
    precio_mayores: number;
    precio_menores: number;
    precio_pequenos: number;
    duration: number;
    codigoreserva: string;
    price: number;
    visit_image: ImagenesVisitaModel[];


    //companions
    companions: CompanionsModel[];
    
    ///R
    fecha: string;
    precio: number;
    adultos: number;
    ninos: number;
    menores: number;
    maximopersonas: number;
    hora: string;
    horario_uuid: string;
    idioma: string;
    
    constructor(){
        this.id = 0;
        this.category_lang_description = "";
        this.category_lang_iso = "";
        this.category_lang_title = "";
        this.category_lang_uuid = "";
        this.category_parent_lang_description = "";
        this.category_parent_lang_iso = "";
        this.category_parent_lang_title = "";
        this.category_parent_uuid = "";
        this.category_uuid = "";
        this.recommended = false;
        this.visit_accessibility = false;
        this.visit_feature_include = [];
        this.visit_feature_exclude = [];
        this.visit_image_description = "";
        this.visit_image_iso = "";
        this.visit_image_name = "";
        this.visit_image_title = "";
        this.visit_image_url = "";
        this.visit_image_url_gallery = "";
        this.visit_image_url_movil = "";
        this.visit_image_uuid = "";
        this.visit_lang_description = "";
        this.visit_lang_iso = "";
        this.visit_lang_metadata = "";
        this.visit_lang_title = "";
        this.visit_lang_uuid = "";
        this.visit_privada = false;
        this.visit_refundable = false;
        this.visit_tags = [];
        this.visit_temporada = 0;
        this.visit_time_date = "";
        this.visit_time_duration = 0;
        this.visit_time_end = "";
        this.visit_time_init = "";
        this.visit_time_iso = "";
        this.visit_time_max = 0;
        this.visit_time_min = 0;
        this.visit_time_uuid = "";
        this.visit_uuid = "";
        this.visit_time_precio_mayores = 0;
        this.visit_time_precio_menores = 0;
        this.visit_time_precio_pequenos = 0;
        this.visit_time = [];
        //en list
        this.precio_mayores = 0;
        this.precio_menores = 0;
        this.precio_pequenos = 0;
        this.duration = 0;
        this.codigoreserva = "";
        this.visit_image = [];

        //companions
        this.companions = [];
        
        ///R
        this.precio = 0;
        this.adultos = 0;
        this.ninos = 0;
        this.menores = 0;
        this.maximopersonas = 0;
        this.fecha = "";
        this.hora = "";
        this.idioma = "";


    }


}