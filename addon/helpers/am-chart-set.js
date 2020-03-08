import { helper } from '@ember/component/helper';
import { set } from '@ember/object';

/**
 * Sets value.
 */
export default helper(function amChartSet([obj, keyName, value] /*, hash*/) {
  if (value.then) {
    value.then(v => set(obj, keyName, v));
  } else {
    set(obj, keyName, value);
  }
});
