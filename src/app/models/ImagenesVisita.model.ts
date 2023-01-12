//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class ImagenesVisitaModel{
sel: boolean;
visit_image_description: string;
visit_image_iso: string;
visit_image_name: string; 
visit_image_title: string;
visit_image_url: string;
visit_image_url_gallery: string; 
visit_image_url_movil: string;
visit_image_uuid: string;

    
    constructor(){
        this.sel = false;
        this.visit_image_description = "";
        this.visit_image_iso = "";
        this.visit_image_name = "";
        this.visit_image_title = "";
        this.visit_image_url = "";
        this.visit_image_url_gallery = "";
        this.visit_image_url_movil = "";
        this.visit_image_uuid = "";
    

    }


}