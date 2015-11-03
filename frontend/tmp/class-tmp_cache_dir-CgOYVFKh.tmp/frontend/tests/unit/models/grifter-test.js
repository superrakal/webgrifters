define('frontend/tests/unit/models/grifter-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('grifter', 'Unit | Model | grifter', {
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model;
    model = this.subject();
    return assert.ok(!!model);
  });

});