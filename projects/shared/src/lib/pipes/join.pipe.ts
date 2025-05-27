import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join',
    standalone: true
})
export class JoinPipe implements PipeTransform {
  transform(value: Array<any>): string {
    return value.join(', ');
  }
}
