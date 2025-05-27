import { Pipe, PipeTransform } from '@angular/core';

import { CssHelper } from '@classes/css-helper';
import { HealthColor } from '@enum/health-color.enum';

@Pipe({
  name: 'healthColor'
})
export class HealthColorPipe implements PipeTransform {
  constructor(private cssHelper: CssHelper) {}

  transform(value: any): any {
    return Object.keys(HealthColor).includes(value as HealthColor)
      ? { color: this.cssHelper.propertyValue(HealthColor[value]) }
      : null;
  }
}
