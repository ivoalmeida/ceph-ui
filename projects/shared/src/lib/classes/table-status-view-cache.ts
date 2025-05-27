import { ViewCacheStatus } from '@enum/view-cache-status.enum';
import { TableStatus } from './table-status';

export class TableStatusViewCache extends TableStatus {
  constructor(status: ViewCacheStatus = ViewCacheStatus.ValueOk, statusFor: string = '') {
    super();

    switch (status) {
      case ViewCacheStatus.ValueOk:
        this.type = 'ghost';
        this.msg = '';
        break;
      case ViewCacheStatus.ValueNone:
        this.type = 'primary';
        this.msg =
          (statusFor ? `Retrieving data for ${statusFor}.` : `Retrieving data.`) +
          ' ' +
          `Please wait...`;
        break;
      case ViewCacheStatus.ValueStale:
        this.type = 'secondary';
        this.msg = statusFor
          ? `Displaying previously cached data for ${statusFor}.`
          : `Displaying previously cached data.`;
        break;
      case ViewCacheStatus.ValueException:
        this.type = 'danger';
        this.msg =
          (statusFor
            ? `Could not load data for ${statusFor}.`
            : `Could not load data.`) +
          ' ' +
          `Please check the cluster health.`;
        break;
    }
  }
}
