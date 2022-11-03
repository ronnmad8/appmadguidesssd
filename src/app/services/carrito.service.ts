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



@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  
  
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
    cart.visitasPedido.forEach( (el, index) => {
      if(el.visit_uuid == uuid){
         cart.visitasPedido.splice(index, 1);
         cart.total = cart.total - el.precio;
         cart.totalfinal = cart.total * (1 + cart.taxamt);
      }
    });
    this.saveCart(cart);
    return cart;
  }


  getPedidosguardados(){
    let carts : CartModel[] = [];
    if (localStorage.getItem('pedidosguardados')) {
      let res: string = localStorage.getItem('pedidosguardados') ?? "";
      carts =  JSON.parse(res) as CartModel[];
    }
    return carts;
  }
  savePedidosguardados(carts: CartModel[]){
    //create update localstorage
    let c = JSON.stringify(carts);
    localStorage.setItem('pedidosguardados', c);
   
  }



}

