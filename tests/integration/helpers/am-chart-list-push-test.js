import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import am4core from '@amcharts/amcharts4/core';

module('Integration | Helper | am-chart-list-push', function(hooks) {
  setupRenderingTest(hooks);

  test('it pushes', async function(assert) {
    this.set('list', new am4core.List(['foo', 'bar']));

    await render(hbs`{{am-chart-list-push this "list" "baz"}}`);

    assert.deepEqual(this.list.values, ['foo', 'bar', 'baz']);
  });

  test('it removes and disposes', async function(assert) {
    this.set('list', new am4core.List(['foo', 'bar']));
    this.set('doPush', true);
    this.set('obj', {
      dispose() {
        assert.step('dispose');
      }
    });

    await render(hbs`
      {{#if this.doPush}}
        {{am-chart-list-push this "list" this.obj}}
      {{/if}}
    `);

    assert.deepEqual(this.list.values, ['foo', 'bar', this.obj]);

    this.set('doPush', false);

    assert.verifySteps(['dispose']);
    assert.deepEqual(this.list.values, ['foo', 'bar']);
  });
});
