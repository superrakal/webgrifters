define('frontend/tests/unit/initializers/session-test', ['ember', 'frontend/initializers/session', 'qunit'], function (Ember, session, qunit) {

  'use strict';

  var application, registry;

  application = null;

  registry = null;

  qunit.module('Unit | Initializer | session', {
    beforeEach: function beforeEach() {
      return Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        return application.deferReadiness();
      });
    }
  });

  qunit.test('it works', function (assert) {
    session.initialize(registry, application);
    return assert.ok(true);
  });

});