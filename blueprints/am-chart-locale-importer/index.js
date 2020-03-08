'use strict';

module.exports = {
  description: 'create helper for dynamic import of amChart locales',

  conditionalImport(locale) {
    return `if (locale === '${locale}') {
    return import('@amcharts/amcharts4/lang/${locale}').then(
      module => module.default
    );
  }`;
  },

  locals(options) {
    const imports = [
      this.conditionalImport(options.entity.name),
      ...Object.keys(options.entity.options).map(
        l => `else ${this.conditionalImport(l)}`
      )
    ];

    return {
      conditional_imports: imports.join(' ')
    };
  }
};
