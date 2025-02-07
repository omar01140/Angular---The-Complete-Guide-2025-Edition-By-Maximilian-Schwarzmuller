import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true,
})
export class tempPipe implements PipeTransform {
  transform(value: string | number, inputType:'cel'|'fah', outputType?:'cel'|'fah' ) {
    let val: number;

    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }

    let outPutTemp: number;
    if (inputType === 'cel' && outputType === 'fah') {
      outPutTemp = val * (9/5)+32;
    }else if (inputType === 'fah' && outputType === 'cel') {
      outPutTemp = (val-32) * (5/9);
    } else {
      outPutTemp = val
    }

    let sympol:'°F'|'C'

    if(!outputType){
      sympol = inputType === 'cel'?'C':'°F'
    }else{
      sympol = outputType === 'cel'?'C':'°F'
    }

    return `${outPutTemp.toFixed(2)} ${sympol}`;
  }
}
