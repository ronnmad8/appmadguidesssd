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
import { RecomendadasModel } from '../models/Recomendadas.model';
import { HomerespModel } from '../models/Homeresp.model';
import { ComentariosModel } from '../models/Cometarios.model';
import { EventsrespModel } from '../models/Eventsresp.model';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  userToken: string = "";
  idUsuario: string = "";
  url: string = "";
  apiurl: string;
  dataresultado: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  getDataHome()  {
    
    let endpoint = '/home' ;
    this.url = this.apiurl + endpoint;

    return this.http.get( `${this.url}` )
    .pipe(
      map( res =>{
        return res;
      } ) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );

  }

  

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////


  getImagenesFilt(idenlace :number, idtipo :number)  {
    
    let endpoint = '/imagenes/filt' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: idenlace,
      tipos_id: idtipo
      
    };
    return this.http.post( `${this.url}`, filtData )
    .pipe(
      map( res => res as ImagenesModel[]) ,
      catchError((err) => {
        console.error("Error  ", err.error);
        // if(err.includes("Unauthorized")){
        //   this.router.navigateByUrl("/homecliente");
        // }
        return err.error;
      })
    );

  }


  getRecomendadosHome()  {
      let endpoint = '/home?recommended' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var recomendadas:RecomendadasModel[] = [];
          var homeresp :HomerespModel = resp as HomerespModel;
          var recomendadasData = homeresp.recommended; ;
          recomendadasData.forEach((el: any, index: number) => {
          var recomendado: RecomendadasModel = new RecomendadasModel();
          recomendado.id = index;
          recomendado.min = el.min ?? 0;
          recomendado.max = el.max ?? 0;
          recomendado.title = el.visit.visit.language[0].title ?? "";
          recomendado.description = el.visit.visit.language[0].description ?? "";
          recomendado.uuid = el.uuid ?? "";
          recomendado.metadata=  el.visit.visit.metadata ?? "";
          recomendado.refundable = el.visit.visit.refundable ?? "";
          recomendado.iso= el.visit.visit.language[0].iso ?? "";
          recomendado.category_parent_title= el.visit.visit.category[0].category.parent.language[0].title ?? "";
          recomendado.category_parent_description= el.visit.visit.category[0].category.parent.language[0].description ?? "";
          recomendado.category_title= el.visit.visit.category[0].category.language[0].title ?? "";
          recomendado.category_description= el.visit.visit.category[0].category.language[0].description ?? "";
          recomendado.image_uuid= el.visit.visit.image.uuid ?? "";
          recomendado.url= el.visit.visit.image.url ?? "";
          recomendado.url_movil= el.visit.visit.image.url_movil ?? "";
          recomendado.url_gallery= el.visit.visit.image.url_gallery ?? "";
          recomendado.image_name= el.visit.visit.image.image_name ?? "";
          recomendado.image_alt= el.visit.visit.image.image_alt ?? "";
          recomendado.image_title= el.visit.visit.image.language[0].title ?? "";
          recomendado.image_description= el.visit.visit.image.language[0].description ?? "";
          recomendado.price = el.visit.visit.price.price ?? "";
          recomendado.time_init = el.time.time.time_init ?? "";
          recomendado.time_end = el.time.time.time_end ?? "";
          recomendado.time_date= el.time.time.time_date ?? "";
          recomendado.duration = el.time.time.duration ?? "";

          recomendadas.push(recomendado);
        });
        return recomendadas;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }
    
  


    getComentariosHome()  {
      let endpoint = '/home?comments' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
    
          var comments: ComentariosModel[] = [];
          var homeresp :HomerespModel = resp as HomerespModel;
          var comentariosData = homeresp.comments; 
          comentariosData.forEach((el: any, index: number) => {
          var comentario: ComentariosModel = new ComentariosModel();
          comentario.id = index;
          comentario.name = el.name ?? "";
          comentario.image = el.image ?? "";
          comentario.title = el.visit.language[0].title ?? "";
          comentario.description = el.visit.language[0].description ?? "";
          comentario.iso = el.visit.language[0].iso ?? "";
          
          comments.push(comentario);
        });

        return comments;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }



    getImagenesHome()  {
      let endpoint = '/home?images' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var imagenes: ImagenesModel[] = [];
          var homeresp :HomerespModel = resp as HomerespModel;
          var imagesData = homeresp.images; 
          imagesData.forEach((el: any, index: number) => {
          var imagen: ImagenesModel = new ImagenesModel();
          imagen.id = index;
          imagen.title = el.image.language[0].title ?? "";
          imagen.description = el.image.language[0].description ?? "";
          imagen.alt = el.image.language[0].alt ?? "";
          imagen.iso = el.image.language[0].iso ?? "";
          imagen.uuid = el.image.uuid ?? "";
          imagen.url = el.image.url ?? "";
          imagen.url_movil = el.image.url_movil ?? "";
          imagen.url_gallery = el.image.url_gallery ?? "";
          imagen.image_name = el.image.image_name ?? "";
          
          imagenes.push(imagen);
        });

        return imagenes;    
        } ) ,
        catchError((err) => {
          debugger
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }

    getTextosHome()  {
      let endpoint = '/home?messages' ;
      this.url = this.apiurl + endpoint;
  
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
    
          var imagenes: ImagenesModel[] = [];
          var homeresp :HomerespModel = resp as HomerespModel;
          var imagesData = homeresp.comments; 
          imagesData.forEach((el: any, index: number) => {
          var imagen: ImagenesModel = new ImagenesModel();
          imagen.id = index;
          imagen.title = el.image.language[0].title ?? "";
          imagen.description = el.image.language[0].descripcion ?? "";
          imagen.title = el.visit.language[0].title ?? "";
          imagen.description = el.visit.language[0].description ?? "";
          imagen.iso = el.visit.language[0].iso ?? "";
          
          imagenes.push(imagen);
        });

        return imagenes;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }


    getCajaBuscaHome(busqueda:string){
      let endpoint = '/events?title='+busqueda.trim()+'&per_page=5'; ;
      this.url = this.apiurl + endpoint;
      return this.http.get( `${this.url}` )
      .pipe(
        map( resp =>{
          var visitas: VisitasModel[] = [];
          var eventsresp : EventsrespModel = resp as EventsrespModel;
          var visitasData = eventsresp.data; 
          visitasData.forEach((el: any, index: number) => {
          var visita: VisitasModel = new VisitasModel();
          visita.id = index;
          visita.title = el.visit.visit.language[0].title ?? "";
          visita.url= el.visit.visit.image.url ?? "";
          visita.url_movil= el.visit.visit.image.url_movil ?? "";
          visita.url_gallery= el.visit.visit.image.url_gallery ?? "";
          visitas.push(visita);
        });

        return  visitas;    
        } ) ,
        catchError((err) => {
          console.error("Error  " , err.error);
                  return err.error;
        })
      );
    }

















  getImagenBannerHome()  {

    let tipos_id = 1;
    let enlaces_id = 1;
    let posicion = 1;
    
    let endpoint = '/imagenes/filtpos' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: enlaces_id,
      tipos_id: tipos_id,
      posicion: posicion 
      
    }
  
    let im = new ImagenesModel();
    im.url = "assets/images/imagenbannerhome.jpg";
    im.url_movil = "assets/images/imagenbannerhome.jpg";
    

    return im;

    // return this.http.post( `${this.url}`, filtData )
    // .pipe(
    //   map( res => res as ImagenesModel[]) ,
    //   catchError((err) => {
    //     console.error("Error  " , err.error);
    //             return err.error;
    //   })
    // );

  }






  getImagenZonacontactoHome()  {

    let tipos_id = 2;
    let enlaces_id = 1;
    let posicion = 1;
    
    let endpoint = '/imagenes/filtpos' ;
    this.url = this.apiurl + endpoint;
    const filtData = {
      enlaces_id: enlaces_id,
      tipos_id: tipos_id,
      posicion: posicion 
      
    }
  
    let im = new ImagenesModel();
    im.url = "assets/images/imagen-footer.jpg";
    im.url_movil = "assets/images/imagen-footer.jpg";
  
    return im;

    // return this.http.post( `${this.url}`, filtData )
    // .pipe(
    //   map( res => res as ImagenesModel[]) ,
    //   catchError((err) => {
    //     console.error("Error  " , err.error);
    //             return err.error;
    //   })
    // );

  }


      // let visitas: VisitasModel[] = [];
    // let visitaTest: VisitasModel = new VisitasModel();
    // visitaTest.url = "assets/images/imagenVisita.jpg";
    // visitaTest.url_movil = "assets/images/imagenVisita.jpg";
    // visitaTest.price = 23;
    // visitaTest.duration = 2;
    // visitaTest.title = "Visita a Madrid";
    // visitaTest.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dapibus ante rhoncus iaculis auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut gravida felis ut nunc gravida, commodo ornare nibh molestie. Curabitur in dapibus tortor. Phasellus sed est in tellus pretium malesuada. Sed pellentesque laoreet est, sed semper ni";
    // visitas.push(visitaTest);
    // visitas.push(visitaTest);
    // visitas.push(visitaTest);
    // visitas.push(visitaTest);
    // visitas.push(visitaTest);
    // visitas.push(visitaTest);
  



}