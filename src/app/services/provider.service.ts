import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable, ReplaySubject} from 'rxjs';
import { Router } from '@angular/router';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { CartModel } from '../models/Cart.model';
import { TextContentsModel } from '../models/TextContents.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
 

 

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
   /// 
  }

  private providerText$ = new ReplaySubject<TextContentsModel>()
  
  private provider1$ = new ReplaySubject<VisitasResultadoModel>()
  private provider3$ = new ReplaySubject<CartModel>()
  private provider4$ = new ReplaySubject<boolean>()
  private provider5$ = new ReplaySubject<boolean>()
  private provider6$ = new ReplaySubject<boolean>()
  private provider7$ = new ReplaySubject<boolean>()
  private provider8$ = new ReplaySubject<boolean>()

  

  ///get/////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  public get getThrowTextContent() {
    return this.providerText$.asObservable();
  }

  public get getThrowVisita() {
    return this.provider1$.asObservable();
  }

  public get getThrowCarritoupdate() {
    return this.provider3$.asObservable();
  }
  public get getThrowFococaja() {
    return this.provider4$.asObservable();
  }
  public get getThrowHiddModales() {
    return this.provider5$.asObservable();
  }
  public get getThrowPageadmin() {
    return this.provider6$.asObservable();
  }
  public get getThrowIsresize() {
    return this.provider7$.asObservable();
  }
  public get getThrowFooterpol() {
    return this.provider8$.asObservable();
  }





  ////set//////////////////////////////////////////////////////////////////////////////////////////////////////

  public setThrowTextConrtents(t: TextContentsModel) {
    this.providerText$.next(t);
  }

  public setThrowVisita(t: VisitasResultadoModel) {
    this.provider1$.next(t);
  }

  public setThrowCarritoupdate(t: CartModel ) {
    this.provider3$.next(t);
  }
  public setThrowFococaja(t: boolean) {
    this.provider4$.next(t);
  }
  public setThrowHiddModales(t: boolean) {
    this.provider5$.next(t);
  }
  public setThrowPageadmin(t: boolean) {
    this.provider6$.next(t);
  }
  public setThrowIsresize(t: boolean) {
    this.provider7$.next(t);
  }
  public setThrowFooterpol(t: boolean) {
    this.provider8$.next(t);
  }


  //origen
  //this.providerService.setThrowVisita(true);

  ///destino
  // listenProvider(){
  //   this.providerService.getThrowVisita.subscribe((resp)=>{
  //     var prov = resp as boolean;
  //   });
  // }


  



  


}

