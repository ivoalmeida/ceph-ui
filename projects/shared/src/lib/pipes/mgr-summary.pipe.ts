import { Pipe, PipeTransform } from '@angular/core';

import _ from 'lodash';

@Pipe({
    name: 'mgrSummary',
    standalone: true
})
export class MgrSummaryPipe implements PipeTransform {
  transform(value: any): any {
    if (!value) {
      return {
        success: 0,
        info: 0,
        total: 0
      };
    }

    let activeCount: number;
    const activeTitleText = _.isUndefined(value.active_name)
      ? ''
      : `${`active daemon`}: ${value.active_name}`;
    // There is always one standbyreplay to replace active daemon, if active one is down
    if (activeTitleText.length > 0) {
      activeCount = 1;
    }
    const standbyCount = value.standbys.length;
    const totalCount = activeCount + standbyCount;

    const mgrSummary = {
      success: activeCount,
      info: standbyCount,
      total: totalCount
    };

    return mgrSummary;
  }
}
