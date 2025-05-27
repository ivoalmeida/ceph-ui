import { Pipe, PipeTransform } from '@angular/core';

import _ from 'lodash';

@Pipe({
    name: 'upperFirst',
    standalone: true
})
export class UpperFirstPipe implements PipeTransform {
  transform(value: string): string {
    return _.upperFirst(value);
  }
}
