//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { FeaturesModel } from './Features.model';
import { TagsModel } from './Tags.model';
import { TimesModel } from './Times.model';
import { List_priceModel } from './List_price.model';
import { CompanionsModel } from './Companions.model';
import { CategoriasModel } from './Categorias.model';
import { ImagenesModel } from './Imagenes.model';


export class VisitasResultadoModel{
    
    id: number;
    uuid: string;
    images: ImagenesModel[];
    tags:  TagsModel[] = []; 
    categorias: CategoriasModel[]= []
    privada: boolean;
    accesibilidad: boolean;
    cancelacion: boolean;
    cuandomin: number;
    descripcion: string;
    duracionmin: number;
    mascotas: boolean;
    name: string;
    nummax: number;
    preciohoramin: number;
    puntoencuentro: string;
    temporada: boolean;
    titulo: string;
    precio: number;
    languages: any[];
    hours: any[];
    
    
    constructor(){
        this.id = 0;
        this.uuid = "";
        this.images = new Array<ImagenesModel>();
        this.tags = new  Array<TagsModel>();
        this.categorias = new Array<CategoriasModel>() ;
        this.privada = false;
        this.accesibilidad = false;
        this.cancelacion = false;
        this.cuandomin = 0;
        this.descripcion = "";
        this.duracionmin = 0;
        this.mascotas = false;
        this.name = "";
        this.nummax = 0;
        this.preciohoramin = 0;
        this.puntoencuentro ="";
        this.temporada = false;
        this.titulo = ""
        this.precio = 0;
        this.languages = [];
        this.hours = [];
        
    }




}