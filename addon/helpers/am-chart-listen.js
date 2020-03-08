import Helper from '@ember/component/helper';
import { get } from '@ember/object';

/**
 * Registers action to event dispatcher.
 *
 * Function `func` is attached to the object at path `property` of container `obj`.
 * This call
 * ```hbs
 * {{am-chart-listen this.series "columns.template" "hit" (fn this.onColumnClick)}}
 * ```
 * translates to
 * `series.columns.template.events.on("hit", function(ev) { … })`
 *
 * @see https://www.amcharts.com/docs/v4/concepts/event-listeners/
 */
export default class AmChartListenHelper extends Helper {
  compute([obj, property, event, func, once]) {
    if (this.handler) {
      this.handler.dispose();
    }

    this.handler = get(obj, property).events[once ? 'once' : 'on'](event, func);
  }

  willDestroy() {
    super.willDestroy(...arguments);

    if (this.handler) {
      this.handler.dispose();
    }
  }
}
