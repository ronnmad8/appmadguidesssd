import { Pipe, PipeTransform } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Pipe({
  name: 'idiomaiso'
})
export class IdiomaisoPipeComponent implements PipeTransform {

  constructor(private globalService: GlobalService) {
    /// 
  }

  transform(value: string, ...args: string[]): string {
    
    let idioma = this.globalService.getIdiomabyIso(value);
    return idioma;
    
  }
}