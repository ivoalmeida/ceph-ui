import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[cdFormScope]',
    standalone: true
})
export class FormScopeDirective {
  @Input() cdFormScope: any;
}
