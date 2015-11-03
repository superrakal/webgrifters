`import Ember from 'ember'`
`import SessionMixin from '../../../mixins/session'`
`import { module, test } from 'qunit'`

module 'Unit | Mixin | session'

# Replace this with your real tests.
test 'it works', (assert) ->
  SessionObject = Ember.Object.extend SessionMixin
  subject = SessionObject.create()
  assert.ok subject
