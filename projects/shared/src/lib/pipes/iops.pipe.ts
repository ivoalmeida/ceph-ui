import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'iops',
    standalone: true
})
export class IopsPipe implements PipeTransform {
  transform(value: any): any {
    return `${value} IOPS`;
  }
}
