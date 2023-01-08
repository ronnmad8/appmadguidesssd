//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { ComentariosModel } from './Cometarios.model';
import { ImagenesModel } from './Imagenes.model';
import { LanguagesModel } from './Languages.model';
import { MessagesModel } from './Messages.model';
import { TextosModel } from './Textos.model';
import { VisitasModel } from './Visitas.model';

export class VisitaAssetsModel {
  titdesc: Titdesc;
  messages: Messages;
  data: Data;
  button: string;
  tabs: Tabs;
  price: Price;
  details: Details;
  errors: Errors;
  private: Private;
  constructor() {
    this.messages = new Messages();
    this.data = new Data();
    this.button = '';
    this.tabs = new Tabs();
    this.price = new Price();
    this.details = new Details();
    this.errors = new Errors();
  }
}

class Titdesc {
  title: string;
  description: string;
  description1: string;
  description2: string;
  description3: string;
  link: string;
  ///erratas
  descripction: string;
  constructor() {
    this.title = '';
    this.description = '';
    this.description1 = '';
    this.description2 = '';
    this.description3 = '';
    this.link = '';
    ///erratas
    this.descripction = '';
  }
}

class Messages {
  title: string;
  share: string;
  from: string;
  season: string;
  description: string;
  related: string;
  view: string;
  constructor() {
    this.title = '';
    this.share = '';
    this.from = '';
    this.season = '';
    this.description = '';
    this.related = '';
    this.view = '';
  }
}

class Data {
  hour: string;
  language: string;
  people: string;
  constructor() {
    this.hour = '';
    this.language = '';
    this.people = '';
  }
}

class Tabs {
  description: string;
  price: string;
  details: string;
  cancel: string;
  meeting: string;
  constructor() {
    this.description = '';
    this.price = '';
    this.details = '';
    this.cancel = '';
    this.meeting = '';
  }
}

class Price {
  adults: string;
  children: string;
  range: string;
  minor: string;
  free: string;
  constructor() {
    this.adults = '';
    this.children = '';
    this.range = '';
    this.minor = '';
    this.free = '';
  }
}

class Details {
  covid: Titdesc;
  duration: Titdesc;
  language: Titdesc;
  when: Titdesc;
  accesibility: Titdesc;
  pet: Titdesc;
  cancel: string;
  meeting: Titdesc;
  constructor() {
    this.covid = new Titdesc();
    this.duration = new Titdesc();
    this.language = new Titdesc();
    this.when = new Titdesc();
    this.accesibility = new Titdesc();
    this.pet = new Titdesc();
    this.cancel = '';
    this.meeting = new Titdesc();
  }
}

class Errors {
  date: string;
  hour: string;
  language: string;
  people: string;
  constructor() {
    this.date = '';
    this.hour = '';
    this.language = '';
    this.people = '';
  }
}

class Private {
  max: string;
  contract: string;
  implicit: string;

  constructor() {
    this.max = '';
    this.contract = '';
    this.implicit = '';
  }
}



