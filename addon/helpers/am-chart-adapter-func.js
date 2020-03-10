import Helper from '@ember/component/helper';
import { get } from '@ember/object';

/**
 * Adds (and removes) adapter functions.
 *
 * This call
 * ```hbs
 * {{am-chart-adapter-func axis "renderer.labels.template" "text" (fn this.labelAdapter)}}
 * ```
 * translates to
 * `axis.renderer.labels.template.adapter.add("text", function(label, target, key) { … })`
 *
 * @see https://www.amcharts.com/docs/v4/concepts/adapters/
 */
export default class AmChartAdapterFuncHelper extends Helper {
  compute([obj, property, adapter, func, priority, scope]) {
    this.removeAdapter();

    this.obj = obj;
    this.property = property;
    this.adapter = adapter;
    this.priority = priority;

    this.handler = this.container.adapter.add(adapter, func, priority, scope);
  }

  get container() {
    return this.property ? get(this.obj, this.property) : this.obj;
  }

  removeAdapter() {
    if (!this.obj || !this.container || !this.container.adapter) {
      return;
    }

    this.container.adapter.remove(this.adapter, this.priority);
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.removeAdapter();
  }
}
