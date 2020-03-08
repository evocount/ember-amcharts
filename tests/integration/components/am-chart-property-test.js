import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | am-chart-property', function(hooks) {
  setupRenderingTest(hooks);

  test('it sets property', async function(assert) {
    this.set('output', '1234');
    this.set('renderComp', true);
    this.set('inputValue', '4321');

    await render(
      hbs`
        {{#if this.renderComp}}
          <AmChartProperty @obj={{this}} @property="output" @value={{this.inputValue}} />
        {{/if}}
      `
    );

    assert.equal(this.output, '4321');

    this.set('inputValue', 'foo');

    assert.equal(this.output, 'foo');

    this.set('renderComp', false);

    assert.equal(this.output, '1234');
  });
});
