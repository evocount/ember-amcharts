import Helper from '@ember/component/helper';
import { get } from '@ember/object';

/**
 * Pushes value into list. Tries to dispose its work upon recomputation
 * with changed `obj`/`keyName` params or upon destruction.
 */
export default class AmChartListPushHelper extends Helper {
  compute([obj, keyName, value, emptyReturn]) {
    this.dispose();

    this.obj = obj;
    this.keyName = keyName;
    this.value = value;

    // When pushing to amChart's `am4core.List`,
    // `push` does not return array length but the pushed `value`.
    const result = get(obj, keyName).push(value);
    if (!emptyReturn) {
      return result;
    }
  }

  dispose() {
    if (this.obj && this.keyName) {
      get(this.obj, this.keyName).removeValue(this.value);

      if (this.value && this.value.dispose) {
        this.value.dispose();
      }
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.dispose();
  }
}
