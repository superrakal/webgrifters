`import Ember from 'ember'`

SessionMixin = Ember.Mixin.create
  before_model: ->
    unless @session.get('isLoggedIn')
      @transitionTo 'root'
      Ember.run.later(( ->
        window.App.reset()
      ), 100)

`export default SessionMixin`
