import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mbpersecond',
    standalone: true
})
export class MbpersecondPipe implements PipeTransform {
  transform(value: any): any {
    return `${value} MB/s`;
  }
}
