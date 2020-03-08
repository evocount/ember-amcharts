import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | am-chart-set', function(hooks) {
  setupRenderingTest(hooks);

  test('it sets', async function(assert) {
    this.set('output', '1234');
    this.set('inputValue', '4321');

    await render(hbs`{{am-chart-set this "output" this.inputValue}}`);

    assert.equal(this.output, '4321');

    this.set('inputValue', 'foo');

    assert.equal(this.output, 'foo');
  });
});
