import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | am-chart-listen', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
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
      {{am-chart-listen this "container" "hit" this.handler}}
      {{am-chart-listen this "container" "hover" this.handler true}}
    `);
  });
});
