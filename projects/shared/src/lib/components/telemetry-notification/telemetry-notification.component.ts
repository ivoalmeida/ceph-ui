import { Component, OnDestroy, OnInit } from '@angular/core';

import _ from 'lodash';

import { MgrModuleService } from '@api/mgr-module.service';
import { NotificationType } from '@enum/notification-type.enum';
import { AuthStorageService } from '@services/auth-storage.service';
import { NotificationService } from '@services/notification.service';
import { TelemetryNotificationService } from '@services/telemetry-notification.service';

@Component({
    selector: 'cd-telemetry-notification',
    templateUrl: './telemetry-notification.component.html',
    styleUrls: ['./telemetry-notification.component.scss'],
    standalone: true
})
export class TelemetryNotificationComponent implements OnInit, OnDestroy {
  displayNotification = false;
  notificationSeverity = 'warning';

  constructor(
    private mgrModuleService: MgrModuleService,
    private authStorageService: AuthStorageService,
    private notificationService: NotificationService,
    private telemetryNotificationService: TelemetryNotificationService
  ) {}

  ngOnInit() {
    this.telemetryNotificationService.update.subscribe((visible: boolean) => {
      this.displayNotification = visible;
    });

    if (!this.isNotificationHidden()) {
      const configOptPermissions = this.authStorageService.getPermissions().configOpt;
      if (_.every(Object.values(configOptPermissions))) {
        this.mgrModuleService.getConfig('telemetry').subscribe((options) => {
          if (!options['enabled']) {
            this.telemetryNotificationService.setVisibility(true);
          }
        });
      }
    }
  }

  ngOnDestroy() {
    this.telemetryNotificationService.setVisibility(false);
  }

  isNotificationHidden(): boolean {
    return localStorage.getItem('telemetry_notification_hidden') === 'true';
  }

  onDismissed(): void {
    this.telemetryNotificationService.setVisibility(false);
    localStorage.setItem('telemetry_notification_hidden', 'true');
    this.notificationService.show(
      NotificationType.success,
      `Telemetry activation reminder muted`,
      `You can activate the module on the Telemetry configuration \
page (<b>Dashboard Settings</b> -> <b>Telemetry configuration</b>) at any time.`
    );
  }
}
