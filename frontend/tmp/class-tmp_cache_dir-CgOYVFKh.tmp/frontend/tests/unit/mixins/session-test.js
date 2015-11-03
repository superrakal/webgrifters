define('frontend/tests/unit/mixins/session-test', ['ember', 'frontend/mixins/session', 'qunit'], function (Ember, SessionMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | session');

  qunit.test('it works', function (assert) {
    var SessionObject, subject;
    SessionObject = Ember['default'].Object.extend(SessionMixin['default']);
    subject = SessionObject.create();
    return assert.ok(subject);
  });

});