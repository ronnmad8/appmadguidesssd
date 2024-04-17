//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { LanguagesModel } from './Languages.model';
import { OrdenModel } from './Orden.model';

export class FiltersModel {

    title: string;
    duracion: number[];
    franja: number[];
    languages: number[];
    caracteristicas: number[];
    categorias: number[];
    precioIni: number;
    precioFin: number;
    fechaIni: string;
    fechaFin: string;
    ordenar: number;
    
    constructor(){
        this.title = '';
        this.duracion = [];
        this.franja = [];
        this.languages = [];
        this.caracteristicas = [];
        this.categorias = [];
        this.precioIni = 0;
        this.precioFin = 0;
        this.fechaIni = this.getFechaIni();
        this.fechaFin = this.getFechaFin();
        this.ordenar = 1;
    }

    getFechaIni(){
        let hoy = new Date();
        return this.getformato(hoy);
    }

    getFechaFin(){
        let hoy = new Date();
        let nextyear = hoy.getFullYear() + 1;
        let fechanextyear = new Date(nextyear, hoy.getMonth(), hoy.getDate());
        return this.getformato(fechanextyear);
    }

    getformato(fecha: Date){
        const año = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const dia = fecha.getDate().toString().padStart(2, '0');
        return `${año}-${mes}-${dia}`;
    }



}