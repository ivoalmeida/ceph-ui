import { Component, Input } from '@angular/core';

import { Icons } from '@enum/icons.enum';
import { TextToDownloadService } from '@services/text-to-download.service';

@Component({
    selector: 'cd-download-button',
    templateUrl: './download-button.component.html',
    styleUrls: ['./download-button.component.scss'],
    standalone: true
})
export class DownloadButtonComponent {
  @Input() objectItem: object;
  @Input() textItem: string;
  @Input() fileName: any;
  @Input() title = `Download`;

  icons = Icons;
  constructor(private textToDownloadService: TextToDownloadService) {}

  download(format?: string) {
    this.fileName = `${this.fileName}_${new Date().toLocaleDateString()}`;
    if (format === 'json') {
      this.textToDownloadService.download(
        JSON.stringify(this.objectItem, null, 2),
        `${this.fileName}.json`
      );
    } else {
      this.textToDownloadService.download(this.textItem, `${this.fileName}.txt`);
    }
  }
}
