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
export default helper(function amChartCall([
  obj,
  property,
  params,
  emptyReturn
]) {
  const path = property.split('.');
  const func = path.pop();

  params = params || [];

  const container = path.length ? get(obj, path.join('.')) : obj;
  const result = container[func](...params);
  if (!emptyReturn) {
    return result;
  }
});
