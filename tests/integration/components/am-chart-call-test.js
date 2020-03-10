import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | am-chart-call', function(hooks) {
  setupRenderingTest(hooks);

  test('it calls functions', async function(assert) {
    this.set('container', {
      func: function(a, b, c) {
        assert.equal(a, '10');
        assert.equal(b, 20);
        return c;
      }
    });

    this.set('params', ['10', 20, 'Hello World']);

    assert.expect(6);

    await render(
      hbs`
      <AmChartCall @obj={{this}} @func="container.func" @params={{this.params}} as |result|>
        {{result}}
      </AmChartCall>`
    );

    assert.equal(this.element.textContent.trim(), 'Hello World');

    this.set('params', ['10', 20, 'Good bye']);

    assert.equal(this.element.textContent.trim(), 'Good bye');
  });

  test('it calls without params', async function(assert) {
    this.set('container', {
      func: function(a, b, c) {
        assert.equal(a, undefined);
        assert.equal(b, undefined);
        return c;
      }
    });

    assert.expect(2);

    await render(
      hbs`
      <AmChartCall @obj={{this}} @func="container.func" as |result|>
        {{result}}
      </AmChartCall>`
    );
  });

  test('it recomputes + returns empty when not consumed', async function(assert) {
    this.set('container', {
      func: function(a, b, c) {
        assert.equal(a, '10');
        assert.equal(b, 20);
        return c;
      }
    });

    this.set('params', ['10', 20, 'Hello World']);

    assert.expect(6);

    await render(
      hbs`
      <AmChartCall @obj={{this}} @func="container.func" @params={{this.params}} />`
    );

    assert.equal(this.element.textContent.trim(), '');

    this.set('params', ['10', 20, 'Good bye']);

    assert.equal(this.element.textContent.trim(), '');
  });
});
