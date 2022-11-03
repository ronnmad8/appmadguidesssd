//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { ComentariosModel } from './Cometarios.model';
import { ImagenesModel } from './Imagenes.model';
import { LanguagesModel } from './Languages.model';
import { MessagesFormModel } from './MessageseForm.model';
import { TextosModel } from './Textos.model';

export class MessagesModel {
  tour: Tour;
  form: MessagesFormModel;
  icons: Icons;
  image: Image;
  opinions: Opinions;
  visit: Visit;
  home: Home;
  menu: Menu;
  busqueda: Busqueda;

  constructor() {
    this.tour = new Tour();
    this.form = new MessagesFormModel();
    this.icons = new Icons();
    this.image = new Image();
    this.opinions = new Opinions();
    this.visit = new Visit();
    this.home = new Home();
    this.menu = new Menu();

  }
}

class Tour {
  title: string;
  message1: string;
  message2: string;
  input: string;
  button: string;
  constructor() {
    this.title = '';
    this.message1 = '';
    this.message2 = '';
    this.input = '';
    this.button = '';
  }
}


class Icons {
  guide: string;
  group: string;
  talk: string;
  price: string;
  constructor() {
    this.guide = '';
    this.group = '';
    this.talk = '';
    this.price = '';
  }
}

class Image {
  message: string;
  constructor() {
    this.message = '';
  }
}

class Opinions {
  title: string;
  view: string;
}

class Visit {
  message1: string;
  message2: string;
  button: string;
  constructor() {
    this.message1 = '';
    this.message2 = '';
    this.button = '';
  }
}

class Home {
  menu1: Menu1;
  menu2: Menu2;
  
}

class Menu {
  who: string;
  blog: string;
  help : string;
  constructor() {
    this.who = '';
    this.blog = '';
    this.help = '';
  }
}

class Menu1 {
   title: string;
   who: string;
   blog: string;
   help : string;
   covid: string;
   constructor() {
      this.title = '';
      this.who = '';
      this.blog = '';
      this.help = '';
      this.covid = '';
    }
}

class Menu2 {
   title: string;
   policy: string;
   notice: string;
   cookie : string;
   purchase: string;
    constructor() {
      this.title = '';
      this.policy = '';
      this.notice = '';
      this.cookie = '';
      this.purchase = '';
    }
}

class Busqueda {
  title: string;
  message: string;
  buscado: string;
  constructor() {
    this.title = '';
    this.message = '';
    this.buscado = '';
  }
}
