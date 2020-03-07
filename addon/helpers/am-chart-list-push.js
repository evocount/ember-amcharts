import Helper from '@ember/component/helper';
import { get } from '@ember/object';

/**
 * Pushes value into list.
 */
export default class AmChartListPushHelper extends Helper {
  compute([obj, keyName, value]) {
    this.dispose();

    this.obj = obj;
    this.keyName = keyName;
    this.value = value;

    return get(obj, keyName).push(value);
  }

  dispose() {
    if (this.obj && this.keyName) {
      if (this.value && this.value.dispose) {
        this.value.dispose();
      } else {
        get(this.obj, this.keyName).remove(this.value);
      }
    }
  }

  destroy() {
    this.dispose();

    super.destroy(...arguments);
  }
}
