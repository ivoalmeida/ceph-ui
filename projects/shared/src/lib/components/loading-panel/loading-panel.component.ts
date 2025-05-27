import { Component } from '@angular/core';

import { Icons } from '@enum/icons.enum';

@Component({
    selector: 'cd-loading-panel',
    templateUrl: './loading-panel.component.html',
    styleUrls: ['./loading-panel.component.scss'],
    standalone: true
})
export class LoadingPanelComponent {
  icons = Icons;
}
