import Helper from '@ember/component/helper';
import { get } from '@ember/object';

/**
 * Registers action to event dispatcher.
 */
export default class AmChartListenHelper extends Helper {
  compute([obj, property, event, func, once]) {
    if (this.handler) {
      this.handler.dispose();
    }

    this.handler = get(obj, property).events[once ? 'once' : 'on'](event, func);
  }

  destroy() {
    if (this.handler) {
      this.handler.dispose();
    }
    super.destroy(...arguments);
  }
}
