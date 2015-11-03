`import Ember from 'ember'`
`import SessionMixin from "../mixins/session";`

AddRoute = Ember.Route.extend SessionMixin,

  model: ->
    @store.createRecord 'grifter'

  setupController: (controller, model) ->
    controller.set('model', model)

`export default AddRoute`
