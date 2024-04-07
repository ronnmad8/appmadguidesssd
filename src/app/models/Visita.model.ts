//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';;
import { ImagenesModel } from './Imagenes.model';
import { TagsModel } from './Tags.model';
import { CategoriasModel } from './Categorias.model';


export class VisitaModel{
    
    id: number;
    uuid: string;
    cuandomin: number;
    cancelacion: boolean;
    temporada: boolean;
    mascotas: boolean;
    accesibilidad: boolean;
    duracionmin: number;
    preciohoramin: number;
    puntoencuentro: string;
    nummax: number;
    recomendado: boolean;
    
    languageId: number;
    name: string;
    descripcion: string;
    
    dias: Date[];
    categories: CategoriasModel[];
    hours: string[];
    tags: TagsModel[];
    idiomas: any[];

    imagenes: ImagenesModel[];
    
    constructor(){
        this.id = 0;
        this.uuid = "";
        this.cuandomin = 0;
        this.cancelacion = false;
        this.temporada = false;
        this.mascotas = false;
        this.accesibilidad = false;
        this.duracionmin = 0;
        this.preciohoramin = 0;
        this.puntoencuentro = "";
        this.nummax = 0;
        this.recomendado = false;

        this.languageId = 1;
        this.name = "";
        this.descripcion = "";

        this.dias = [];
        this.categories = [];
        this.hours = [];
        this.tags = [];
        this.idiomas = [];

        this.imagenes = [];

    }


}