import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { all } from 'rsvp';

/**
 * Creates amChart.
 *
 * ### Usage
 * ```hbs
 * <AmChart
 *   @themes=(array (am-chart-theme "material"))
 *   @chartType="XYChart"
 *   @initialConfig={{this.jsonConfig}}
 *   as |chart|
 * >
 *   <chart.property @property="exporting.menu" @value={{am-chart-obj chart.am4core "ExportMenu"}} />
 *   <chart.push @property="yAxes" @value={{am-chart-obj chart.am4charts "CategoryAxis"}} as |axis|>
 *     <axis.property @property="title.text" @value="Stuff" />
 *   </chart.push>
 * </AmChart>
 * ```
 *
 * @class AmChartComponent
 * @namespace Components
 * @extends Glimmer.Component
 */
export default class AmChartComponent extends Component {
  @tracked chart;
  @tracked container;

  async loadModules() {
    this.am4core = await import('@amcharts/amcharts4/core');
    this.am4charts = await import('@amcharts/amcharts4/charts');
  }

  async createChart() {
    if (!this.am4core) {
      await this.loadModules();
    }
    const themes = this.args.themes ? await all(this.args.themes) : [];

    /**
     * In amCharts theme are applied globally and not per chart.
     * To better fit our concept of components we use/unuse before
     * each chart creation.
     *
     * @see https://www.amcharts.com/docs/v4/concepts/themes/#Different_themes_to_different_charts
     */
    themes.forEach(theme => this.am4core.useTheme(theme));

    this.chart = this.am4core.createFromConfig(
      this.args.initialConfig,
      this.container,
      this.args.chartType
    );

    themes.forEach(theme => this.am4core.unuseTheme(theme));
  }

  destroyChart() {
    this.chart.dispose();
    this.chart = null;
  }

  @action
  async didInsertContainer(element) {
    this.container = element;
    return await this.createChart();
  }

  @action
  willDestroyContainer() {
    this.destroyChart();
    this.container = null;
  }

  @action
  async didUpdateConfig() {
    this.destroyChart();
    return await this.createChart();
  }
}
