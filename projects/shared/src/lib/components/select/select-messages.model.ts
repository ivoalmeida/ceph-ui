import _ from 'lodash';

export class SelectMessages {
  empty: string;
  selectionLimit: any;
  customValidations = {};
  filter: string;
  add: string;
  noOptions: string;

  constructor(messages: {}) {
    this.empty = `No items selected.`;
    this.selectionLimit = {
      tooltip: `Deselect item to select again`,
      text: `Selection limit reached`
    };
    this.filter = `Filter tags`;
    this.add = `Add badge`; // followed by " '{{filter.value}}'"
    this.noOptions = `There are no items available.`;

    _.merge(this, messages);
  }
}
