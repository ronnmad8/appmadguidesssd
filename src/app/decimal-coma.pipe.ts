import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalComa'
})
export class DecimalComaPipe implements PipeTransform {

  transform(value: any): any {
    if (typeof value === 'number') {
      return value.toFixed(2).replace('.', ',');
    }
    if (typeof value === 'string') {
      return value.replace('.', ',');
    }
    return value;
  }

}
