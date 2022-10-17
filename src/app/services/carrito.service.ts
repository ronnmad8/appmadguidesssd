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
import { VisitasPedidoModel } from '../models/VisitasPedido.model';
import { CartModel } from '../models/Cart.model';



@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  
  
  getVisita(id: number)  {
  
      var carrito: VisitasModel = new VisitasModel();
      carrito.id = id;
      carrito.min = 0;
      carrito.max = 0;
      carrito.title = "titulo";
      carrito.description = "descripcion";
      carrito.uuid = "wwioeruoiweowrowier";
      carrito.metadata=  "";
      carrito.refundable = true;
      carrito.iso= "es";
      carrito.category_parent_title= "titulo categoria padre";
      carrito.category_parent_description= "categoria padre";
      carrito.category_title= "titulo categoria";
      carrito.category_description= "categoria";
      carrito.image_uuid= "adadasdasasd";
      carrito.url= "https://madguides.es/assets/images/imagen-footer.jpg";
      carrito.url_movil= "https://madguides.es/assets/images/imagen-footer.jpg";
      carrito.url_gallery= "https://madguides.es/assets/images/imagen-footer.jpg";
      carrito.image_name= "imagen1";
      carrito.image_alt= "alt";
      carrito.image_title= "titulo";
      carrito.image_description= "descripcion";
      carrito.price = 0;
      carrito.time_init = 10;
      carrito.time_end = 12;
      carrito.time_date= "10:00";
      carrito.duration = 2;
      
      return carrito;    
   
  }





  getPedido()  {
    //pedido de localstorage
    let listaPedido: VisitasModel[] = [];
    
    listaPedido.push(this.getVisita(1));
    listaPedido.push(this.getVisita(2));
    listaPedido.push(this.getVisita(3));
    listaPedido.push(this.getVisita(4));
    listaPedido.push(this.getVisita(5));

    return listaPedido;
  }

  getCompraRealizada(id: number)  {
    //pedido de localstorage
    let pedido: VisitasPedidoModel = new VisitasPedidoModel();
    
    

    return pedido;
  }





  /////////////////////////////////////localstorage
  //get cart de localstorage, si no existe se guarda por primera vez
  getCart(){
    var cart : CartModel = new CartModel();
    //pasar json de pedido a modelo Pedido
 
    if (localStorage.getItem('cart')) {
      let res: string = localStorage.getItem('cart') ?? "";
 
      cart =  JSON.parse(res) as CartModel;
    }
    return cart;
  }

  getPendientepago(){
    var res:any = null;

    if (localStorage.getItem('pagopendiente')) {
      res = localStorage.getItem('pagopendiente');
    }
    return res;
  }
  

  haveCart(){ 
    if (localStorage.getItem('cart')) {
      return true;
    }
    return false;
  }


  saveCart(cart: CartModel){
    //create update localstorage
    var c = JSON.stringify(cart);
    localStorage.setItem('cart', c);
  }


  deleteFileProduct(index: number, id: number){
    var cart: CartModel = this.getCart();
    cart.visitasPedido.forEach((el)=>{
        if(el.id == id){
          cart.visitasPedido.splice(index, 1);
        }
    });
    this.saveCart(cart);
  }


  deleteProductCart(index: number){
    var cart: CartModel = this.getCart();
    cart.visitasPedido.splice(index, 1);
    this.saveCart(cart);
  }



}

