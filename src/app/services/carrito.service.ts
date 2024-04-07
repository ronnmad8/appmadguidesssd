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

import { CartModel } from '../models/Cart.model';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { GlobalService } from './global.service';
import { TextoCashModel } from '../models/TextoCash.model';
import { VisitaAssetsModel } from '../models/VisitaAssets.model';
import { VisitaService } from './visita.service';
import { CompanionsModel } from '../models/Companions.model';
import { UserModel } from '../models/User.model';
import { CompanionsPedidoModel } from '../models/CompanionsPedido.model';
import { ContractModel } from '../models/Contract.model';



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
    let visitas: VisitasResultadoModel[] = [];
    let cart : CartModel = new CartModel();
    cart = this.getCart();
    visitas = cart.visitasPedido;

    return visitas;
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


  deleteProductCart(uuid: string){
    let cart: CartModel = this.getCart();
    cart.reservas.forEach( (el, index) => {
      if(el.uuid == uuid){
         cart.visitasPedido.splice(index, 1);
         cart.total = cart.total - el.total ;
         cart.totalfinal = cart.total * (1 + cart.impuesto);
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

  getPedidosCompra(){
    let endpoint = '/reservation' ;
    this.url = this.apiurl + endpoint;
    return this.http.get( `${this.url}` )
    .pipe(
      map( resp =>{
        let respuesta = resp as any;
        return respuesta;

      } ) ,
      catchError((err) => {
        console.error("Error  " , err.error);
        return err.error;
      })
    );
  }

  
  savePedidosguardados(pedido: ContractModel){
  
      let _datos = {
      
        users: pedido.users,
        private: pedido.private,
        paymentMethod: 'redsys',
        uuid: pedido.uuid,
        token: pedido.token,
        address: pedido.address

      };
      debugger
      let endpoint = '/operation/buy';
      this.url = this.apiurl + endpoint;
      return this.http.post(`${this.url}`, _datos).pipe(
        map((res) => {
          let result = Object.values(res);
          return res;
        }),
        catchError((err) => {
          console.error('Error  ', err.error);
          if(err.status == 200){
            this.router.navigate(['/compra']);
          }
          return err;
        })
      );

  }


  getMessagesCash()  {
    let endpoint = '/assets/cash?' ;
    this.url = this.apiurl + endpoint;
    return this.http.get( `${this.url}` )
    .pipe(
      map( resp =>{
  
        let textocash : TextoCashModel = resp as TextoCashModel;
        return textocash;

      } ) ,
      catchError((err) => {
        console.error("Error  " , err.error);
                return err.error;
      })
    );
  }




}

