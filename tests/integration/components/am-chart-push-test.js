import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { List } from '@amcharts/amcharts4/core';

module('Integration | Component | am-chart-push', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('list', new List(['foo', 'bar']));

    // Template block usage:
    await render(hbs`
      <AmChartPush @obj={{this}} @property="list" @value="baz" as |pushed|>
        {{pushed.value}}
      </AmChartPush>
    `);

    assert.deepEqual(this.list.values, ['foo', 'bar', 'baz']);

    assert.equal(this.element.textContent.trim(), 'baz');
  });

  test('it pushes when not consumed', async function(assert) {
    this.set('list', new List(['foo', 'bar']));

    // Template block usage:
    await render(hbs`
      <AmChartPush @obj={{this}} @property="list" @value="baz" />
    `);

    assert.deepEqual(this.list.values, ['foo', 'bar', 'baz']);

    assert.equal(this.element.textContent.trim(), '');
  });
});
