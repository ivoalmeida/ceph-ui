import { Component, OnInit } from '@angular/core';

import _ from 'lodash';
import { Observable } from 'rxjs';

import { CustomLoginBannerService } from '@api/custom-login-banner.service';

@Component({
    selector: 'cd-custom-login-banner',
    templateUrl: './custom-login-banner.component.html',
    styleUrls: ['./custom-login-banner.component.scss'],
    standalone: true
})
export class CustomLoginBannerComponent implements OnInit {
  bannerText$: Observable<string>;
  constructor(private customLoginBannerService: CustomLoginBannerService) {}

  ngOnInit(): void {
    this.bannerText$ = this.customLoginBannerService.getBannerText();
  }
}
