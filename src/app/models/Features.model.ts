//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class FeaturesModel {
    id: number;
    uuid: string;
    title: string;
    description: string;
    iso: string;

    constructor() {
        this.id = 0;
        this.uuid = "";
        this.title = "";
        this.description = "";
        this.iso = "";
    }

}