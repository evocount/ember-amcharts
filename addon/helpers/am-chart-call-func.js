import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

export default helper(function amChartCall([obj, property, params = []]) {
  let func = property;
  const path = property.split('.');
  if (path.length) {
    func = path.pop();
  }
  const container = path.length ? get(obj, path.join('.')) : obj;
  container[func](...params);
});
