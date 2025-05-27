import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'booleanText',
    standalone: true
})
export class BooleanTextPipe implements PipeTransform {
  transform(
    value: any,
    truthyText: string = `Yes`,
    falsyText: string = `No`
  ): string {
    return Boolean(value) ? truthyText : falsyText;
  }
}
