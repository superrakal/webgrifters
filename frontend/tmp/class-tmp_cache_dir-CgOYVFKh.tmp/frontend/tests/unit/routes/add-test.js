define('frontend/tests/unit/routes/add-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:add', 'Unit | Route | add', {});

  ember_qunit.test('it exists', function (assert) {
    var route;
    route = this.subject();
    return assert.ok(route);
  });

});