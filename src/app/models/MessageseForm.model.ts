//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';


export class MessagesFormModel {
  
  title: string;
  name: string;
  email: string;
  message: string;
  policy: string;
  link: string;
  button: string;
  
  constructor() {
    this.title = '';
    this.name = '';
    this.email = '';
    this.message = '';
    this.policy = '';
    this.link = '';
    this.button = '';

  }

}
