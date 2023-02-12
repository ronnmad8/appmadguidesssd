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
  orderby: string;
  viewTemp: string;
  suggestion: string;
  delete: string;
  apply: string;
  free: string;
  available: string;
  noResult: string;
  relevance: string;
  today: string;
  tomorrow: string;
  filter: string;
  activityView: string;
  order: string;
  add: string;



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
    this.orderby = '';
    this.viewTemp = '';
    this.suggestion = '';
    this.delete = '';
    this.apply = '';
    this.free = '';
    this.available = '';
    this.noResult = '';
    this.relevance = '';
    this.today = '';
    this.tomorrow = '';
    this.filter = '';
    this.activityView = '';
    this.order = '';
    this.add = '';




    
    
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

