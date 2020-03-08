import { helper } from '@ember/component/helper';

export default helper(function amChartLocale([locale]) {
  <%= conditional_imports %>
});
