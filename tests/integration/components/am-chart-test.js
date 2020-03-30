import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | am-chart', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('initialConfig', {
      data: [
        {
          country: 'Lithuania',
          units: 500
        },
        {
          country: 'Czech Republic',
          units: 300
        }
      ],
      xAxes: [
        {
          type: 'CategoryAxis',
          dataFields: {
            category: 'country'
          }
        }
      ],
      yAxes: [
        {
          type: 'ValueAxis'
        }
      ],
      series: [
        {
          type: 'ColumnSeries',
          dataFields: {
            valueY: 'units',
            categoryX: 'country'
          }
        }
      ]
    });
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`
      <AmChart @chartType="XYChart" @initialConfig={{this.initialConfig}} as |chart|>
        <chart.property @property="exporting.menu" @value={{am-chart-obj chart.am4core "ExportMenu"}} />
      </AmChart>
    `);

    await waitFor('svg', { timeout: 2000 });

    assert.equal(
      this.element.querySelectorAll('svg').length,
      1,
      'Chart svg was inserted into dom'
    );
    assert.equal(
      this.element.querySelectorAll('ul.amcharts-amexport-menu-root').length,
      1,
      'Export menu was created'
    );
  });
});
