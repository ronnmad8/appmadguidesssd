import { Pipe, PipeTransform } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Pipe({
  name: 'horaleg'
})
export class HoralegPipeComponent implements PipeTransform {

  constructor(private globalService: GlobalService) {
    /// 
  }

  transform(value: string, ...args: string[]): string {
    
    let horasp = value.split(':')  ;
    let horaleg = horasp[0]+':'+horasp[1];
    return horaleg;
    
  }
}