import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | am-chart-list-push', function(hooks) {
  setupRenderingTest(hooks);

  test('it pushes', async function(assert) {
    this.set('list', ['foo', 'bar']);

    await render(hbs`{{am-chart-list-push this "list" "baz"}}`);

    assert.deepEqual(this.list, ['foo', 'bar', 'baz']);
  });
});
