import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators' ;
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { JsonPipe } from '@angular/common';
import { Observable, ReplaySubject} from 'rxjs';
import { Router } from '@angular/router';
import { VisitasModel } from '../models/Visitas.model';
import { VisitasResultadoModel } from '../models/VisitasResultado.model';
import { VisitaAssetsModel } from '../models/VisitaAssets.model';

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

  private provider1 = new ReplaySubject<VisitasResultadoModel>()
  private provider2 = new ReplaySubject<VisitaAssetsModel>()
  

  ///get/////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  public get getThrowVisita() {
    return this.provider1.asObservable();
  }
  public get getThrowMessagesVisita() {
    return this.provider2.asObservable();
  }




  ////set//////////////////////////////////////////////////////////////////////////////////////////////////////
  public setThrowVisita(trw: VisitasResultadoModel) {
    this.provider1.next(trw);
  }
  public setThrowMessagesVisita(trm: VisitaAssetsModel) {
    this.provider2.next(trm);
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

