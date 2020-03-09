'use strict';

module.exports = {
  description: 'adds @amcharts/amcharts4 npm package',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addPackageToProject('@amcharts/amcharts4', '^4.9.6');
  }
};
