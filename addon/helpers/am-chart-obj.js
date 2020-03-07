import { helper } from '@ember/component/helper';

/**
 * Creates new instance of specified amCharts class.
 */
export default helper(function amChartObj([container, name] /*, hash*/) {
  return new container[name]();
});
