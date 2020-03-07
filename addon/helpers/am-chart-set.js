import { helper } from '@ember/component/helper';
import { set } from '@ember/object';

/**
 * Sets value.
 */
export default helper(function amChartSet([obj, keyName, value] /*, hash*/) {
  set(obj, keyName, value);
});
