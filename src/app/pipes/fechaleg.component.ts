import { Pipe, PipeTransform } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Pipe({
  name: 'fechaleg'
})
export class FechalegPipeComponent implements PipeTransform {

  constructor(private globalService: GlobalService) {
    /// 
  }

  transform(value: string, ...args: string[]): string {
    
    let fecha = new Date(value)  ;
    let fechaleg =  this.globalService.getbyDia(fecha.getDay())+" "+ fecha.getDate() + " de " + this.globalService.getbyMes(fecha.getMonth()) + " de " + fecha.getFullYear();
    return fechaleg;
    
  }
}