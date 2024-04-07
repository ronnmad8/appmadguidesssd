//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { LanguagesModel } from './Languages.model';
import { OrdenModel } from './Orden.model';

export class FiltersModel {

    title: string;
    precioIni: number;
    precioFin: number;
    duracion: string[];
    franja: string[];
    fechaIni: string;
    fechaFin: string;
    horario: string[];
    languages: string[];
    caracteristicas: number[];
    categorias: string[];
    ordenar: string;
    orderasc: string;
    
    constructor(){
        this.title = '';
        this.precioIni = 0;
        this.precioFin = 0;
        this.duracion = [];
        this.franja = [];
        this.fechaIni = '';
        this.fechaFin = '';
        this.horario = [];
        this.languages = [];
        this.caracteristicas = [];
        this.categorias = [];
        this.ordenar = 'order-random';
        this.orderasc = 'asc';



    }
}