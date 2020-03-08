import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

/**
 * Calls function.
 *
 * ```hbs
 * {{am-chart-call-func this.chart "exporting.export" (array "png")}}
 * ```
 * translates to
 * `chart.exporting.export('png');`
 *
 * @see AmChartCall which is exposed as contextual component on `AmChart`.
 */
export default helper(function amChartCall([obj, property, params = []]) {
  const path = property.split('.');
  const func = path.pop();

  const container = path.length ? get(obj, path.join('.')) : obj;
  return container[func](...params);
});
