import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | am-chart-adapter', function(hooks) {
  setupRenderingTest(hooks);

  test('it adds and removes adapters', async function(assert) {
    const handler = function() {
      return 1;
    };
    this.set('handler', handler);
    this.set('adapter', 'text');
    this.set('oldAdapter', 'text');
    this.set('container', {
      adapter: {
        add: (adapter, f, priority, scope) => {
          assert.equal(adapter, this.adapter);
          assert.equal(f, handler);
          assert.equal(priority, 1);
          assert.equal(scope, undefined);
        },
        remove: (adapter, priority) => {
          assert.equal(adapter, this.oldAdapter);
          assert.equal(priority, 1);
        }
      }
    });

    assert.expect(12);

    await render(hbs`
      <AmChartAdapter
        @obj={{this}}
        @property="container"
        @adapter={{this.adapter}}
        @action={{this.handler}}
        @priority={{1}}
      />
    `);

    this.set('adapter', 'label');

    this.set('oldAdapter', 'label');
  });
});
