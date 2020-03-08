import { helper } from '@ember/component/helper';

/**
 * Creates new instance of specified class `name` member of module `container`.
 *
 * TODO dispose?
 */
export default helper(function amChartObj([container, name, ...params]) {
  return new container[name](...params);
});
