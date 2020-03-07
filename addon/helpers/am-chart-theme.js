import { helper } from '@ember/component/helper';

/**
 * Imports (dynamic import) amChart theme for usage in am-chart component.
 */
export default helper(function amChartTheme([name] /*, hash*/) {
  // see https://github.com/ef4/ember-auto-import/issues/97
  // return import(`@amcharts/amcharts4/themes/${name}`).then(module => module.default);

  let imp = undefined;
  if (name == 'amcharts') {
    imp = import('@amcharts/amcharts4/themes/amcharts');
  } else if (name == 'amchartsdark') {
    imp = import('@amcharts/amcharts4/themes/amchartsdark');
  } else if (name == 'animated') {
    imp = import('@amcharts/amcharts4/themes/animated');
  } else if (name == 'dark') {
    imp = import('@amcharts/amcharts4/themes/dark');
  } else if (name == 'dataviz') {
    imp = import('@amcharts/amcharts4/themes/dataviz');
  } else if (name == 'frozen') {
    imp = import('@amcharts/amcharts4/themes/frozen');
  } else if (name == 'kelly') {
    imp = import('@amcharts/amcharts4/themes/kelly');
  } else if (name == 'material') {
    imp = import('@amcharts/amcharts4/themes/material');
  } else if (name == 'microchart') {
    imp = import('@amcharts/amcharts4/themes/microchart');
  } else if (name == 'moonrisekingdom') {
    imp = import('@amcharts/amcharts4/themes/moonrisekingdom');
  } else if (name == 'patterns') {
    imp = import('@amcharts/amcharts4/themes/patterns');
  } else if (name == 'spiritedaway') {
    imp = import('@amcharts/amcharts4/themes/spiritedaway');
  }

  if (imp) {
    return imp.then(module => module.default);
  }
  return imp;
});
