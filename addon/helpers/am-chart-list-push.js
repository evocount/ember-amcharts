import Helper from '@ember/component/helper';
import { get } from '@ember/object';

/**
 * Pushes value into list. Tries to dispose its work upon recomputation
 * with changed `obj`/`keyName` params or upon destruction.
 */
export default class AmChartListPushHelper extends Helper {
  compute([obj, keyName, value]) {
    this.dispose();

    this.obj = obj;
    this.keyName = keyName;
    this.value = value;

    // When pushing amChart objects `push` does not return array length but the pushed `value`.
    return get(obj, keyName).push(value);
  }

  dispose() {
    if (this.obj && this.keyName) {
      if (this.value && this.value.dispose) {
        this.value.dispose();
      } else {
        // TODO is it actually worth implementing this path?
        // i.e. will amCharts be notified when we remove something from its arrays?
        // get(this.obj, this.keyName).remove(this.value);
      }
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.dispose();
  }
}
