import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fnumber'
})
export class FnumberPipeComponent implements PipeTransform {
  transform(value: number, ...args: string[]): number {
    
    let num = value.toString();
    let numsp = num.split(".");
    if(numsp[1].length == 1){
      numsp[1] = numsp[1] + "0";
    }
    return Number(numsp[0] + "." + numsp[1]);
    
  }
}