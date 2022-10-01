import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VisitasModel } from '../models/Visitas.model';



@Injectable({
  providedIn: 'root'
})
export class VisitaService {
  
  getimagenesVisita() {
    throw new Error('Method not implemented.');
  }
  userToken: string = "";
  idUsuario: string = "";
  url: string = "";
  apiurl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) 
  {
    this.apiurl = environment.apiurl;
  }




  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  // getDatavisita()  {
    
  //   let endpoint = '/events/' ;
  //   this.url = this.apiurl + endpoint;

  //   return this.http.get( `${this.url}` )
  //   .pipe(
  //     map( res =>{
  //       return res;
  //     } ) ,
  //     catchError((err) => {
  //       console.error("Error  " , err.error);
  //               return err.error;
  //     })
  //   );

  // }

  

  ///////////////////////////////////////////////////////////////////////////////////////

  getVisita(id: number)  {
  
      var visita: VisitasModel = new VisitasModel();
      visita.id = id;
      visita.min = 0;
      visita.max = 0;
      visita.title = "titulo";
      visita.description = "descripcion";
      visita.uuid = "wwioeruoiweowrowier";
      visita.metadata=  "";
      visita.refundable = true;
      visita.iso= "es";
      visita.category_parent_title= "titulo categoria padre";
      visita.category_parent_description= "categoria padre";
      visita.category_title= "titulo categoria";
      visita.category_description= "categoria";
      visita.image_uuid= "adadasdasasd";
      visita.url= "https://madguides.es/assets/images/imagen-footer.jpg";
      visita.url_movil= "https://madguides.es/assets/images/imagen-footer.jpg";
      visita.url_gallery= "https://madguides.es/assets/images/imagen-footer.jpg";
      visita.image_name= "imagen1";
      visita.image_alt= "alt";
      visita.image_title= "titulo";
      visita.image_description= "descripcion";
      visita.price = 0;
      visita.time_init = 10;
      visita.time_end = 12;
      visita.time_date= "10:00";
      visita.duration = 2;
      
      return visita;    
   
  }

  
  getImagenesvisita(id: number)  {
    
        var imagenes: ImagenesModel[] = [];
        
        //1
        var imagen1: ImagenesModel = new ImagenesModel();
        imagen1.id = 1;
        imagen1.title = "titulo";
        imagen1.description = "descripcion";
        imagen1.alt = "alt";
        imagen1.iso = "es";
        imagen1.uuid = "dqdqdqdqd";
        imagen1.url = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen1.url_movil = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen1.url_gallery = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen1.image_name = "imagen1";

        var imagen2: ImagenesModel = new ImagenesModel();
        imagen2.id = 2;
        imagen2.title = "titulo";
        imagen2.description = "descripcion";
        imagen2.alt = "alt";
        imagen2.iso = "es";
        imagen2.uuid = "dqdqdqdqd";
        imagen2.url = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen2.url_movil = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen2.url_gallery = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen2.image_name = "imagen2";

        var imagen3: ImagenesModel = new ImagenesModel();
        imagen3.id = 3;
        imagen3.title = "titulo";
        imagen3.description = "descripcion";
        imagen3.alt = "alt";
        imagen3.iso = "es";
        imagen3.uuid = "dqdqdqdqd";
        imagen3.url = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen3.url_movil = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen3.url_gallery = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen3.image_name = "imagen3";
        
        var imagen4: ImagenesModel = new ImagenesModel();
        imagen4.id = 4;
        imagen4.title = "titulo";
        imagen4.description = "descripcion";
        imagen4.alt = "alt";
        imagen4.iso = "es";
        imagen4.uuid = "dqdqdqdqd";
        imagen4.url = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen4.url_movil = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen4.url_gallery = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen4.image_name = "imagen4";
        
        var imagen5: ImagenesModel = new ImagenesModel();
        imagen5.id = 5;
        imagen5.title = "titulo";
        imagen5.description = "descripcion";
        imagen5.alt = "alt";
        imagen5.iso = "es";
        imagen5.uuid = "dqdqdqdqd";
        imagen5.url = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen5.url_movil = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen5.url_gallery = "https://madguides.es/assets/images/imagen-footer.jpg";
        imagen5.image_name = "imagen5";
        
        imagenes.push(imagen1);
        imagenes.push(imagen2);
        imagenes.push(imagen3);
        imagenes.push(imagen4);
        imagenes.push(imagen5);

  
        return imagenes;    
    
  }



  getRelacionadas()  {
    let endpoint = '/visitas?related=1&limit=4';
    this.url = this.apiurl + endpoint;

    return this.http.get( `${this.url}` )
    .pipe(
      map( resp =>{
        var relacionadas:VisitasModel[] = [];
        var vresp :VisitasModel[] = resp as VisitasModel[];
       
        vresp.forEach((el: any, index: number) => {
        var relacionado: VisitasModel = new VisitasModel();
        relacionado.id = index;
        relacionado.min = el.min ?? 0;
        relacionado.max = el.max ?? 0;
        relacionado.title = el.visit.visit.language[0].title ?? "";
        relacionado.description = el.visit.visit.language[0].description ?? "";
        relacionado.uuid = el.uuid ?? "";
        relacionado.metadata=  el.visit.visit.metadata ?? "";
        relacionado.refundable = el.visit.visit.refundable ?? "";
        relacionado.iso= el.visit.visit.language[0].iso ?? "";
        relacionado.category_parent_title= el.visit.visit.category[0].category.parent.language[0].title ?? "";
        relacionado.category_parent_description= el.visit.visit.category[0].category.parent.language[0].description ?? "";
        relacionado.category_title= el.visit.visit.category[0].category.language[0].title ?? "";
        relacionado.category_description= el.visit.visit.category[0].category.language[0].description ?? "";
        relacionado.image_uuid= el.visit.visit.image.uuid ?? "";
        relacionado.url= el.visit.visit.image.url ?? "";
        relacionado.url_movil= el.visit.visit.image.url_movil ?? "";
        relacionado.url_gallery= el.visit.visit.image.url_gallery ?? "";
        relacionado.image_name= el.visit.visit.image.image_name ?? "";
        relacionado.image_alt= el.visit.visit.image.image_alt ?? "";
        relacionado.image_title= el.visit.visit.image.language[0].title ?? "";
        relacionado.image_description= el.visit.visit.image.language[0].description ?? "";
        relacionado.price = el.visit.visit.price.price ?? "";
        relacionado.time_init = el.time.time.time_init ?? "";
        relacionado.time_end = el.time.time.time_end ?? "";
        relacionado.time_date= el.time.time.time_date ?? "";
        relacionado.duration = el.time.time.duration ?? "";

        relacionadas.push(relacionado);
      });
      return relacionadas;    
      } ) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }




}

