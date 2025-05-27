import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'milliseconds',
    standalone: true
})
export class MillisecondsPipe implements PipeTransform {
  transform(value: any): any {
    return `${value} ms`;
  }
}
