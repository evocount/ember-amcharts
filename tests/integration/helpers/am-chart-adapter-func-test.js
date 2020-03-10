import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | am-chart-adapter-func', function(hooks) {
  setupRenderingTest(hooks);

  test('it adds and removes adapter', async function(assert) {
    const handler = function() {
      return 1;
    };
    this.set('handler', handler);
    this.set('container', {
      adapter: {
        add: function(adapter, f, priority, scope) {
          assert.equal(adapter, 'text');
          assert.equal(f, handler);
          assert.equal(priority, undefined);
          assert.equal(scope, undefined);
        },
        remove: function(adapter, priority) {
          assert.equal(adapter, 'text');
          assert.equal(priority, undefined);
        }
      }
    });

    assert.expect(6);

    await render(
      hbs`{{am-chart-adapter-func this "container" "text" this.handler}}`
    );
  });
});
