//import { StringifyOptions } from 'querystring';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';

export class TextoCashModel {
    
  process: string;
  step: Step;
  secure  : string;
  summary  : string;
  cart  : string;
  register  : string;
  social  : string;
  login  : string;
  data  : string;
  client  : string;
  placeholder: Placeholder;
  titles: Titles ;
  policy: Policy
  button  : string;
  price  : string;
  select  : string;
  card  : string;
  thank  : string;
  email1  : string;
  email2  : string;
  email3  : string;
  email4  : string;
  confirm  : string;
  view  : string;
  id  : string;
  cancel: string;
  password: string;
  reg: string;
  cancel24: string;
  init: string;
  order: string;
  dataSimple: string;
  pay: string;
  reserve: string;
  paying: string;
  string
  language: string;



  constructor(){
    this.process = "Proceso de compra";
    this.step = new Step();
    this.secure = "Seguro";
    this.summary = "Resumen";
    this.cart = "Carrito";
    this.register = "Registro";
    this.social = "Social";
    this.login = "Login";
    this.data = "Datos";
    this.client = "Cliente";
    this.placeholder = new Placeholder();
    this.titles = new Titles();
    this.policy = new Policy();
    this.button = "Boton";
    this.price = "Precio";
    this.select = "Seleccionar";
    this.card = "Tarjeta";
    this.thank = "Gracias";
    this.email1 = "Email1";
    this.email2 = "Email2";
    this.email3 = "Email3";
    this.email4 = "Email4";
    this.confirm = "Confirmar";
    this.view = "Ver";
    this.id = "Id";
  }

}


class Policy{
    actividades: string;
    message1: string;
    message2: string;
    message3: string;
    message4: string;

    constructor(){
        this.actividades = "";
        this.message1 = "";
        this.message2 = "";
        this.message3 = "";
        this.message4 = "";
       
    }
 }

 class Step{
    step1: string;
    step2: string;
    step3: string;

    constructor(){
        this.step1 = "";
        this.step2 = "";
        this.step3 = "";
    }   
 }

 class Placeholder{
    name: string;
    surname: string;
    email: string;
    phone: string;
    titular: string;

    constructor(){
        this.name = "";
        this.surname = "";
        this.email = "";
        this.phone = "";
        this.titular = "";
    }
 }

 class Titles{
    card: string;
    expira: string;
    number: string;

    constructor(){
        this.card = "";
        this.expira = "";
        this.number = "";
    }
 }