import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | am-chart-push', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('list', ['foo', 'bar']);

    // Template block usage:
    await render(hbs`
      <AmChartPush @obj={{this}} @property="list" @value="baz" as |pushed|>
        {{pushed.value}}
      </AmChartPush>
    `);

    assert.deepEqual(this.list, ['foo', 'bar', 'baz']);

    // in contrast to amChart's push Array.prototype.push returns length
    assert.equal(this.element.textContent.trim(), '3');
  });

  test('it pushes when not consumed', async function(assert) {
    this.set('list', ['foo', 'bar']);

    // Template block usage:
    await render(hbs`
      <AmChartPush @obj={{this}} @property="list" @value="baz" />
    `);

    assert.deepEqual(this.list, ['foo', 'bar', 'baz']);

    assert.equal(this.element.textContent.trim(), '');
  });
});
