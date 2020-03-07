import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { all } from 'rsvp';

/**
 * Creates amChart.
 *
 * @class AmChartComponent
 * @extends Component
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
