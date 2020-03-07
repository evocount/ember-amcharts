import Component from '@glimmer/component';
import { get /*, set*/ } from '@ember/object';

export default class AmChartPropertyComponent extends Component {
  constructor() {
    super(...arguments);

    this.obj = this.args.obj;
    this.keyName = this.args.property;
    this.initialValue = get(this.obj, this.keyName);
  }

  willDestroy() {
    if (this.obj && get(this.obj, this.keyName)) {
      if (!this.initialValue) {
        if (get(this.obj, this.keyName).dispose) {
          get(this.obj, this.keyName).dispose();
          return;
        }
      }
      // set(this.obj, this.keyName, this.initialValue);
    }
  }
}
