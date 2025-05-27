import { Component, Input, OnInit } from '@angular/core';

import { DocService } from '@services/doc.service';

@Component({
    selector: 'cd-doc',
    templateUrl: './doc.component.html',
    styleUrls: ['./doc.component.scss'],
    standalone: true
})
export class DocComponent implements OnInit {
  @Input() section: string;
  @Input() docText = `documentation`;
  @Input() noSubscribe: boolean;

  docUrl: string;

  constructor(private docService: DocService) {}

  ngOnInit() {
    if (this.noSubscribe) {
      this.docUrl = this.docService.urlGenerator(this.section);
    } else {
      this.docService.subscribeOnce(this.section, (url: string) => {
        this.docUrl = url;
      });
    }
  }
}
