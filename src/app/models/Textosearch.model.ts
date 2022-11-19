//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { ComentariosModel } from './Cometarios.model';


export class TextosearchModel {

  title: string;
  activity: string;
  find: string;
  search: string;
  plan: string;
  date: Date;
  titles: Titles;
  levels: Levels;
  more: string;
  view: string;

  

  constructor() {
    this.title = '';
    this.activity = '';
    this.find = '';
    this.search = '';
    this.plan = '';
    this.date = new Date();
    this.titles = new Titles();
    this.levels = new Levels();
    this.more = '';
    this.view = '';
    
    
  }
}

class Date {
  0: string;
  title: string;
  placeholder: string;
  availability: string;
  constructor() {
    this.title = '';
    this.placeholder = '';
    this.availability = '';
  }
}

class Titles{
  language: string;
  duration: string;
  hour: string;
  price: string;
  feaures: string;
  constructor() {
    this.language = '';
    this.duration = '';
    this.hour = '';
    this.price = '';
    this.feaures = '';
  }
}

class Levels{
  height: Height;
  duration: Duration;
  constructor() {
    this.height = new Height();
    this.duration = new Duration();
  }
}

class Height{
  more: string;
  less: string;
  constructor() {
    this.more = '';
    this.less = '';
  }
}

class Duration{
  more: string;
  less: string;
  constructor() {
    this.more = '';
    this.less = '';
  }
}

