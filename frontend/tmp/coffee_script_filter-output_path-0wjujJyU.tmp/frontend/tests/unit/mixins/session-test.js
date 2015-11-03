import Ember from 'ember';
import SessionMixin from '../../../mixins/session';
import { module, test } from 'qunit';
module('Unit | Mixin | session');

test('it works', function(assert) {
  var SessionObject, subject;
  SessionObject = Ember.Object.extend(SessionMixin);
  subject = SessionObject.create();
  return assert.ok(subject);
});
