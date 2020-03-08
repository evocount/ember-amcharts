import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

/**
 * Calls function.
 *
 * ```hbs
 * {{am-chart-fall-func this.chart "exporting.export" (array "png")}}
 * ```
 * translates to
 * `chart.exporting.export('png');`
 *
 * @see AmChartCall which is exposed as contextual component on `AmChart`.
 */
export default helper(function amChartCall([obj, property, params = []]) {
  let func = property;
  const path = func.split('.');
  if (path.length) {
    func = path.pop();
  }
  const container = path.length ? get(obj, path.join('.')) : obj;
  container[func](...params);
});
