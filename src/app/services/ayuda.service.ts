import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VisitasModel } from '../models/Visitas.model';
import { VisitaAssetsModel } from '../models/VisitaAssets.model';
import { TextoquienessomosModel } from '../models/Textoquienessomos.model';
import { TextoayudaModel } from '../models/Textoayuda.model';


@Injectable({
  providedIn: 'root'
})
export class AyudaService {
  userToken: string = "";
  url: string = '';
  apiurl: string;
  clang: string;
 
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;
    this.clang = this.globalService.getLanguage();
    this.userToken = this.auth.leerToken();
  }


  getMessages() {
    
    let endpoint = '/assets/ayuda';

    this.url = this.apiurl + endpoint;

    // return this.http.get(`${this.url}`).pipe(
    //   map((resp) => {
    //     var messageData: VisitaAssetsModel[] = resp as VisitaAssetsModel[];
    //     return messageData;
    //   }),
    //   catchError((err) => {
    //     console.error('Error  ', err.error);
    //     return err.error;
    //   })
    // );

    var messageData: TextoayudaModel = new TextoayudaModel();
    messageData.title1 = "Preguntas frecuentes";
    messageData.message1 = "A continuación encontrarás las preguntas más frecuentes que nos realizan nuestros clientes." ;

    messageData.question1 = "¿Cómo Puedo Reservar una Visita Guiada en Madrid?";
    messageData.response1 = "Para reservar una visita guiada en Madrid, simplemente navega por nuestro sitio web, elige la experiencia que te interese y sigue los pasos para completar la reserva en línea. También estamos disponibles para asistirte a través de nuestro servicio de atención al cliente.";
    messageData.question2 = "¿Cuáles Son las Atracciones Principales Cubiertas por las Visitas?";
    messageData.response2 = "Nuestras visitas guiadas abarcan una amplia variedad de atracciones en Madrid, desde los icónicos museos hasta los encantadores barrios históricos. Consulta la descripción de cada tour para conocer las atracciones específicas incluidas.";
    messageData.question3 = "¿Cuál es la Política de Cancelación?";
    messageData.response3 = "Nuestra política de cancelación varía según el tipo de tour. Te recomendamos revisar cuidadosamente los términos y condiciones al momento de la reserva. En general, ofrecemos flexibilidad, pero algunos tours pueden tener restricciones.";
    messageData.question4 = " ¿Cómo Puedo Modificar mi Reserva?";
    messageData.response4 = "Para modificar tu reserva, por favor, ponte en contacto con nuestro equipo de atención al cliente lo antes posible. Estaremos encantados de ayudarte a realizar ajustes según la disponibilidad.";
    messageData.question5 = "¿Hay Descuentos Disponibles para Grupos Grandes?";
    messageData.response5 = "Sí, ofrecemos descuentos para grupos grandes. Contáctanos directamente para obtener información detallada y personalizada sobre las tarifas de grupo y las opciones disponibles.";

    messageData.noencuentras = "¿No encuentras lo que buscas?";
    messageData.whatsapp = "Escríbenos un WhatsApp (656786524)";
    messageData.telefono = "Llámanos al 91 7896745";
    messageData.escribenos = "Escríbenos a info@madguidestour.com";
    messageData.formulario = "o a traves de nuestro formulario web";
    
    
    ///fake api
    var SubscribeObservable = new Observable((observer) => {
      observer.next(messageData);
    });
    return SubscribeObservable;
   

  }


  getImages() {

    let endpoint = '/assets/find?file=bannerbottom, banner-ficha-de-producto';
    this.url = this.apiurl + endpoint;

    return this.http.get(`${this.url}`).pipe(
      map((resp) => {
        var imageData: ImagenesModel[] = resp as ImagenesModel[];
        return imageData;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err.error;
      })
    );
  }

  


  

  }








  

  
  

  

  



