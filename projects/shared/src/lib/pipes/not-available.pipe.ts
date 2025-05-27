import { Pipe, PipeTransform } from '@angular/core';

import _ from 'lodash';

@Pipe({
    name: 'notAvailable',
    standalone: true
})
export class NotAvailablePipe implements PipeTransform {
  transform(value: any, text?: string): any {
    if (value === '') {
      return _.defaultTo(text, `n/a`);
    }
    return value;
  }
}
