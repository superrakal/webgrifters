`import Ember from 'ember'`

SessionMixin = Ember.Mixin.create
  activate: ->
    unless @session.get('isLoggedIn')
      @transitionTo 'root'


`export default SessionMixin`
