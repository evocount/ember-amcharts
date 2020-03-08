import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | am-chart-on', function(hooks) {
  setupRenderingTest(hooks);

  test('it registers event handler', async function(assert) {
    const handler = function() {
      return 1;
    };
    this.set('handler', handler);
    this.set('container', {
      events: {
        on: function(eventName, f) {
          assert.equal(eventName, 'hit');
          assert.equal(f, handler);
        },
        once: function(eventName, f) {
          assert.equal(eventName, 'hover');
          assert.equal(f, handler);
        }
      }
    });

    assert.expect(4);

    await render(hbs`
      <AmChartOn @obj={{this}} @property="container" @event="hit" @action={{this.handler}} />
      <AmChartOn @obj={{this}} @property="container" @event="hover" @action={{this.handler}} @once={{true}} />
    `);
  });
});
