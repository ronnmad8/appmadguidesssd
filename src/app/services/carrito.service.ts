import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImagenesModel } from '../models/Imagenes.model';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CartModel } from '../models/Cart.model';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { GlobalService } from './global.service';
import { TextoCashModel } from '../models/TextoCash.model';
import { VisitaService } from './visita.service';
import { CompanionsModel } from '../models/Companions.model';
import { UserModel } from '../models/User.model';
import { CompanionsPedidoModel } from '../models/CompanionsPedido.model';
import { ContractModel } from '../models/Contract.model';
import { ReservationModel } from '../models/Reservations.model';



@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  apiurl: string;
  url: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private globalService: GlobalService,
    private visitaService: VisitaService,
    private router: Router
  ) {
    this.apiurl = environment.apiurl;

  }
  
  
  /////////////////////////////////////localstorage
  //get cart de localstorage, si no existe se guarda por primera vez
  getCart(){
    let cart : CartModel = new CartModel();
    //pasar json de pedido a modelo Pedido
    if (localStorage.getItem('cart')) {
      let res: string = localStorage.getItem('cart') ?? "";
      cart =  JSON.parse(res) as CartModel;
    }
    return cart;
  }

  getCartVisitas(){
    let reservas: ReservationModel[] = [];
    let cart : CartModel = new CartModel();
    cart = this.getCart();
    reservas = cart.reservas;

    return reservas;
  }


  haveCart(){ 
    if (localStorage.getItem('cart')) {
      return true;
    }
    return false;
  }


  saveCart(cart: CartModel){
    //create update localstorage
    let c = JSON.stringify(cart);
    localStorage.setItem('cart', c);
  }


  deleteProductCart(id: number){

    let cart: CartModel = this.getCart();
    cart.reservas.forEach( (el, index) => {
      if(el.id == id){
         cart.reservas.splice(index, 1);
         cart.total = cart.total - el.total ;
         cart.totalfinal = cart.total * (1 + 0.21);
      }
    });
    this.saveCart(cart);
    return cart;
  }

  clearCart(){
    localStorage.removeItem('cart');
  }


  getPedidosguardados(){

    let carts : CartModel[] = [];
    if (localStorage.getItem('pedidosguardados')) {
      let res: string = localStorage.getItem('pedidosguardados') ?? "";
      carts =  JSON.parse(res) as CartModel[];
    }
    return carts;
  }

  getPedidoCompra(idpedido: number){
    let idlang = this.globalService.getIdLang();
    let endpoint = '/reservascliente/'+ idlang+"/"+idpedido ;
    this.url = this.apiurl + endpoint;
    return this.http.get( `${this.url}` )
    .pipe(
      map( resp =>{
        let respuesta = resp as ReservationModel[];
        return respuesta;
      }),
      catchError((err) => {
        console.error("Error  " , err.error);
        return err.error;
      })
    );
  }

  

  savePedido(pedido: CartModel){
  
    let _datos = {
      total: pedido.total,
      totalfinal: pedido.total * 1.21,
      paymentMethod: 'redsys',
      reservas: pedido.reservas
    };
    let endpoint = '/pedidocliente';
    this.url = this.apiurl + endpoint;
    return this.http.post(`${this.url}`, _datos).pipe(
      map((res) => {
        let result = Object.values(res);
        return result;
      }),
      catchError((err) => {
        console.error('Error  ', err.error);
        return err;
      })
    );

}




}

