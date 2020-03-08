import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | am-chart-call-func', function(hooks) {
  setupRenderingTest(hooks);

  test('it calls functions', async function(assert) {
    this.set('container', {
      func: function(a, b) {
        assert.equal(a, '10');
        assert.equal(b, 20);
      }
    });

    this.set('func2', function(a, b) {
      assert.equal(a, '10');
      assert.equal(b, 20);
    });

    assert.expect(4);

    await render(
      hbs`
      {{am-chart-call-func this "container.func" (array '10' 20)}}
      {{am-chart-call-func this "func2" (array '10' 20)}}
      `
    );
  });
});
