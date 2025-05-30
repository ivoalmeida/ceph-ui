import { Component, Input } from '@angular/core';

@Component({
    selector: 'cd-card-group',
    templateUrl: './card-group.component.html',
    styleUrls: ['./card-group.component.scss'],
    standalone: true
})
export class CardGroupComponent {
  @Input()
  groupTitle = '';
}
