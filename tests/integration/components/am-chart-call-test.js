import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | am-chart-call', function(hooks) {
  setupRenderingTest(hooks);

  test('it calls functions', async function(assert) {
    this.set('container', {
      func: function(a, b) {
        assert.equal(a, '10');
        assert.equal(b, 20);
      }
    });

    assert.expect(2);

    await render(
      hbs`<AmChartCall @obj={{this}} @func="container.func" @params={{array "10" 20}} />`
    );
  });
});
