import { Injectable } from '@angular/core';

import {
  RbdConfigurationExtraField,
  RbdConfigurationSection,
  RbdConfigurationType
} from '@models/configuration';

/**
 * Define here which options should be made available under which section heading.
 * The display name and description needs to be added manually as long as Ceph does not provide
 * this information.
 */
@Injectable({
  providedIn: 'root'
})
export class RbdConfigurationService {
  readonly sections: RbdConfigurationSection[];

  constructor() {
    this.sections = [
      {
        heading: `Quality of Service`,
        class: 'quality-of-service',
        options: [
          {
            name: 'rbd_qos_bps_limit',
            displayName: `BPS Limit`,
            description: `The desired limit of IO bytes per second.`,
            type: RbdConfigurationType.bps
          },
          {
            name: 'rbd_qos_iops_limit',
            displayName: `IOPS Limit`,
            description: `The desired limit of IO operations per second.`,
            type: RbdConfigurationType.iops
          },
          {
            name: 'rbd_qos_read_bps_limit',
            displayName: `Read BPS Limit`,
            description: `The desired limit of read bytes per second.`,
            type: RbdConfigurationType.bps
          },
          {
            name: 'rbd_qos_read_iops_limit',
            displayName: `Read IOPS Limit`,
            description: `The desired limit of read operations per second.`,
            type: RbdConfigurationType.iops
          },
          {
            name: 'rbd_qos_write_bps_limit',
            displayName: `Write BPS Limit`,
            description: `The desired limit of write bytes per second.`,
            type: RbdConfigurationType.bps
          },
          {
            name: 'rbd_qos_write_iops_limit',
            displayName: `Write IOPS Limit`,
            description: `The desired limit of write operations per second.`,
            type: RbdConfigurationType.iops
          },
          {
            name: 'rbd_qos_bps_burst',
            displayName: `BPS Burst`,
            description: `The desired burst limit of IO bytes.`,
            type: RbdConfigurationType.bps
          },
          {
            name: 'rbd_qos_iops_burst',
            displayName: `IOPS Burst`,
            description: `The desired burst limit of IO operations.`,
            type: RbdConfigurationType.iops
          },
          {
            name: 'rbd_qos_read_bps_burst',
            displayName: `Read BPS Burst`,
            description: `The desired burst limit of read bytes.`,
            type: RbdConfigurationType.bps
          },
          {
            name: 'rbd_qos_read_iops_burst',
            displayName: `Read IOPS Burst`,
            description: `The desired burst limit of read operations.`,
            type: RbdConfigurationType.iops
          },
          {
            name: 'rbd_qos_write_bps_burst',
            displayName: `Write BPS Burst`,
            description: `The desired burst limit of write bytes.`,
            type: RbdConfigurationType.bps
          },
          {
            name: 'rbd_qos_write_iops_burst',
            displayName: `Write IOPS Burst`,
            description: `The desired burst limit of write operations.`,
            type: RbdConfigurationType.iops
          }
        ] as RbdConfigurationExtraField[]
      }
    ];
  }

  private static getOptionsFromSections(sections: RbdConfigurationSection[]) {
    return sections.map((section) => section.options).reduce((a, b) => a.concat(b));
  }

  private filterConfigOptionsByName(configName: string) {
    return RbdConfigurationService.getOptionsFromSections(this.sections).filter(
      (option) => option.name === configName
    );
  }

  private getOptionValueByName(configName: string, fieldName: string, defaultValue = '') {
    const configOptions = this.filterConfigOptionsByName(configName);
    return configOptions.length === 1 ? configOptions.pop()[fieldName] : defaultValue;
  }

  getWritableSections() {
    return this.sections.map((section) => {
      section.options = section.options.filter((o) => !o.readOnly);
      return section;
    });
  }

  getOptionFields() {
    return RbdConfigurationService.getOptionsFromSections(this.sections);
  }

  getWritableOptionFields() {
    return RbdConfigurationService.getOptionsFromSections(this.getWritableSections());
  }

  getOptionByName(optionName: string): RbdConfigurationExtraField {
    return this.filterConfigOptionsByName(optionName).pop();
  }

  getDisplayName(configName: string): string {
    return this.getOptionValueByName(configName, 'displayName');
  }

  getDescription(configName: string): string {
    return this.getOptionValueByName(configName, 'description');
  }
}
