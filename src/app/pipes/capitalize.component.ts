import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipeComponent implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    let res =  value.toLowerCase().charAt(0).toUpperCase() + value.toLowerCase().slice(1);
    return res;
  }
}