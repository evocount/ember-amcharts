import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | am-chart-obj', function(hooks) {
  setupRenderingTest(hooks);

  test('it creates object instances', async function(assert) {
    this.set('class', function(a, b) {
      this.a = a;
      this.b = b;
    });

    await render(hbs`
      {{#let (am-chart-obj this "class" "Hello" "World") as |obj|}}
        {{obj.a}}, {{obj.b}}
      {{/let}}
    `);

    assert.equal(this.element.textContent.trim(), 'Hello, World');
  });
});
